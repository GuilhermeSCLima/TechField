export default function CadernoTesteLista({
  numeros,
  checados,
  toggleCheck,
}: {
  numeros: string[];
  checados: number[];
  toggleCheck: (index: number) => void;
}) {
  return (
    <div className="mt-2 text-sm text-stone-300 flex flex-col gap-2">
      {numeros.map((num, i) => (
        <label
          key={i}
          className={`flex items-center gap-2 p-2 rounded cursor-pointer transition ${
            checados.includes(i)
              ? "bg-green-700/40"
              : "hover:bg-stone-700/50"
          }`}
        >
          <input
            type="checkbox"
            checked={checados.includes(i)}
            onChange={() => toggleCheck(i)}
            className="accent-green-500"
          />
          <span className={checados.includes(i) ? "line-through opacity-70" : ""}>
            {num}
          </span>
        </label>
      ))}
    </div>
  );
}
