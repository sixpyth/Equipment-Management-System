export function Card(props: {
  title: string;
  value: string | number;
  hint?: string;
  wide?: boolean;
  tone?: "default" | "warn" | "danger";
}) {
  const tone =
    props.tone === "danger"
      ? "border-red-900/40"
      : props.tone === "warn"
      ? "border-amber-900/40"
      : "border-slate-800";

  return (
    <div className={`bg-slate-900/40 border ${tone} rounded-2xl p-4 ${props.wide ? "h-full" : ""}`}>
      <div className="text-sm text-slate-400">{props.title}</div>
      <div className="text-3xl font-semibold mt-2">{props.value}</div>
      {props.hint && <div className="text-xs text-slate-500 mt-2">{props.hint}</div>}
    </div>
  );
}