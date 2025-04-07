"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DraggableBox from "@/app/Components/DraggableBox";

export default function ItineraryPage() {
  const router = useRouter();

  // State for input values
  const [tripName, setTripName] = useState("");

  // Navigation functions
  const goToPrevious = () => {
    router.push("/trip/user_input");
  };

  // Redirects to View Itinerary Page
  const goToNext = () => {
    router.push("/trip/user_input");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen h-screen bg-white custom-grid-bg p-4">
      
      {/* Main Container (90% page width, 100% page height) */}
      <div className="w-9/10 h-screen flex flex-col bg-gray-50 border border-gray-400 overflow-hidden">

        {/* Header Panel */}
        <div className="w-full py-2 px-4 flex items-center justify-center border-b border-gray-400">
          <div className="flex items-center justify-between w-full">
            {/* Empty div for spacing */}
            <div className="w-[25px]"></div>
            
            {/* Centered Logo and Title */}
            <div className="flex items-center absolute left-1/2 transform -translate-x-1/2">
              <img src="/images/logo.png" alt="Logo" className="w-[25px] h-[25px] min-w-[25px] object-contain"/>
              <h1 className="text-3xl md:text-3xl font-mono text-[rgb(49,49,49)]">AiTinerary</h1>
            </div>

            {/* User Profile Icon */}
            <button className="flex items-center justify-center h-[25px] w-[25px] 
                             border border-dashed border-[#3c3c3c]
                             text-[rgb(49,49,49)] 
                             hover:text-white hover:bg-[#313131] hover:border-[#313131]
                             transition-colors duration-500">
              <svg className="h-[15px] w-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-1">

          {/* Container 1 - Left Side (30% page width) */}
          <div className="w-[30%] p-6 border-r border-gray-400 flex flex-col">
            <h1 className="text-lg md:text-lg font-mono text-[rgb(49,49,49)] text-left">Side Panel</h1>
            
            {/* Place Card #1 */}
            <DraggableBox initialPosition={{ x: 120, y: 120 }}>
              <div className="mt-3 w-[200px]">
                <div className="p-4 border border-dashed border-[#3c3c3c] bg-white
                              font-mono text-[#313131]
                              hover:bg-gray-200
                              transition-colors duration-300">
                  Place Card #1
                </div>
              </div>
            </DraggableBox>

            {/* Place Card #2 */}
            <DraggableBox initialPosition={{ x: 120, y: 200 }}>
              <div className="mt-3 w-[200px]">
                <div className="p-4 border border-dashed border-[#3c3c3c] bg-white
                              font-mono text-[#313131]
                              hover:bg-gray-200
                              transition-colors duration-300">
                  Place Card #2
                </div>
              </div>
            </DraggableBox>

            {/* Place Card #3 */}
            <DraggableBox initialPosition={{ x: 120, y: 280 }}>
              <div className="mt-3 w-[200px]">
                <div className="p-4 border border-dashed border-[#3c3c3c] bg-white
                              font-mono text-[#313131]
                              hover:bg-gray-200
                              transition-colors duration-300">
                  Place Card #3
                </div>
              </div>
            </DraggableBox>
          </div>

          {/* Container 2 - Right Side (70% page width) */}
          <div className="w-[70%] p-6 flex flex-col">
            <h1 className="text-lg md:text-lg font-mono text-[rgb(49,49,49)] text-left">Dynamic Itinerary</h1>
            <div className="mt-3 flex-1">
              {/* content goes here */}
              <div className="h-[100%] border border-dashed border-[#3c3c3c] 
                            hover:bg-gray-200
                            focus:bg-gray-200
                              transition-colors duration-300
                              flex items-center justify-center">
                <p className="font-mono text-[#313131]">Day boxes will go here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Panel - Fixed structure */}
        <div className="w-full py-2 px-4 border-t border-gray-400">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center w-full">
            <div className="flex space-x-2">
              <button 
                onClick={goToPrevious}
                className="btn border-[#3c3c3c] border-1 border-dashed
                           text-base font-mono text-[#3c3c3c]
                         bg-white
                         hover:text-white hover:bg-[#313131] hover:border-[#313131]
                           transition duration-500
                           shadow-none
                           px-6 py-2 rounded-none">
                Prev
              </button>

              <button 
                className="btn border-[#3c3c3c] border-1 border-dashed
                           text-base font-mono text-[#3c3c3c]
                         bg-white
                         hover:text-white hover:bg-[#313131] hover:border-[#313131]
                           transition duration-500
                           shadow-none
                           px-6 py-2 rounded-none">
                Reset
              </button>
            </div>

            {/* Progress Indicators */}
            <div className="flex space-x-8">
              <div aria-label="status" className="status status-inactive"></div>
              
              <div aria-label="status" className="status status-inactive"></div>

              <div className="inline-grid *:[grid-area:1/1]">
                <div className="status status-active animate-ping-slow"></div>
                <div className="status status-active"></div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button 
                className="btn border-[#3c3c3c] border-1 border-dashed
                          text-base font-mono text-[#3c3c3c]
                          bg-white
                          hover:text-white hover:bg-[#313131] hover:border-[#313c3c]
                          transition duration-500
                          shadow-none
                          px-6 py-2 rounded-none">
                View
              </button>

              <button 
                className="btn border-[#3c3c3c] border-1 border-dashed
                          text-base font-mono text-[#3c3c3c]
                          bg-white
                          hover:text-white hover:bg-[#313131] hover:border-[#313c3c]
                          transition duration-500
                          shadow-none
                          px-6 py-2 rounded-none">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}