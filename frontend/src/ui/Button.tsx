type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
};

export function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
}: Props) {
  const styles = {
    primary:
      "bg-sky-600 hover:bg-sky-500 text-white",
    secondary:
      "bg-slate-700 hover:bg-slate-600 text-slate-100",
    danger:
      "bg-red-600 hover:bg-red-500 text-white",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition
        disabled:opacity-50 disabled:cursor-not-allowed
        ${styles[variant]}
      `}
    >
      {children}
    </button>
  );
}