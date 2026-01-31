import SocialLogin from "../../components/Layout/ِِAuthLayout/SocialLogin";
import AuthNavbar from "../../components/Layout/ِِAuthLayout/AuthNavbar";
import AuthLeftSide from "../../components/Layout/ِِAuthLayout/AuthLeftSide";
import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { Eye, EyeDisabled } from "@tailgrids/icons";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export default function ResetPassword() {
  const createPassRef = useRef(null);
  const reEnterPassRef = useRef(null);
  const go = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const email = location.state?.email;
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(null);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setIsValidPassword(passwordRegex.test(value));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    e.preventDefault();
    if (!createPassRef.current.value || !reEnterPassRef.current.value)
      return toast.error("Password required");
    if (createPassRef.current.value !== reEnterPassRef.current.value)
      return toast.error("Passwords do not match");

    setLoading(true);

    const data = {
      email: email,
      newPassword: createPassRef.current.value.trim(),
    };
    try {
      await resetPassword({
        email,
        newPassword: createPassRef.current.value.trim(),
      });
      toast.success("Password reset successfully");
      go("/login");
    } catch (err) {
      toast.success("Reset Failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex font-sans">
      <Toaster position="top-center" />
      <AuthLeftSide />

      <div className="relative flex flex-col w-full lg:w-1/2 h-screen px-8 lg:px-20">
        <AuthNavbar loginBtn={"Login"} />

        <div className="flex flex-col justify-center flex-grow max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold text-black mb-8">Set a password</h2>

          <form className="flex flex-col gap-5" onSubmit={handleResetPassword}>
            <div className="relative flex flex-col gap-2">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Create Password"
                className={`w-full p-4 rounded-xl border
                            ${
                              isValidPassword === null
                                ? "border-gray-200"
                                : isValidPassword
                                  ? "border-green-500 focus:border-green-500"
                                  : "border-red-500 focus:border-red-500"
                            }
                            focus:outline-none shadow-sm`}
                ref={createPassRef}
              />
              <span
                className="absolute right-3 top-5 text-sm text-gray-600 cursor-pointer"
                onClick={() => {
                  setShowPass(!showPass);
                }}
              >
                {showPass ? <Eye /> : <EyeDisabled />}
              </span>
              {isValidPassword === false && (
                <div className="mt-2 w-full bg-red-50 text-red-600 text-sm p-3 rounded-lg shadow">
                  Password must include uppercase, lowercase, number & special
                  character
                </div>
              )}

              {isValidPassword === true && (
                <p className="text-sm text-green-600">Strong password</p>
              )}
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
                {showPass ? <Eye /> : <EyeDisabled />}
              </span>
            </div>

            <button className="w-full bg-[#4461F2] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition active:scale-95">
              {loading ? <LoaderIcon className="m-auto" /> : "Reset Password"}
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
