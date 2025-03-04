export default function Home() {
  return (
    // Main Container with Graph Paper Background
    <div id="background" className="relative flex flex-col items-center justify-center min-h-screen bg-white p-2 custom-grid-bg">

      {/* Title */}
      <h1 className="text-9xl font-mono text-[rgb(49,49,49)] mt-10">AiTinerary</h1>

      {/* Logo Placeholder */}
      <h1 className="text-[200px] mt-12 mb-8">✈️</h1>

      {/* App Subtitle: brief description of app */}
      <p className="text-2xl font-mono text-[#313131]">Powered by AI to help plan your trips!</p>

      {/* Start Planning Button */}
      <button className="btn border-[#3c3c3c] border-1 border-dashed
                        mt-4
                        text-base font-mono text-[#3c3c3c]
                        bg-white
                        hover:text-white hover:bg-[#313131] hover:border-[#313131]
                        transition duration-500
                        shadow-none">
        Start Planning
      </button>

      {/* Login Button (Top Right Corner) */}
      <button className="absolute top-4 right-4
                         btn border-[#3c3c3c] border-1 border-dashed
                         text-base font-mono text-[#3c3c3c]
                         bg-white
                         hover:text-white hover:bg-[#313131] hover:border-[#313131]
                         transition duration-500
                         shadow-none">
        Login
      </button>

    </div>
  );
}
