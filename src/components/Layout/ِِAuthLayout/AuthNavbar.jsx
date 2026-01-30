import React from "react";

export default function AuthNavbar() {
  return (
    <div className="flex justify-end text-xl items-center gap-6 mb-16 mt-4">
      <button className="text-black font-medium">English</button>
      <button className="text-[#4461F2] font-bold">Sign in</button>
      <button className="bg-white text-[#4461F2] px-6 py-2 rounded-xl shadow-sm border border-gray-100 font-medium hover:bg-gray-50 transition">
        Register
      </button>
    </div>
  );
}
