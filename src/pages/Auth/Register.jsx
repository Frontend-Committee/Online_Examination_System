import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple, FaTwitter } from "react-icons/fa";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { register } from "../../services/authService";
import AuthLeftSide from "../../components/Layout/ِِAuthLayout/AuthLeftSide";
import AuthNavbar from "../../components/Layout/ِِAuthLayout/AuthNavbar";
import SocialLogin from "../../components/Layout/ِِAuthLayout/SocialLogin";

export default function Register() {
  const [show, setShow] = useState(false);
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmPassRef = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      firstname: fnameRef.current.value.trim(),
      lastname: lnameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passRef.current.value.trim(),
      repassword: confirmPassRef.current.value.trim(),
    };

    try {
      const res = await register(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans">
      <AuthLeftSide />

      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:px-20 relative">
        <AuthNavbar />

        <div className="flex flex-col justify-center flex-grow max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold text-black mb-8">Sign up</h2>

          <form className="flex flex-col gap-5" onSubmit={handleRegister}>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={fnameRef}
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={lnameRef}
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={emailRef}
              />
            </div>

            <div className="relative flex flex-col gap-2">
              <input
                type={show ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={passRef}
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
                placeholder="Password"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={confirmPassRef}
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

            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="text-md text-[#6C737F]">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="text-[#4461F2] text-sm font-medium hover:underline"
              >
                Login
              </Link>
            </div>

            <button className="w-full bg-[#4461F2] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition active:scale-95">
              Create Account
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
