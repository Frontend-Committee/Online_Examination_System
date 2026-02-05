import SocialLogin from "../../components/Layout/ِِAuthLayout/SocialLogin";
import AuthNavbar from "../../components/Layout/ِِAuthLayout/AuthNavbar";
import AuthLeftSide from "../../components/Layout/ِِAuthLayout/AuthLeftSide";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/authService";

export default function RecoverPassword() {
  const emailRef = useRef(null);
  const go = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRecovery = async (e) => {
    e.preventDefault();
    if (!emailRef.current.value) return alert("Email required");
    setLoading(true);
    try {
      await forgotPassword(emailRef.current.value.trim());
      go("/verifyCode", { state: { email: emailRef.current.value.trim() } });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send recovery email");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex font-sans">
      <AuthLeftSide />

      <div className="relative flex flex-col w-full lg:w-1/2 h-screen px-8 lg:px-20">
        <AuthNavbar loginBtn={"Login"} />

        <div className="flex flex-col justify-center flex-grow max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold text-black mb-8">
            Forgot your password?
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleRecovery}>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={emailRef}
              />
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
              {loading ? "Sending..." : "Send Code"}
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
