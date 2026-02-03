import { useContext, useRef, useState } from "react";
import { login } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import AuthLeftSide from "../../components/Layout/ِِAuthLayout/AuthLeftSide";
import AuthNavbar from "../../components/Layout/ِِAuthLayout/AuthNavbar";
import SocialLogin from "../../components/Layout/ِِAuthLayout/SocialLogin";
import { AuthContext } from "../../Context/AuthContext";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { Eye, EyeDisabled } from "@tailgrids/icons";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const { state, dispatch } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const go = useNavigate();

  const onSubmit = async (data) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await login(data);
      const userData = res.data.user;
      const token = res.data.token;
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: userData, token } });
      toast.success("Login Success");
      go("/user");
    } catch (error) {
      toast.error("Email or Password are wrong");
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.message || "Login Failed",
      });
    }
  };

  return (
    <div className="h-screen w-full flex font-sans">
      <Toaster position="top-center" />
      <AuthLeftSide />

      <div className="relative flex flex-col w-full lg:w-1/2 h-screen px-8 lg:px-20">
        <AuthNavbar loginBtn={"Register"} />

        <div className="flex flex-col justify-center flex-grow w-full max-w-md mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-black">Sign in</h2>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                {...register("email", { required: "Email is required" })}
              />
            </div>

            <div className="relative flex flex-col gap-2">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                {...register("password", { required: "Password is required" })}
              />
              <span
                className="absolute text-sm text-gray-600 cursor-pointer right-3 top-5"
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? <Eye /> : <EyeDisabled />}
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
              {state.loading ? <LoaderIcon className="m-auto" /> : "Sign in"}
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
};

export default Login;
