export function Topbar() {
  const name = localStorage.getItem("user_name") ?? "Adminov Admin Adminovich";

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/60 backdrop-blur flex items-center justify-between px-6">
      <div className="font-medium">Hub R</div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-300">{name}</span>
        <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center">
          <span className="text-sm">A</span>
        </div>
      </div>
    </header>
  );
}