import ExcelJS from "exceljs";
import { UsedMaterial, Technician } from "@prisma/client";

type UsedMaterialWithTech = UsedMaterial & {
  technician: Technician | null;
};

type ExcelRow = {
  bd: string;
  clientName: string;
  technician: string;
  dropBatch: string;
  strap: number | "";
  fiber: number | "";
  internalConnector: number | "";
  externalConnector: number | "";
  createdAt: Date;
} & Record<string, string | number | Date | "">;


export async function buildMaterialsXlsx(
  data: UsedMaterialWithTech[]
) {
  // ============================
  // Coleta de colunas dinâmicas
  // ============================
  const materialSet = new Set<string>();
  const equipmentSet = new Set<string>();

  data.forEach((item) => {
    item.materials.forEach((m) => materialSet.add(m.name));
    item.equipments.forEach((e) => equipmentSet.add(e.model));
  });

  const materialColumns = Array.from(materialSet).sort();
  const equipmentColumns = Array.from(equipmentSet).sort();

  // ============================
  // Colunas base (corrigidas)
  // ============================
  const baseColumns = [
    { header: "BD", key: "bd", width: 20 },
    { header: "Cliente", key: "clientName", width: 30 },
    { header: "Técnico", key: "technician", width: 25 },
    { header: "Lote drop", key: "dropBatch", width: 20 },
    { header: "Cunhas", key: "strap", width: 10 },
    { header: "Fibra", key: "fiber", width: 10 },
    { header: "Conector interno", key: "internalConnector", width: 20 },
    { header: "Conector externo", key: "externalConnector", width: 20 },
    { header: "Data", key: "createdAt", width: 20 },
  ];

  const dynamicColumns = [
    ...materialColumns.map((name) => ({
      header: name,
      key: `material_${name}`,
      width: 20,
    })),
    ...equipmentColumns.map((model) => ({
      header: model,
      key: `equipment_${model}`,
      width: 25,
    })),
  ];

  // ============================
  // Workbook
  // ============================
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "TrackMat";
  workbook.created = new Date();

  // ============================
  // Função de estilo padrão
  // ============================
  function styleSheet(sheet: ExcelJS.Worksheet) {
    // Congelar cabeçalho
    sheet.views = [{ state: "frozen", ySplit: 1 }];

    // Filtro automático
    const lastColumnLetter =
      sheet.getColumn(sheet.columnCount).letter;

    sheet.autoFilter = {
      from: "A1",
      to: `${lastColumnLetter}1`,
    };

    // Estilo do cabeçalho
    const headerRow = sheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
    headerRow.alignment = { vertical: "middle", horizontal: "center" };
    headerRow.height = 22;

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF1F2937" },
      };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Alinhamento geral
    sheet.columns.forEach((column) => {
      column.alignment = { vertical: "middle", horizontal: "left" };
    });

    // Centralizar colunas numéricas
    ["strap", "fiber"].forEach((key) => {
      sheet.getColumn(key).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    });

    // Formato de data
    sheet.getColumn("createdAt").numFmt = "dd/mm/yyyy";

    // Bordas em todas as células
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });
  }

  // ============================
  // ABA GERAL
  // ============================
  const sheetAll = workbook.addWorksheet("Geral");
  sheetAll.columns = [...baseColumns, ...dynamicColumns];

  data.forEach((item) => {
    const row: ExcelRow = {
      bd: item.bd,
      clientName: item.clientName,
      technician: item.technician?.name ?? "Sem técnico",
      dropBatch: item.dropBatch ?? "",
      strap: item.strap ?? "",
      fiber: item.fiber ?? "",
      internalConnector: item.internalConnector ?? "",
      externalConnector: item.externalConnector ?? "",
      createdAt: item.createdAt,
    };

    item.materials.forEach((m) => {
      row[`material_${m.name}`] = m.quantity;
    });

    item.equipments.forEach((e) => {
      row[`equipment_${e.model}`] = e.serial;
    });

    sheetAll.addRow(row);
  });

  styleSheet(sheetAll); // azul

  // ============================
  // ABAS POR TÉCNICO
  // ============================
  const grouped = data.reduce((acc, item) => {
    const name = item.technician?.name ?? "Sem técnico";
    if (!acc[name]) acc[name] = [];
    acc[name].push(item);
    return acc;
  }, {} as Record<string, UsedMaterialWithTech[]>);

  for (const techName in grouped) {
    const sheet = workbook.addWorksheet(techName.slice(0, 31));
    sheet.columns = [...baseColumns, ...dynamicColumns];

    grouped[techName].forEach((item) => {
      const row: ExcelRow = {
        bd: item.bd,
        clientName: item.clientName,
        technician: techName,
        dropBatch: item.dropBatch ?? "",
        strap: item.strap ?? "",
        fiber: item.fiber ?? "",
        internalConnector: item.internalConnector ?? "",
        externalConnector: item.externalConnector ?? "",
        createdAt: item.createdAt,
      };

      item.materials.forEach((m) => {
        row[`material_${m.name}`] = m.quantity;
      });

      item.equipments.forEach((e) => {
        row[`equipment_${e.model}`] = e.serial;
      });

      sheet.addRow(row);
    });

    styleSheet(sheet); // verde
  }

  // ============================
  // Geração com senha
  // ============================
  return workbook.xlsx.writeBuffer();
}
