type Props = {
  text: string;
};

export function Badge({ text }: Props) {
  const color =
    text === "ACTIVE"
      ? "bg-green-600/20 text-green-300"
      : text === "OVERDUE"
      ? "bg-red-600/20 text-red-300"
      : text === "CLOSED"
      ? "bg-slate-600/30 text-slate-300"
      : "bg-amber-600/20 text-amber-300";

  return (
    <span className="px-2 py-1 rounded-md text-xs font-medium">
      <span className={color + " px-2 py-1 rounded-md"}>
        {text}
      </span>
    </span>
  );
}