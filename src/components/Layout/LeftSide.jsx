import { Link } from "react-router-dom";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { BiSolidLogOut } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const SideBar = ({ isMobile, closeDrawer }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <Card
      className={`w-full p-4 flex flex-col bg-white border-none transition-all duration-300
    ${isMobile ? "h-auto rounded-b-2xl shadow-none" : "hidden lg:flex h-screen max-w-[15rem] rounded-xl shadow-xl"}
  `}
    >
      <div className="flex items-center justify-between p-4 mb-6">
        <img
          src="/assets/icons/Final_Logo.png"
          alt="Elevate Logo"
          className="w-24 lg:w-36"
        />
        {isMobile && (
          <IoClose
            className="text-gray-700 cursor-pointer w-7 h-7"
            onClick={closeDrawer}
          />
        )}
      </div>

      <List className="min-w-0 p-2 ">
        <ListItem
          onClick={() => {
            setActiveTab("dashboard");
            if (isMobile) closeDrawer();
          }}
          className={`${
            activeTab === "dashboard"
              ? "bg-main-blue text-white hover:bg-main-blue active:bg-main-blue focus:bg-main-blue focus:text-white"
              : "text-Gray hover:bg-blue-50"
          } p-2 rounded-lg transition-all cursor-pointer mb-3`}
        >
          <ListItemPrefix className="mr-3">
            <MdSpaceDashboard
              className={`w-5 h-5 ${activeTab === "dashboard" ? "text-white focus:bg-main-blue focus:text-white" : "text-main-blue"}`}
            />
          </ListItemPrefix>
          <span className="font-medium">Dashboard</span>
        </ListItem>

        <ListItem
          onClick={() => {
            setActiveTab("history");
            if (isMobile) closeDrawer();
          }}
          className={`${
            activeTab === "history"
              ? "bg-main-blue text-white hover:bg-main-blue active:bg-main-blue focus:bg-main-blue focus:text-white"
              : "text-Gray hover:bg-blue-50"
          } p-2 rounded-lg transition-all cursor-pointer mb-6`}
        >
          <ListItemPrefix className="mr-3">
            <FaHistory
              className={`w-5 h-5 ${activeTab === "history" ? "text-white focus:bg-main-blue focus:text-white" : "text-main-blue"}`}
            />
          </ListItemPrefix>
          <span className="font-medium">Quiz History</span>
        </ListItem>

        <ListItem
          onClick={() => {
            setActiveTab("logout");
            if (isMobile) closeDrawer();
          }}
          className={`${
            activeTab === "logout"
              ? "bg-main-blue text-white hover:bg-main-blue active:bg-main-blue focus:bg-main-blue focus:text-white"
              : "text-Gray hover:bg-blue-50"
          } p-2 rounded-lg transition-all cursor-pointer`}
        >
          <ListItemPrefix className="mr-3">
            <BiSolidLogOut
              className={`w-5 h-5 ${activeTab === "logout" ? "text-white focus:bg-main-blue focus:text-white" : "text-main-blue"}`}
            />
          </ListItemPrefix>
          <span className="font-medium">Log Out</span>
        </ListItem>
      </List>
    </Card>
  );
};

export default SideBar;
