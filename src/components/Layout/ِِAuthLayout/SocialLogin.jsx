import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple, FaTwitter } from "react-icons/fa";
export default function SocialLogin() {
  return (
    <div className="flex justify-center gap-6 mb-5">
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
  );
}
