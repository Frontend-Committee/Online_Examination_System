import SocialLogin from "../../components/Layout/ِِAuthLayout/SocialLogin";
import AuthNavbar from "../../components/Layout/ِِAuthLayout/AuthNavbar";
import AuthLeftSide from "../../components/Layout/ِِAuthLayout/AuthLeftSide";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../../services/authService";

export default function ResetPassword() {
  const [show, setShow] = useState(false);

  const createPassRef = useRef(null);
  const reEnterPassRef = useRef(null);
  const go = useNavigate();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (
      !createPassRef.current.value ||
      createPassRef.current.value !== reEnterPassRef.current.value
    ) {
      alert("Passwords are required and must match");
      return;
    }

    const data = {
      email: "ahmedmutti@gmail.com",
      newPassword: createPassRef.current.value.trim(),
    };
    try {
      const res = await resetPassword(data);
      console.log(res);
      go("/user");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans">
      <AuthLeftSide />

      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:px-20 relative">
        <AuthNavbar />

        <div className="flex flex-col justify-center flex-grow max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold text-black mb-8">Set a password</h2>

          <form className="flex flex-col gap-5" onSubmit={handleResetPassword}>
            <div className="relative flex flex-col gap-2">
              <input
                type={show ? "text" : "password"}
                placeholder="Create Password"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={createPassRef}
              />
              <span
                className="absolute right-3 top-5 text-sm text-gray-600 cursor-pointer"
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? "Hide" : "Show"}
              </span>
            </div>
            <div className="relative flex flex-col gap-2">
              <input
                type={show ? "text" : "password"}
                placeholder="Re-enter Password"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={reEnterPassRef}
              />
              <span
                className="absolute right-3 top-5 text-sm text-gray-600 cursor-pointer"
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? "Hide" : "Show"}
              </span>
            </div>

            <div className="flex justify-end">
              <Link
                to="/recover-password"
                className="text-[#4461F2] text-sm font-medium hover:underline"
              >
                Recover Password ?
              </Link>
            </div>

            <button className="w-full bg-[#4461F2] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition active:scale-95">
              Sign in
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative bg-white px-4 text-gray-400 text-sm">
              Or Continue with
            </span>
          </div>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
