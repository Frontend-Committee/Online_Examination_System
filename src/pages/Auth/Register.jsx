import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { register } from "../../services/authService";
import AuthLeftSide from "../../components/Layout/ِِAuthLayout/AuthLeftSide";
import AuthNavbar from "../../components/Layout/ِِAuthLayout/AuthNavbar";
import SocialLogin from "../../components/Layout/ِِAuthLayout/SocialLogin";
import { AuthContext } from "../../Context/AuthContext";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { Eye, EyeDisabled } from "@tailgrids/icons";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

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

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(null);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setIsValidPassword(passwordRegex.test(value));
  };

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
    ) {
      toast.error("Fill all the empty fields");
      return;
    }
    if (passRef.current.value !== confirmPassRef.current.value) {
      toast.error("Passwords do not match");
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
      await register(data);
      dispatch({ type: "REGISTER_SUCCESS" });
      toast.success("Account is Created Successfully");
      go("/login");
    } catch (error) {
      toast.error("Something Went Wrong, Try Again");
      dispatch({
        type: "REGISTER_FAILURE",
        payload: error.response?.data?.message || "Register Failed",
      });
    }
  };

  return (
    <div className="flex w-full min-h-screen font-sans">
      <Toaster position="top-center" />
      <AuthLeftSide />

      <div className="relative flex flex-col w-full lg:w-1/2 h-screen px-8 lg:px-20">
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
            <div className="flex  gap-2">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={fnameRef}
              />
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
                value={password}
                onChange={handlePasswordChange}
                className={`w-full p-4 rounded-xl border
                            ${
                              isValidPassword === null
                                ? "border-gray-200"
                                : isValidPassword
                                  ? "border-green-500 focus:border-green-500"
                                  : "border-red-500 focus:border-red-500"
                            }
                            focus:outline-none shadow-sm`}
                ref={passRef}
              />
              <span
                className="absolute text-sm text-gray-600 cursor-pointer right-3 top-5"
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
                {showConfirm ? <Eye /> : <EyeDisabled />}
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
              {state.loading ? (
                <LoaderIcon className="m-auto" />
              ) : (
                "Create Account"
              )}
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
