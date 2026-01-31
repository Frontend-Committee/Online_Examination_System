import { useContext, useRef, useState } from "react";
import { login } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import AuthLeftSide from "../../components/Layout/ِِAuthLayout/AuthLeftSide";
import AuthNavbar from "../../components/Layout/ِِAuthLayout/AuthNavbar";
import SocialLogin from "../../components/Layout/ِِAuthLayout/SocialLogin";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const go = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailRef.current.value || !passRef.current.value) return;

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await login({
        email: emailRef.current.value.trim(),
        password: passRef.current.value.trim(),
      });
      const userData = res.data.user;
      const token = res.data.token;

      // localStorage.setItem("token", token);
      // localStorage.setItem("user", JSON.stringify(userData));

      dispatch({ type: "LOGIN_SUCCESS", payload: { user: userData, token } });
      go("/user");
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.message || "Login Failed",
      });
    }
  };

  return (
    <div className="h-screen w-full flex font-sans">
      <AuthLeftSide />

      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:px-20 relative">
        <AuthNavbar loginBtn={"Register"} />

        <div className="flex flex-col justify-center flex-grow max-w-md mx-auto w-full">
          <h2 className="text-2xl font-bold text-black mb-8">Sign in</h2>

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                ref={emailRef}
              />
            </div>

            <div className="relative flex flex-col gap-2">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
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

            <div className="flex justify-end">
              <Link
                to="/recover-password"
                className="text-[#4461F2] text-sm font-medium hover:underline"
              >
                Recover Password ?
              </Link>
            </div>

            <button className="w-full bg-[#4461F2] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition active:scale-95">
              {state.loading ? "Loading" : "Sign in"}
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
};

export default Login;
