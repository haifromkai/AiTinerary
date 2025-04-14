"use client";

import { useState, useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

// Google Places Autocomplete Component
const CityAutocomplete = ({
  value,
  setSelectedPlace
}: {
  value: string,
  setSelectedPlace: (value: string) => void
}) => {
  // Add state to track if selection is from dropdown
  const [isValidSelection, setIsValidSelection] = useState(!!value);

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

    // mark city as invalid when user types manually
    setIsValidSelection(false);

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
    setIsValidSelection(true); // mark as valid when selected from dropdown

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
                     border ${inputValue ? (isValidSelection ? 'border-solid border-[#3c3c3c]' : 'border-solid border-red-500') : 'border-dashed border-[#3c3c3c]'} bg-transparent
                     font-mono text-[#313131]
                     hover:bg-gray-200
                     focus:bg-gray-200
                     focus:outline-none focus:border-[#313131] focus:border-dashed
                     transition-colors duration-300`}
        />
        {!isValidSelection && inputValue && (
          <p className="text-red-500 text-xs mt-1">Please select a city from the dropdown</p>
        )}
        {status === "OK" && (
          <ul className="absolute z-10 w-full bg-white border border-gray-400 mt-1 
                         max-h-60 overflow-auto">
            {renderSuggestions()}
          </ul>
        )}
      </div>
    );
  };

export default CityAutocomplete;