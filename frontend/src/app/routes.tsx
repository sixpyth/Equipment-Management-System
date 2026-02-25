import { createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "./layout/DashBoard";
import { DashboardPage } from "../features/dashboard/DashBoardPage";
import { IssuesPage } from "../features/issues/IssuePage";
import { EquipmentPage } from "../features/equipment/EquipmentPage";
import { UsersPage } from "../features/users/UserPage";
import { RfidPage } from "../features/rfid/RfidPage";
import { ProfilePage } from "../features/profile/ProfilePage";

export const router = createBrowserRouter([
  {
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/issues", element: <IssuesPage /> },
      { path: "/equipment", element: <EquipmentPage /> },
      { path: "/users", element: <UsersPage /> },
      { path: "/rfid", element: <RfidPage /> },
      { path: "/profile", element: <ProfilePage /> },

      // заглушка под "Ориентировки на день"
      { path: "/shifts", element: <div className="text-slate-400">Раздел смен: в разработке</div> }
    ]
  }
]);