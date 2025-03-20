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

// Create Zustand store with persistence
interface TripState {
  tripId: string;
  tripName: string;
  activityPrompt: string;
  city: string;

  setTripId: (id: string) => void;
  setTripName: (name: string) => void;
  setActivityPrompt: (prompt: string) => void;
  setCity: (city: string) => void;
}

const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      tripId: crypto.randomUUID(), // Generate a unique ID for the trip
      tripName: "",
      activityPrompt: "",
      city: "",

      setTripId: (id) => set({ tripId: id }),
      setTripName: (name) => set({ tripName: name }),
      setActivityPrompt: (prompt) => set({ activityPrompt: prompt }),
      setCity: (city) => set({ city: city }),
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


export default function NameTrip() {
  const router = useRouter();

  // Get values and setters from Zustand store
  const { tripId, tripName, setTripName, activityPrompt, setActivityPrompt, city, setCity } = useTripStore();

  // Local state to handle hydration issues
  const [isHydrated, setIsHydrated] = useState(false);

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

      {/* Main Container (90% page width, 100% page height) */}
      <div className="w-[90%] h-screen flex flex-col bg-gray-50 border border-gray-400 overflow-hidden">


        {/* Header Panel */}
        <div className="w-full py-2 px-4 flex items-center justify-center border-b border-gray-400">
          <div className="flex items-center justify-between w-full">
            {/* Empty div for spacing */}
            <div className="w-[25px]">

              {/* DEBUG BUTTON - CHECK TRIP ID OF ZUSTAND STORE */}
              {process.env.NODE_ENV === 'development' && (
                <button 
                  onClick={() => alert(`Current Trip ID: ${tripId}`)}
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
