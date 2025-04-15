// MAIN LANDING PAGE
"use client";

import { useRouter } from "next/navigation";

export default function Home() {

  // Next.js router for navigation
  const router = useRouter();

  // Function to handle navigation to the name_trip page
  const handleStartPlanning = () => {
    router.push("/trip/user_input");
  };



  // return (
  //   // Main Container with Graph Paper Background
  //   <div id="background" className="relative flex flex-col items-center justify-center min-h-screen bg-white p-2 custom-grid-bg">

  //     {/* Title */}
  //     <h1 className="text-6xl md:text-9xl font-mono text-[rgb(49,49,49)] mt-2 md:mt-2 text-center">AiTinerary</h1>

  //     {/* Logo Placeholder */}
  //     <img src="/images/logo.png" alt="Logo" className="w-[150px] md:w-[230px] mt-4 md:mt-4 mb-4 md:mb-4" />

  //     {/* App Subtitle: brief description of app */}
  //     <p className="text-xl md:text-2xl font-mono text-[#313131] text-center px-4 mt-2">Powered by AI to help plan your trips!</p>

  //     {/* Start Planning Button */}
  //     <button 

  //       onClick={handleStartPlanning}

  //       className="btn border-[#3c3c3c] border-1 border-dashed
  //                 mt-4
  //                 text-base font-mono text-[#3c3c3c]
  //                 bg-white
  //                 hover:text-white hover:bg-[#313131] hover:border-[#313131]
  //                 transition duration-500
  //                 shadow-none
  //                 w-[80%] max-w-[300px] md:w-auto
  //                 flex items-center justify-center
  //                 rounded-none">
  //       Start Planning
  //     </button>

  //     {/* Login Button (Top Right Corner) */}
  //     <button className="absolute top-4 right-4
  //                        btn border-[#3c3c3c] border-1 border-dashed
  //                        text-sm md:text-base font-mono text-[#3c3c3c]
  //                        bg-white
  //                        hover:text-white hover:bg-[#313131] hover:border-[#313c3c]
  //                        transition duration-500
  //                        shadow-none
  //                        px-3 py-1 md:px-4 md:py-2
  //                        rounded-none">
  //       Login
  //     </button>

  //   </div>
  // );

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen h-screen bg-white custom-grid-bg p-4">

      {/* Main Container (50% page width, 75% page height) */}
      <div className="w-[50%] h-[75%] flex flex-col bg-gray-50 border border-gray-400 overflow-hidden">

        {/* Content Area */}
        <div className="flex flex-1 justify-center items-center relative">

          {/* Login Button (Top Right of Content Area) */}
          <button className="absolute top-4 right-4
                             btn border-[#3c3c3c] border-1 border-dashed
                             text-sm md:text-base font-mono text-[#3c3c3c]
                             bg-white
                             hover:text-white hover:bg-[#313131] hover:border-[#313c3c]
                             transition duration-500
                             shadow-none
                             px-3 py-1 md:px-4 md:py-2
                             rounded-none">
            Login
          </button>
          
          <div className="flex flex-col items-center justify-center w-full">

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-mono text-[rgb(49,49,49)] mt-6 md:mt-6 text-center">AiTinerary</h1>

          {/* Logo */}
          <img src="/images/logo.png" alt="Logo" className="w-[120px] md:w-[180px] mt-4 md:mt-4 mb-4 md:mb-4" />

          {/* App Subtitle: brief description of app */}
          <p className="text-xl md:text-xl font-mono text-[#313131] text-center px-4">Use AI to help plan your trips!</p>

          {/* Start Planning Button */}
          <button 

            onClick={handleStartPlanning}

            className="btn border-[#3c3c3c] border-1 border-dashed
                      mt-12 md:mt-12
                      text-base font-mono text-[#3c3c3c]
                      bg-white
                      hover:text-white hover:bg-[#313131] hover:border-[#313131]
                      transition duration-500
                      shadow-none
                      w-[80%] max-w-[300px] md:w-auto
                      flex items-center justify-center
                      rounded-none">
            Start Planning
          </button>

          </div>
        </div>
      </div>
    </div>
  );
}
