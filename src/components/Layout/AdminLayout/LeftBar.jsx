import { Link, useLocation } from "react-router-dom";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { BiSolidLogOut } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const LeftBar = ({ isMobile, closeDrawer }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { pathname } = useLocation();

  const isSubjectWithId =
    pathname.includes("/admin/subjects/") && pathname !== "/admin/subjects";

  return (
    <Card
      className={`w-full p-4 flex flex-col bg-white border-none transition-all duration-300
    ${isMobile ? "h-auto rounded-b-2xl shadow-none" : "hidden lg:flex h-screen max-w-[15rem] rounded-xl shadow-xl"}
  `}
    >
      <div className="flex items-center justify-between p-4 mb-6">
        <Link to="/admin" onClick={isMobile ? closeDrawer : undefined}>
          <img
            src="/assets/icons/Final_Logo.png"
            alt="Elevate Logo"
            className="w-24 cursor-pointer lg:w-36"
          />
        </Link>

        {isMobile && (
          <IoClose
            className="text-gray-700 cursor-pointer w-7 h-7"
            onClick={closeDrawer}
          />
        )}
      </div>

      <List className="min-w-0 p-2 ">
        <Link to="/admin">
          <ListItem
            onClick={() => {
              setActiveTab("dashboard");
              if (isMobile) closeDrawer();
            }}
            className={`${
              activeTab === "dashboard" && !isSubjectWithId
                ? "bg-main-blue text-white hover:bg-main-blue active:bg-main-blue focus:bg-main-blue focus:text-white"
                : "text-Gray hover:bg-blue-50"
            } p-2 rounded-lg transition-all cursor-pointer mb-3`}
          >
            <ListItemPrefix className="mr-3">
              <MdSpaceDashboard
                className={`w-5 h-5 ${activeTab === "dashboard" && !isSubjectWithId ? "text-white" : "text-main-blue"}`}
              />
            </ListItemPrefix>

            <span className="font-medium">Dashboard</span>
          </ListItem>
        </Link>

        <ListItem
          onClick={() => {
            setActiveTab("logout");
            if (isMobile) closeDrawer();
          }}
          className={`${
            activeTab === "logout" && !isSubjectWithId
              ? "bg-main-blue text-white hover:bg-main-blue active:bg-main-blue focus:bg-main-blue focus:text-white"
              : "text-Gray hover:bg-blue-50"
          } p-2 rounded-lg transition-all cursor-pointer`}
        >
          <ListItemPrefix className="mr-3">
            <BiSolidLogOut
              className={`w-5 h-5 ${activeTab === "logout" && !isSubjectWithId ? "text-white" : "text-main-blue"}`}
            />
          </ListItemPrefix>

          <span className="font-medium">Log Out</span>
        </ListItem>
      </List>
    </Card>
  );
};

export default LeftBar;
