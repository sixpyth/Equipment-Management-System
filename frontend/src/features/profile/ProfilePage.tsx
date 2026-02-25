export function ProfilePage() {
  const name = localStorage.getItem("user_name") ?? "Adminov Admin Adminovich";

  return (
    <div className="space-y-4 max-w-xl">
      <h1 className="text-xl font-semibold">Профиль</h1>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 space-y-2">
        <div><span className="text-slate-400">ФИО:</span> {name}</div>
        <div><span className="text-slate-400">Роль:</span> Администратор</div>
        <div><span className="text-slate-400">Статус:</span> Активен</div>
      </div>
    </div>
  );
}