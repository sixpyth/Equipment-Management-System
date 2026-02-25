type Props = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
};

export function Input({ label, value, onChange, placeholder, type }: Props) {
  return (
    <div className="space-y-1">
      {label && <div className="text-xs text-slate-400">{label}</div>}
<input
  type={type ?? "text"}
  value={value}
  onChange={(e) => onChange(e.target.value)}
  className="
    w-full bg-slate-950 border border-slate-800
    rounded-lg px-3 py-2 text-sm text-slate-100
    focus:outline-none focus:border-sky-500
    cursor-pointer

    [&::-webkit-calendar-picker-indicator]:invert
  "
/>
    </div>
  );
}
<input type="date" style={{ background: "white", color: "black" }} />