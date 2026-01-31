import SocialLogin from "../../components/Layout/ِِAuthLayout/SocialLogin";
import AuthNavbar from "../../components/Layout/ِِAuthLayout/AuthNavbar";
import AuthLeftSide from "../../components/Layout/ِِAuthLayout/AuthLeftSide";
import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";

export default function ResetPassword() {
  const createPassRef = useRef(null);
  const reEnterPassRef = useRef(null);
  const go = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const email = location.state?.email;

  const handleResetPassword = async (e) => {
    e.preventDefault();
    e.preventDefault();
    if (!createPassRef.current.value || !reEnterPassRef.current.value)
      return alert("Password required");
    if (createPassRef.current.value !== reEnterPassRef.current.value)
      return alert("Passwords do not match");

    setLoading(true);

    const data = {
      email: "ahmedmutti@gmail.com",
      newPassword: createPassRef.current.value.trim(),
    };
    try {
      await resetPassword({
        email,
        newPassword: createPassRef.current.value.trim(),
      });
      alert("Password reset successful!");
      go("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
    setLoading(false);
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
                type={showPass ? "text" : "password"}
                placeholder="Create Password"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={createPassRef}
              />
              <span
                className="absolute right-3 top-5 text-sm text-gray-600 cursor-pointer"
                onClick={() => {
                  setShowPass(!showPass);
                }}
              >
                {showPass ? "Hide" : "Show"}
              </span>
            </div>
            <div className="relative flex flex-col gap-2">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter Password"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={reEnterPassRef}
              />
              <span
                className="absolute right-3 top-5 text-sm text-gray-600 cursor-pointer"
                onClick={() => {
                  setShowConfirm(!showConfirm);
                }}
              >
                {showConfirm ? "Hide" : "Show"}
              </span>
            </div>

            <button className="w-full bg-[#4461F2] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition active:scale-95">
              {loading ? "Resetting..." : "Reset Password"}
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
