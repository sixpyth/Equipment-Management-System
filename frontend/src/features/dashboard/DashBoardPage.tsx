import { useEffect, useState } from "react";
import { Card } from "../../ui/Card";
import type { DashboardStats } from "../../api/types";
import { getDashboardStats } from "../../api/endpoints";
import { Loading } from "../../ui/Loading";

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch((e) => setErr(e?.message ?? "Ошибка загрузки"));
  }, []);

  if (err) return <div className="text-red-300">{err}</div>;
  if (!stats) return <Loading />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Добро пожаловать! {localStorage.getItem("user_name") ?? "Adminov Admin Adminovich"}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card title="Мои заявки" value={stats.my_requests} hint="Нажмите для просмотра →" />
        <Card title="Активные" value={stats.active} hint="Нажмите для просмотра →" />
        <Card title="Просроченные" value={stats.overdue} hint="Нажмите для просмотра →" tone="danger" />
        <Card title="Ожидают действия" value={stats.awaiting_action} hint="Нажмите для просмотра →" tone="warn" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <Card
            title="Оборудование"
            value={`${stats.equipment_available} / ${stats.equipment_total}`}
            hint="доступно"
            wide
          />
        </div>
        <Card title="Сегодня" value={stats.today_requests} hint="заявок" />
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="font-medium">Дежурные на сегодня</div>
          <div className="text-xs text-slate-500">Смены не назначены</div>
        </div>
        <div className="mt-6 text-slate-500 text-sm text-center py-10">
          
        </div>
      </div>
    </div>
  );
}