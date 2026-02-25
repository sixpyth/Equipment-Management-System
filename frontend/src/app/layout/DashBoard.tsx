import { Outlet } from "react-router-dom";
import { Sidebar } from "./SideBar";
import { Topbar } from "./TopBar";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}