import React from "react";
import { Link } from "react-router-dom";
import { login } from "../../../services/authService";

export default function AuthNavbar({ loginBtn }) {
  return (
    <div className="flex justify-end text-md items-center gap-6 mb-16 mt-4">
      <button className="text-black font-medium">English</button>
      <Link to={loginBtn === "Login" ? "/login" : "/register"}>
        <button className="bg-white text-[#4461F2] px-6 py-2 rounded-xl shadow-sm border border-gray-100 font-medium hover:bg-gray-50 transition">
          {loginBtn}
        </button>
      </Link>
    </div>
  );
}
