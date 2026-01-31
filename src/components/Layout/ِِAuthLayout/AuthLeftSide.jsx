export default function AuthLeftSide() {
  return (
    <div className="hidden lg:flex lg:w-1/2 h-screen bg-[#eff4ff] flex-col px-16 py-10">
      <div>
        <h1 className="text-5xl font-extrabold text-black mb-2">Welcome to</h1>
        <h1 className="text-4xl font-extrabold text-[#4461F2] mb-6">Elevate</h1>

        <p className="text-black text-xl max-w-md">
          Quidem autem voluptatibus qui quaerat aspernatur architecto natus
        </p>
      </div>

      <div className="flex-1 flex items-end justify-center">
        <img
          src="/public/assets/images/bro.png"
          alt="Illustration"
          className="max-h-[70vh] object-contain"
        />
      </div>
    </div>
  );
}
