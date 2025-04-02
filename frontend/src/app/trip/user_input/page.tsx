// USER INPUT PAGE
// User will input trip name, city, start date, end date, and what they want to do

"use client";

// Imports
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

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


// Google Places Autocomplete Component
const PlacesAutocomplete = ({
  value,
  setSelectedPlace
}: {
  value: string,
  setSelectedPlace: (value: string) => void

}) => {
  // Import required hooks
  const {
    ready, // indicate if API is ready to use
    value: inputValue, // current input val
    suggestions: { status, data }, // suggestions returned by API
    setValue, // updates input val
    clearSuggestions, // clears dropdown suggestions
  } = usePlacesAutocomplete({
    debounce: 300, // delay API call to optimize performance
    // restrict results to cities
    requestOptions: {
      types: ["(cities)"],
    },
    defaultValue: value, // initialize with the value from props
  });

  // Set the initial value when the component mounts or value changes
  useEffect(() => {
    if (value) {
      setValue(value, false);
    }
  }, [value, setValue]);

  // Hook to detect clicks outside the autocomplete dropdown
  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  // Handle input changes and updates autocomplete vals
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    // if input is cleared, also clear the value in Zustand store
    if (e.target.value === "") {
      setSelectedPlace("");
    }
  };

  // Handle selection of a city from the dropdown
  const handleSelect = ({ description }: { description: string }) => () => {
    setValue(description, false);
    clearSuggestions();
    setSelectedPlace(description);

    // Get coordinates of the city (for future use)
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      console.log("Coordinates: ", { lat, lng });
    });
  };

  // Renders the dropdown list of autocomplete suggestions
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id, // unique id for the city
        structured_formatting: { main_text, secondary_text }, // main and secondary parts of the city
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="p-2 cursor-pointer hover:bg-gray-200
                     border-b border-gray-400 last:border-b-0
                     transition-colors duration-300"
        >
        <span className="font-mono text-[#313131] text-sm">{main_text}</span> <small className="text-gray-500">{secondary_text}</small>
        </li>
      );
    });

    // Autocomplete input and dropdown container
    return (
      <div ref={ref} className="w-full relative">
        <input
          type="text"
          value={inputValue} // binds input val to PlacesAutocomplete state
          onChange={handleInput} // handles input changes
          disabled={!ready} // diasables input if API not ready
          placeholder="Type here"
          className={`w-full p-2
                     border ${inputValue ? 'border-solid' : 'border-dashed'} border-[#3c3c3c] bg-transparent
                     font-mono text-[#313131]
                     hover:bg-gray-200
                     focus:bg-gray-200
                     focus:outline-none focus:border-[#313131] focus:border-dashed
                     transition-colors duration-300`}
        />
        {status === "OK" && (
          <ul className="absolute z-10 w-full bg-white border border-gray-400 mt-1 
                         max-h-60 overflow-auto">
            {renderSuggestions()}
          </ul>
        )}
      </div>
    );
  };


export default function UserInputPage() {
  const router = useRouter();

  // Get values and setters from Zustand store
  const { tripId, tripName, setTripName, activityPrompt, setActivityPrompt, city, setCity, startDate, setStartDate, endDate, setEndDate } = useTripStore();

  // Local state to handle hydration issues
  const [isHydrated, setIsHydrated] = useState(false);

  // State for calendar popover
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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
    
    return diffDays > 7;
  };

  // Format date range for display
  const formatDateRange = () => {
    if (!selectedRange?.from) return "Select dates (7 days max)";
    
    // Ensure dates are valid before formatting
    const fromDate = selectedRange.from instanceof Date ? selectedRange.from : new Date(selectedRange.from);
    
    if (isNaN(fromDate.getTime())) return "Select dates (7 days max)";
    
    const formattedFromDate = fromDate.toLocaleDateString();
    
    if (!selectedRange?.to) return formattedFromDate;
    
    const toDate = selectedRange.to instanceof Date ? selectedRange.to : new Date(selectedRange.to);
    
    if (isNaN(toDate.getTime())) return formattedFromDate;
    
    const formattedToDate = toDate.toLocaleDateString();
    return `${formattedFromDate} - ${formattedToDate}`;
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

              {/* DEBUG BUTTON - Show current TripState's Trip Id */}
              {process.env.NODE_ENV === 'development' && (
                <button 
                  onClick={() => alert(`Current TripState object's tripId: ${tripId}`)}
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
                  <PlacesAutocomplete
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
              {formatDateRange()}
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
                  styles={{
                    month_caption: { color: '#313131' },
                    day: { margin: '0.2em', color: '#313131' },
                    weekday: { color: '#313131' },
                    button_next: { color: '#313131' },
                    button_previous: { color: '#313131' },
                    caption_label: { color: '#313131' },
                    month_grid: { color: '#313131' },
                    week: { borderBottom: '1px solid #e5e5e5' },
                    month: { border: '1px solid #e5e5e5' }
                  }}
                  disabled={disabledDays}
                  // footer={<p className="text-xs text-gray-500">Maximum trip duration: 7 days</p>}
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
