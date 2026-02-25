import { NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/issues", label: "Заявки" },
  { to: "/shifts", label: "Ориентировки на день" },
  { to: "/equipment", label: "Оборудование" },
  { to: "/users", label: "Пользователи" },
  { to: "/rfid", label: "RFID карты" },
  { to: "/profile", label: "Профиль" }
];

export function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900/60 border-r border-slate-800 p-4">
      <div className="mb-6">
        <div className="text-xl font-semibold">Hub R</div>
        <div className="text-xs text-slate-400 mt-1">
          Система управления заявками на съёмочное оборудование
        </div>
      </div>

      <nav className="space-y-1">
        {nav.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm transition
               ${isActive ? "bg-sky-500/20 text-sky-200" : "text-slate-200 hover:bg-slate-800/60"}`
            }
          >
            {i.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-10 pt-6 border-t border-slate-800 text-xs text-slate-500">
        <div>Версия: 1.0</div>
      </div>
    </aside>
  );
}