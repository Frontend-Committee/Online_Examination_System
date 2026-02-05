import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SideBar from "./LeftSide";
import NavBar from "./NavBar";
import ProfileCard from "./Profile";

const UserLayout = () => {
  const location = useLocation();

  const hideProfile =
    location.pathname.includes("subjects/") ||
    location.pathname.includes("history") ||
    location.pathname.includes("AllExams");

  return (
    <div className="flex w-full min-h-screen bg-soft-white">
      <SideBar isMobile={false} />
      <main className="flex flex-col flex-1 min-w-0 overflow-y-auto">
        <NavBar />
        <div className="p-4 space-y-6 lg:p-6">
          {!hideProfile && <ProfileCard />}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
