// DYNAMIC ITINERARY PAGE
"use client";

import { useRouter } from "next/navigation";

export default function NameTrip() {
  const router = useRouter();

  // Navigation functions
  const goToPrevious = () => {
    router.push("/trip/user_input");
  };

  // Redirects to View Itinerary Page
  const goToNext = () => {
    router.push("/trip/user_input");
  };



  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white p-2 custom-grid-bg">

      <h1 className="text-4xl md:text-6xl font-mono text-[rgb(49,49,49)] mt-2 md:mt-2 text-center">*Trip Name Query Here*</h1>


      {/* Page Content */}
      <div className="w-full max-w-md my-8">
        {/* Dynamic Itinerary Layout */}
        <input 
          type="text" 
          placeholder="Dynamic itinerary layout will go here" 
          className="w-full p-3
                     border border-dashed border-[#3c3c3c] bg-gray-100
                     font-mono text-[#313131]
                     focus:outline-none"
        />
      </div>


      {/* Navigation buttons */}
      <div className="flex justify-between w-full max-w-md mt-8">
        <button 
          onClick={goToPrevious}
          className="btn border-[#3c3c3c] border-1 border-dashed
                    text-base font-mono text-[#3c3c3c]
                    bg-white
                    hover:text-white hover:bg-[#313131] hover:border-[#313131]
                    transition duration-500
                    shadow-none
                    px-6 py-2">
          Prev
        </button>
        
        <button 
          // onClick={goToNext}
          className="btn border-[#3c3c3c] border-1 border-dashed
                    text-base font-mono text-[#3c3c3c]
                    bg-white
                    hover:text-white hover:bg-[#313131] hover:border-[#313131]
                    transition duration-500
                    shadow-none
                    px-6 py-2">
          Reset
        </button>

        <button 
          // onClick={goToNext}
          className="btn border-[#3c3c3c] border-1 border-dashed
                    text-base font-mono text-[#3c3c3c]
                    bg-white
                    hover:text-white hover:bg-[#313131] hover:border-[#313131]
                    transition duration-500
                    shadow-none
                    px-6 py-2">
          View
        </button>

        <button 
          // onClick={goToNext}
          className="btn border-[#3c3c3c] border-1 border-dashed
                    text-base font-mono text-[#3c3c3c]
                    bg-white
                    hover:text-white hover:bg-[#313131] hover:border-[#313131]
                    transition duration-500
                    shadow-none
                    px-6 py-2">
          Share
        </button>


      </div>
    </div>
  );
}
