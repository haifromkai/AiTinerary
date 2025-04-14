// USER INPUT PAGE
// User will input trip name, city, start date, end date, and what they want to do

"use client";

// Imports
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import CityAutocomplete from "@/app/Components/CityAutocomplete";

// Create Zustand store with persistence
interface TripState {
  tripId: string;
  tripName: string;
  activityPrompt: string;
  city: string;
  startDate: Date | undefined;
  endDate: Date | undefined;

  setTripId: (id: string) => void;
  setTripName: (name: string) => void;
  setActivityPrompt: (prompt: string) => void;
  setCity: (city: string) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
}

const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      tripId: crypto.randomUUID(), // Generate a unique ID for the trip
      tripName: "",
      activityPrompt: "",
      city: "",
      startDate: undefined,
      endDate: undefined,

      setTripId: (id) => set({ tripId: id }),
      setTripName: (name) => set({ tripName: name }),
      setActivityPrompt: (prompt) => set({ activityPrompt: prompt }),
      setCity: (city) => set({ city: city }),
      setStartDate: (date) => set({ startDate: date }),
      setEndDate: (date) => set({ endDate: date }),
    }),
    {
      name: "trip-storage", // unique name for localStorage
    }
  )
);



export default function UserInputPage() {
  const router = useRouter();

  // Get values and setters from Zustand store
  const { tripId, tripName, setTripName, activityPrompt, setActivityPrompt, city, setCity, startDate, setStartDate, endDate, setEndDate } = useTripStore();

  // Local state to handle hydration issues
  const [isHydrated, setIsHydrated] = useState(false);

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    startDate && endDate ? { from: startDate, to: endDate } : undefined
  );

  // Disable dates that would create a range longer than 7 days
  const disabledDays = (day: Date) => {
    if (!selectedRange?.from) return false;
    
    // Ensure selectedRange.from is a valid Date object
    const fromDate = selectedRange.from instanceof Date ? selectedRange.from : new Date(selectedRange.from);
    
    // Check if fromDate is valid before proceeding
    if (isNaN(fromDate.getTime())) return false;
    
    const diffTime = Math.abs(day.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 6;
  };

  // Handle range selection with 7-day limit
  const handleRangeSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      // Ensure both dates are valid Date objects
      const fromDate = range.from instanceof Date ? range.from : new Date(range.from);
      const toDate = range.to instanceof Date ? range.to : new Date(range.to);
      
      // Check if dates are valid
      if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
        // Calculate the difference in days
        const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // If more than 7 days, adjust the end date
        if (diffDays > 7) {
          const newEndDate = new Date(fromDate);
          newEndDate.setDate(fromDate.getDate() + 6); // 7 days total (including start date)
          range.to = newEndDate;
        }
      }
    }
    
    setSelectedRange(range);
    setStartDate(range?.from);
    setEndDate(range?.to);
  };

  // Handle hydration (ensures we don't get hydration errors with SSR)
  useEffect(() => {
    setIsHydrated(true);
    if (startDate && endDate) {
      setSelectedRange({ from: startDate, to: endDate });
    }
  }, [startDate, endDate]);

  // Handle hydration (ensures we don't get hydration errors with SSR)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Navigation functions
  const goToPrevious = () => {
    router.push("/");
  };

  const goToNext = () => {
    // get the city input element
    const cityInput = document.querySelector('input[placeholder="Type here"]') as HTMLInputElement;
    const cityValue = cityInput?.value || "";
    
    // check if city matches what's in the store (indicating it was selected from dropdown)
    if (cityValue && cityValue !== city) {
      alert("Please select a valid city from the dropdown");
      return;
    }
    
    // proceed with navigation if validation passes
    router.push("/trip/itinerary");
  };



  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen h-screen bg-white custom-grid-bg p-4">

      {/* Main Container (75% page width, 100% page height) */}
      <div className="w-[75%] h-screen flex flex-col bg-gray-50 border border-gray-400 overflow-hidden">


        {/* Header Panel */}
        <div className="w-full py-2 px-4 flex items-center justify-center border-b border-gray-400">
          <div className="flex items-center justify-between w-full">
            {/* Empty div for spacing */}
            <div className="w-[25px]">

              {/* DEBUG BUTTON - Show current Trip Object's variables*/}
              {process.env.NODE_ENV === 'development' && (
                <button 
                  onClick={() => alert(`Current TripState:
                  - tripId: ${tripId}
                  - tripName: ${tripName}
                  - city: ${city}
                  - activityPrompt: ${activityPrompt}
                  - startDate: ${startDate ? startDate.toLocaleDateString() : 'undefined'}
                  - endDate: ${endDate ? endDate.toLocaleDateString() : 'undefined'}`)}
                  className="text-xs text-gray-400 hover:text-gray-600">
                  ID
                </button>
              )}
            </div>

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
          <div className="w-1/2 flex flex-col">

            {/* Container 1 - Trip Name (Top Left) */}
            <div className="flex-1 p-4 border-r border-b border-gray-400 flex flex-col justify-center">
              <h1 className="text-lg md:text-lg font-mono text-[rgb(49,49,49)] text-left">Name your trip</h1>
              <div className="mt-3">
                <input 
                  type="text" 
                  placeholder="Type here" 
                  value={isHydrated ? tripName : ""} 
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
                {isHydrated && (
                  <CityAutocomplete
                    value={isHydrated ? city : ""}
                    setSelectedPlace={setCity}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Container 3 - Calendar (Right Side) */}
          <div className="w-1/2 p-4 border-b border-gray-400 flex flex-col">
            <h1 className="text-lg md:text-lg font-mono text-[rgb(49,49,49)] text-center">
              Select dates
            </h1>
            <div className="mt-3 flex-grow flex justify-center items-center overflow-auto">
              {isHydrated && (
                <>
                  <style jsx global>{`
                    .rdp-weeks > .rdp-week:last-child {
                      border-bottom: none !important;
                    }
                  `}</style>
                <DayPicker
                  mode="range"
                  selected={selectedRange}
                  onSelect={handleRangeSelect}
                  numberOfMonths={1}
                  classNames={{
                    chevron: 'color: #313131 w-4 h-4'
                  }}
                  styles={{
                    month_caption: { color: '#313131', fontSize: '0.9rem', paddingLeft: '1rem' },
                    day: { margin: '0.2rem', color: '#313131', fontFamily: 'monospace' },
                    weekday: { color: '#313131', fontFamily: 'monospace' },
                    button_next: { color: '#313131' },
                    button_previous: { color: '#313131' },
                    caption_label: { color: '#313131', fontFamily: 'monospace' },
                    month_grid: { color: '#313131' },
                    week: { borderBottom: '1px solid #e5e5e5' }
                  }}
                  disabled={disabledDays}
                  footer={<p className="text-xs text-gray-500 text-center w-full">Maximum trip duration: 7 days</p>}
                  className="border border-dashed border-[#3c3c3c] p-2 bg-white"
                />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Container 4 - Activity Prompt */}
        <div className="w-full p-4 border-b border-gray-400 flex-grow-[0.5] flex flex-col justify-center">
          <h1 className="text-lg md:text-lg font-mono text-[rgb(49,49,49)] text-left">Describe what you want to do on your trip</h1>
          <div className="mt-3 h-[calc(100%-4.0rem)]">
            <textarea 
              placeholder="Type here" 
              value={isHydrated ? activityPrompt : ""}
              onChange={(e) => setActivityPrompt(e.target.value)}
              className={`w-full h-full p-3
                         border ${activityPrompt ? 'border-solid' : 'border-dashed'} border-[#3c3c3c] bg-transparent
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
