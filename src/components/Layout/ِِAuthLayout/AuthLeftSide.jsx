import React from "react";

export default function AuthLeftSide() {
  return (
    <div className="hidden lg:flex w-1/2 bg-[#eff4ff] flex-col justify-between items-start px-16 py-5 relative">
      <div className="mt-14">
        <h1 className="text-7xl font-extrabold text-black mb-2">Welcome to</h1>
        <h1 className="text-6xl font-extrabold text-[#4461F2] mb-6">Elevate</h1>

        <p className="text-black text-xl mb-12 w-full">
          Quidem autem voluptatibus qui quaerat aspernatur architecto natus
        </p>
      </div>

      <div className="w-full flex justify-center">
        <img src="/public/assets/images/bro.png" className="object-fill" />
      </div>
    </div>
  );
}
