type FieldTypes = 'text' | 'textarea' | 'select'
type SelectField = {
  label: string;
  value: string;
}

export interface Field {
  label: string;
  name: string;
  type: FieldTypes
  selectItens?: SelectField[],
  autocomplete?: string[],
  placeholder: string
}

interface Carimbo {
  name: string;
  fields: Field[];
  template: (values: Record<string, string>) => string;
}

export const CARIMBOS: Record<string, Carimbo> = {
  provisionamento: {
    name: "Provisionamento ONT/HGU",
    fields: [
      {
        label: 'Atividade',
        name: 'atividade',
        placeholder: 'Tipo de atividade',
        type: 'select',
        selectItens: [
          {
            label: 'Ativação',
            value: 'Ativação'
          },
          {
            label: 'Migração',
            value: 'Migração'
          },
        ]
      },
      {
        label: 'Equipamento',
        name: 'equipamento',
        placeholder: 'Tipo de equipamento',
        type: 'select',
        selectItens: [
          {
            label: 'ONT',
            value: 'ONT'
          },
          {
            label: 'HGU',
            value: 'HGU'
          }
        ]
      },
      {
        label: 'Produto',
        name: 'produto',
        placeholder: 'Ex.: IP dedicado',
        type: 'text',
        autocomplete: ['IP dedicado', 'IP dedicado Fenix', 'IP light', 'IP light Fenix', 'VPN IP MPLS', 'SIP', 'Vox IP', 'E-line']
      },
      {
        label: 'Serial GPON',
        placeholder: 'Ex.: MSTC12345943',
        name: 'serialGpon',
        type: 'text'
      },
      {
        label: 'Designador / ID',
        name: 'designador',
        placeholder: 'Ex.: SJP-192873123-069',
        type: 'text'
      },
      {
        label: 'OS TBS / ORD',
        name: 'osTbs',
        placeholder: 'Ex.: 60231234',
        type: 'text'
      },
      {
        label: 'VLAN',
        name: 'vlan',
        placeholder: 'Ex.: 1243',
        type: 'text'
      },

    ],
    template(values) {
      const get = (name: string) => values[name] ?? "";

      return `🔗Provisionamento de ONT/HGU🔗

ATIVIDADE: ${get("atividade")}
EQUIPAMENTO: ${get("equipamento")}
PRODUTO: ${get("produto")}
SERIAL GPON: ${get("serialGpon")}
DESIGNADOR: ${get("designador")}
OS TBS: ${get("osTbs")}
VLAN: ${get("vlan")}
`;
    }
  },
  reparo: {
    name: "Reparo",
    fields: [
      {
        label: 'Técnico',
        name: 'tecnico',
        placeholder: 'Nome do técnico',
        type: 'text'
      },
      {
        label: 'Ordem de serviço',
        name: 'os',
        placeholder: 'Número da ordem de serviço',
        type: 'text'
      },
      {
        label: 'Cliente',
        name: 'cliente',
        placeholder: 'Nome do cliente',
        type: 'text'
      },
      {
        label: 'Endereço',
        name: 'endereco',
        placeholder: 'Endereço do cliente',
        type: 'textarea'
      },
      {
        label: 'Nome validação',
        name: 'nome_validar',
        placeholder: 'Nome de quem validou',
        type: 'text'
      },
      {
        label: 'Numero validação',
        name: 'numero_validar',
        placeholder: 'Numero de contato de quem validou',
        type: 'text'
      },
      {
        label: 'Dados de rede',
        name: 'rede',
        placeholder: 'Ex.: PR_SJP I06SP157G0123 Pós. 1',
        type: 'text'
      },
      {
        label: 'Designador / ID',
        name: 'designador',
        placeholder: 'Ex.: SJP-192873123-069',
        type: 'text'
      },
      {
        label: 'Causa raiz',
        name: 'causa_raiz',
        placeholder: 'Defeito encontrado',
        type: 'textarea'
      },
      {
        label: 'Ação',
        name: 'acao',
        placeholder: 'Ação tomada para correção do problema',
        type: 'textarea'
      },
      {
        label: 'Materiais utilizados',
        name: 'materiais_utilizados',
        placeholder: 'Materiais utilizados na correção do problema',
        type: 'textarea'
      },
      {
        label: 'Proxima atualização',
        name: 'proxima_atualizacao',
        placeholder: 'Selecione a próxima atualização',
        type: 'select',
        selectItens: [
          {
            label: 'Concluir',
            value: 'Concluir'
          },
          {
            label: 'Suspender',
            value: 'Suspender'
          },
          {
            label: 'Não concluir',
            value: 'Não concluir'
          },
        ]
      },
    ],
    template: (values) => { 
      const get = (name: string) => values[name] ?? "";

      return `⚠️Atualização Reparo B2B ⚠️
      
Técnico: ${get("tecnico")}
${values.os ? `OS: ${get("os")}\n` : ''}
Cliente: ${get("cliente")}
Endereço: ${get("endereco")}${values.nome_validar || values.numero_validar ? `\n\nValidado por: ${values.nome_validar? `\n${values.nome_validar}`: ''} ${values.numero_validar? `\n${values.numero_validar}`: ''}` : '' }
${values.rede? `\nDados de rede: ${get("rede")}\n` : ''}
OS/TA/DESIGNADOR: ${get("designador")}

CAUSA RAIZ: ${values.causa_raiz? `\n${get("causa_raiz")}` : ''}

AÇÃO: ${values.acao? `\n${get("acao")}` : ''}

Materiais Utilizados: ${values.materiais_utilizados? `\n${get("materiais_utilizados")}` : ''}

Próxima Atualização:
${get("proxima_atualizacao")  }
      ` }
  },
  instalacao: {
    name: "Ativação/Migração",
    fields: [
      {
        name: "tecnico",
        label: "Técnico",
        type: "text",
        placeholder: "Nome do técnico"
      },
      {
        name: "id",
        label: "Designador / ID",
        type: "text",
        placeholder: "Ex.: SJP-192873123-069"
      },
      {
        name: "os",
        label: "OS TBS / ORD",
        type: "text",
        placeholder: "Ex.: ORD012314"
      },
      {
        name: "cliente",
        label: "Cliente",
        type: "text",
        placeholder: "Nome do cliente"
      },
      {
        name: "endereco",
        label: "Endereço",
        type: "textarea",
        placeholder: "Endereço do cliente"
      },
      {
        name: "observacao",
        label: "Observação",
        type: "textarea",
        placeholder: "Observação sobre a atividade"
      },
      {
        name: "material_utilizado",
        label: "Material utilizado",
        type: "textarea",
        placeholder: "Material utilizado na atividade"
      },
      {
        name: "proxima_atualizacao",
        label: "Próxima atualização",
        type: "select",
        placeholder: "Selecione a próxima atualização",
        selectItens: [
          {
            label: 'Concluir',
            value: 'Concluir'
          },
          {
            label: 'Suspender',
            value: 'Suspender'
          },
          {
            label: 'Não concluir',
            value: 'Não concluir'
          }
        ]
      }
    ],
    template: (values) => { 
      const get = (name: string) => values[name] ?? "";

      return `🚀 Atualização Instalação/Migração B2B 🚀

Técnico: ${get("tecnico")}
Designador / ID: ${get("id")}
OS TBS / ORD: ${get("os")}
Cliente: ${get("cliente")}

Endereço: 
${get("endereco")}
${values.observacao? `\nObservação: \n${get("observacao")}` : ''}
${values.material_utilizado? `\nMaterial utilizado: \n${get("material_utilizado")}` : ''}`;
    }
  },
  lancamento: {
    name: "Lançamento de rede",
    fields: [
      {
        name: "tecnico",
        label: "Técnico",
        type: "text",
        placeholder: "Nome do técnico"
      },
      {
        name: "os",
        label: "OS TBS / ORD",
        type: "text",
        placeholder: "Ex.: ORD012314"
      },
      {
        name: "cliente",
        label: "Cliente",
        type: "text",
        placeholder: "Nome do cliente"
      },
      {
        name: "endereco",
        label: "Endereço",
        type: "textarea",
        placeholder: "Endereço do cliente"
      },
      {
        name: "potencia",
        label: "Potência",
        type: "text",
        placeholder: "Potência no cliente"
      },
      {
        name: "rede",
        label: "Dados de rede",
        type: "text",
        placeholder: "Dados de rede do cliente"
      },
      {
        name: "observacao",
        label: "Observações",
        type: "textarea",
        placeholder: "Ação tomada durante o lançamento"
      },
      {
        name: "material_utilizado",
        label: "Materiais utilizados",
        type: "textarea",
        placeholder: "Materiais utilizados durante o lançamento"
      },
      {
        name: "proxima_atualizacao",
        label: "Próxima atualização",
        type: "select",
        placeholder: "Selecione a próxima atualização",
        selectItens: [
          {
            label: 'Concluir',
            value: 'Concluir'
          },
          {
            label: 'Suspender',
            value: 'Suspender'
          },
          {
            label: 'Não concluir',
            value: 'Não concluir'
          }
        ]
      }
    ],
    template: (values) => { 
      const get = (name: string) => values[name] ?? "";

      return `🌐 Atualização Lançamento de rede B2B 🌐
      
Técnico: ${get("tecnico")}
OS: ${get("os")}

Cliente: ${get("cliente")}
Endereço: ${get("endereco")}

Potencia: ${get("potencia")} dbm

Dados de rede: ${get("rede")}${values.observacao? `\n\nObservações: \n${get("observacao")}` : ''}
${values.material_utilizado? `\nMateriais Utilizados: \n${get("material_utilizado")}\n` : ''}
Próxima Atualização: 
${get("proxima_atualizacao")}
      ` 
    }
  }
} as const;


export type CarimboType = keyof typeof CARIMBOS;

export function isCarimboType(
  value: string
): value is CarimboType {
  return value in CARIMBOS;
}

export function GetCarimbo(value: CarimboType) {
  return CARIMBOS[value] || {};
}