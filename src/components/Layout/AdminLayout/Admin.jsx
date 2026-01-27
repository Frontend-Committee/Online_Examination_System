import { Outlet } from "react-router-dom";
import LeftBar from "./LeftBar";
import TopBar from "./TopBar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <LeftBar />
      <main className="flex-1">
        <TopBar />
        <div className="p-6">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;