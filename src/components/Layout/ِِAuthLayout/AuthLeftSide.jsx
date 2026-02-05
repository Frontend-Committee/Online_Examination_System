export default function AuthLeftSide() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#eff4ff] flex-col px-8 py-6">
      <div>
        <h1 className="text-4xl font-extrabold text-black mb-2">Welcome to</h1>
        <h1 className="text-3xl font-extrabold text-[#4461F2] mb-4">Elevate</h1>
        <p className="text-black text-lg max-w-md">
          Quidem autem voluptatibus qui quaerat aspernatur architecto natus
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img
          src="/assets/images/bro.png"
          alt="Illustration"
          className="max-h-[60vh] object-contain"
        />
      </div>
    </div>
  );
}
