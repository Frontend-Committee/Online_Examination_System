import SocialLogin from "../../components/Layout/ِِAuthLayout/SocialLogin";
import AuthNavbar from "../../components/Layout/ِِAuthLayout/AuthNavbar";
import AuthLeftSide from "../../components/Layout/ِِAuthLayout/AuthLeftSide";
import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyCode } from "../../services/authService";

export default function VerifyCode() {
  const codeRef = useRef(null);
  const go = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!codeRef.current.value) return alert("Code required");
    setLoading(true);
    try {
      await verifyCode({ email, code: codeRef.current.value.trim() });
      go("/resetPassword", { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Code");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex font-sans">
      <AuthLeftSide />

      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:px-20 relative">
        <AuthNavbar />

        <div className="flex flex-col justify-center flex-grow max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold text-black mb-8">Verify Code</h2>

          <form className="flex flex-col gap-5" onSubmit={handleVerify}>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Enter Code"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={codeRef}
              />
            </div>

            <div className="flex justify-end items-center gap-2">
              <span className="text-md  text-[#6C737F]">
                Didn't receive a code?
              </span>

              <Link
                to=""
                className="text-[#4461F2] text-sm font-medium hover:underline"
              >
                Resend
              </Link>
            </div>

            <button className="w-full bg-[#4461F2] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition active:scale-95">
              {loading ? "Verifying..." : "Verify Code"}
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
