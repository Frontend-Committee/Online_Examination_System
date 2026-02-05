// Register2.jsx
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { register as registerUser } from "../../services/authService";
import AuthLeftSide from "../../components/Layout/ِِAuthLayout/AuthLeftSide";
import AuthNavbar from "../../components/Layout/ِِAuthLayout/AuthNavbar";
import SocialLogin from "../../components/Layout/ِِAuthLayout/SocialLogin";
import { AuthContext } from "../../Context/AuthContext";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { Eye, EyeDisabled } from "@tailgrids/icons";
import { useForm } from "react-hook-form";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export default function Register2() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const { state, dispatch } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const go = useNavigate();

  const onSubmit = async (data) => {
    dispatch({ type: "LOGIN_START" });
    try {
      await registerUser(data);
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
    <div className="flex flex-col lg:flex-row min-h-screen font-sans">
      <Toaster position="top-center" />

      <AuthLeftSide />

      <div className="flex flex-col w-full lg:w-1/2 px-6 lg:px-12 py-6">
        <AuthNavbar loginBtn={"Login"} />

        <div className="flex flex-col justify-center flex-grow w-full max-w-sm mx-auto gap-4">
          <h2 className="mb-6 text-xl lg:text-2xl font-bold text-black">
            Sign up
          </h2>

          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Username"
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                {...register("username", { required: "Username is required" })}
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1 flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                {...register("email", { required: "Email is required" })}
              />
            </div>

            <div className="relative flex flex-col gap-1">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none shadow-sm"
                {...register("password", {
                  required: "",
                  pattern: {
                    value: passwordRegex,
                    message:
                      "Password must include uppercase, lowercase, number & special character",
                  },
                })}
              />
              <span
                className="absolute text-sm text-gray-600 cursor-pointer right-3 top-3.5"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <Eye /> : <EyeDisabled />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="relative flex flex-col gap-1">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                {...register("rePassword", {
                  required: "",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <span
                className="absolute text-sm text-gray-600 cursor-pointer right-3 top-3.5"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <Eye /> : <EyeDisabled />}
              </span>
              {errors.rePassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rePassword.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#4461F2] text-black shadow-sm"
                {...register("phone", { required: "Phone number is required" })}
              />
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-sm text-[#6C737F]">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="text-[#4461F2] text-sm font-medium hover:underline"
              >
                Login
              </Link>
            </div>

            <button className="w-full bg-[#4461F2] text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition active:scale-95">
              {state.loading ? (
                <LoaderIcon className="m-auto" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="relative my-6 text-center">
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
