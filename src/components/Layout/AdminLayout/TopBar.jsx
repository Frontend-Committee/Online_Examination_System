import { CiSearch } from "react-icons/ci";
import { HiMenuAlt2 } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import LeftBar from "./LeftBar";
import { Drawer } from "@material-tailwind/react";

const TopBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const isDetailsPage = location.pathname.includes("subjects/");

  return (
    <nav className="flex items-center justify-between w-full p-5 lg:bg-transparent bg-main-blue">
      <div className="flex items-center gap-4 px-4 lg:hidden">
        <HiMenuAlt2
          className="w-8 h-8 text-white cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        />
        <CiSearch className="w-6 h-6 text-white" />
      </div>

      <div className="relative flex-1 mx-4 hidden lg:flex items-center max-w-[62em]">
        <CiSearch className="absolute w-5 h-5 text-main-blue left-4" />
        <input
          className="w-full bg-white placeholder:text-Gray text-Gray text-base border-none rounded-2xl py-3 pl-12 pr-4 transition duration-300 focus:outline-none shadow-[0px_4px_20px_rgba(0,0,0,0.05)]"
          placeholder="Search Quiz"
        />
      </div>

      <div className="flex items-center gap-4 px-4 md:gap-6">
        <button
          className="hidden lg:block rounded-xl bg-main-blue text-white py-2 px-6 md:px-8 text-base font-semibold shadow-[0px_4px_15px_rgba(5,12,156,0.3)] hover:scale-105 transition-all active:scale-95"
          type="button"
        >
          {isDetailsPage ? "Add Quiz" : "Add Diploma"}
        </button>

        <div className="relative w-10 h-10 border-2 border-white rounded-full md:w-12 md:h-12">
          <img
            src="/assets/images/avatar.jpg"
            alt="avatar"
            className="object-cover w-full h-full rounded-full shadow-inner"
          />
        </div>
      </div>

      <Drawer
        placement="top"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="h-auto p-0"
        overlayProps={{
          className: "fixed inset-0 bg-black bg-opacity-50",
        }}
      >
        <LeftBar isMobile={true} closeDrawer={() => setIsDrawerOpen(false)} />
      </Drawer>
    </nav>
  );
};

export default TopBar;
