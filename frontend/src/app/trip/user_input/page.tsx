// USER INPUT PAGE
// User will input trip name, city, start date, end date, and what they want to do

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NameTrip() {
  const router = useRouter();
  
  // State for input values
  const [tripName, setTripName] = useState("");
  const [city, setCity] = useState("");
  const [activities, setActivities] = useState("");

  // Navigation functions
  const goToPrevious = () => {
    router.push("/");
  };

  const goToNext = () => {
    router.push("/trip/itinerary");
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
            <button className="flex items-center justify-center h-[25px] w-[25px] rounded-full 
                              text-[rgb(49,49,49)] 
                              hover:text-white hover:bg-[#313131]
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
          <div className="w-1/2 flex flex-col">

            {/* Container 1 - Trip Name (Top Left) */}
            <div className="flex-1 p-4 border-r border-b border-gray-400 flex flex-col justify-center">
              <h1 className="text-lg md:text-lg font-mono text-[rgb(49,49,49)] text-left">Name your trip</h1>
              <div className="mt-3">
                <input 
                  type="text" 
                  placeholder="Type here" 
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  className={`w-full p-2
                             border ${tripName ? 'border-solid' : 'border-dashed'} border-[#3c3c3c] bg-transparent
                             font-mono text-[#313131]
                             hover:bg-gray-200
                             focus:bg-gray-200
                             focus:outline-none focus:border-[#313131] focus:border-dashed
                             transition-colors duration-300`}
                  />
                </div>
              </div>

              {/* Container 2 - City Search (Bottom Left) */}
              <div className="flex-1 p-4 border-r border-b border-gray-400 flex flex-col justify-center">
                <h1 className="text-lg md:text-lg font-mono text-[rgb(49,49,49)] text-left">Select a city</h1>
                <div className="mt-3">
                  <input 
                    type="text" 
                    placeholder="Type here"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full p-2
                               border ${city ? 'border-solid' : 'border-dashed'} border-[#3c3c3c] bg-transparent
                               font-mono text-[#313131]
                             hover:bg-gray-200
                             focus:bg-gray-200
                               focus:outline-none focus:border-[#313131] focus:border-dashed
                               transition-colors duration-300`}
                  />
                  </div>
                </div>
              </div>

              {/* Container 3 - Calendar (Right Side) */}
              <div className="w-1/2 p-4 border-b border-gray-400 flex flex-col justify-center">
                <h1 className="text-lg md:text-lg font-mono text-[rgb(49,49,49)] text-left">Select dates</h1>
                <div className="mt-3 h-[68.5%] border border-dashed border-[#3c3c3c] 
                              hover:bg-gray-200
                              focus:bg-gray-200
                                transition-colors duration-300
                                flex items-center justify-center">
                  {/* content goes here */}
                </div>
              </div>
            </div>

            {/* Container 4 - Activity Prompt */}
            <div className="w-full p-4 border-b border-gray-400 flex-grow-[0.5] flex flex-col justify-center">
              <h1 className="text-lg md:text-lg font-mono text-[rgb(49,49,49)] text-left">Describe what you want to do on your trip</h1>
              <div className="mt-3 h-[calc(100%-4.0rem)]">
                <textarea 
                  placeholder="Type here" 
                  value={activities}
                  onChange={(e) => setActivities(e.target.value)}
                  className={`w-full h-full p-3
                             border ${activities ? 'border-solid' : 'border-dashed'} border-[#3c3c3c] bg-transparent
                             font-mono text-[#313131]
                           hover:bg-gray-200
                           focus:bg-gray-200
                             focus:outline-none focus:border-[#313131] focus:border-dashed
                             transition-colors duration-300 resize-none`}
                />
              </div>
            </div>


        {/* Footer Panel */}
        <div className="w-full">

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center w-full py-2 px-4">
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

            {/* Progress Indicators */}
            <div className="flex space-x-8">
              <div aria-label="status" className="status status-inactive"></div>
              
              <div className="inline-grid *:[grid-area:1/1]">
                <div className="status status-active animate-ping-slow"></div>
                <div className="status status-active"></div>
              </div>
              
              <div aria-label="status" className="status status-inactive"></div>
            </div>

            <button 
              onClick={goToNext}
              className="btn border-[#3c3c3c] border-1 border-dashed
                        text-base font-mono text-[#3c3c3c]
                        bg-white
                        hover:text-white hover:bg-[#313131] hover:border-[#313c3c]
                        transition duration-500
                        shadow-none
                        px-6 py-2 rounded-none">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
