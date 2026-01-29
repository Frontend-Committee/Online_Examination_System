import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple, FaTwitter } from "react-icons/fa";
import { useRef, useState } from "react";
import { login } from "../../services/authService";

const Login = () => {
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailRef.current.value || !passRef.current.value) return;
    try {
      const res = await login({
        email: emailRef.current.value.trim(),
        password: passRef.current.value.trim(),
      });
      console.log(res);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans">
      <div className="hidden lg:flex w-1/2 bg-[#eff4ff] flex-col justify-between items-start px-16 py-5 relative">
        <div className="mt-14">
          <h1 className="text-4xl font-extrabold text-black mb-2">
            Welcome to
          </h1>
          <h1 className="text-5xl font-extrabold text-[#4461F2] mb-6">
            Elevate
          </h1>

          <p className="text-black text-lg mb-12 max-w-md leading-relaxed">
            Quidem autem voluptatibus qui quaerat aspernatur architecto natus
          </p>
        </div>

        <div className="w-full flex justify-center">
          <img src="/public/assets/images/bro.png" className="object-fill" />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:px-20 relative">
        <div className="flex justify-end items-center gap-6 mb-16 mt-4">
          <button className="text-black font-medium">English</button>
          <button className="text-[#4461F2] font-bold">Sign in</button>
          <button className="bg-white text-[#4461F2] px-6 py-2 rounded-xl shadow-sm border border-gray-100 font-medium hover:bg-gray-50 transition">
            Register
          </button>
        </div>

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
              <a
                href="#"
                className="text-[#4461F2] text-sm font-medium hover:underline"
              >
                Recover Password ?
              </a>
            </div>

            <button className="w-full bg-[#4461F2] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition active:scale-95">
              Sign in
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

          <div className="flex justify-center gap-6">
            <button className="w-14 h-14  flex items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-md transition hover:-translate-y-1">
              <FcGoogle size={28} />
            </button>

            <button className="w-14 h-14 flex items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-md transition hover:-translate-y-1">
              <FaTwitter size={24} className="text-[#1DA1F2]" />
            </button>

            <button className="w-14 h-14 flex items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-md transition hover:-translate-y-1">
              <FaFacebookF size={24} className="text-[#1877F2]" />
            </button>

            <button className="w-14 h-14 flex items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-md transition hover:-translate-y-1">
              <FaApple size={28} className="text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
