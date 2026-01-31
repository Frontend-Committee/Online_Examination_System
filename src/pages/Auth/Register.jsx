import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { register } from "../../services/authService";
import AuthLeftSide from "../../components/Layout/ِِAuthLayout/AuthLeftSide";
import AuthNavbar from "../../components/Layout/ِِAuthLayout/AuthNavbar";
import SocialLogin from "../../components/Layout/ِِAuthLayout/SocialLogin";
import { AuthContext } from "../../Context/AuthContext";

export default function Register() {
  const { state, dispatch } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const usernameRef = useRef(null);
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const confirmPassRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const go = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !usernameRef.current.value ||
      !fnameRef.current.value ||
      !lnameRef.current.value ||
      !emailRef.current.value ||
      !passRef.current.value ||
      !confirmPassRef.current.value ||
      !phoneNumberRef.current.value
    )
      return;
    if (passRef.current.value !== confirmPassRef.current.value) {
      alert("Passwords do not match");
      return;
    }
    const data = {
      username: usernameRef.current.value.trim(),
      firstName: fnameRef.current.value.trim(),
      lastName: lnameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passRef.current.value.trim(),
      rePassword: confirmPassRef.current.value.trim(),
      phone: phoneNumberRef.current.value.trim(),
    };
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await register(data);
      dispatch({ type: "REGISTER_SUCCESS" });
      go("/login");
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: error.response?.data?.message || "Register Failed",
      });
    }
  };

  return (
    <div className="flex w-full min-h-screen font-sans">
      <AuthLeftSide />

      <div className="relative flex flex-col w-full p-8 lg:w-1/2 lg:px-20">
        <AuthNavbar loginBtn={"Login"} />

        <div className="flex flex-col justify-center flex-grow w-full max-w-md mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-black">Sign up</h2>

          <form className="flex flex-col gap-5" onSubmit={handleRegister}>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={usernameRef}
              />
            </div>
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
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={passRef}
              />
              <span
                className="absolute text-sm text-gray-600 cursor-pointer right-3 top-5"
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
                placeholder="Confrim Password"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={confirmPassRef}
              />
              <span
                className="absolute text-sm text-gray-600 cursor-pointer right-3 top-5"
                onClick={() => {
                  setShowConfirm(!showConfirm);
                }}
              >
                {showConfirm ? "Hide" : "Show"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={phoneNumberRef}
              />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
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
              {state.loading ? "Loading..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative px-4 text-sm text-gray-400 bg-white">
              Or Continue with
            </span>
          </div>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
}
