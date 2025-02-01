import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import indian_flag from "../assets/Indian_Flag.png";
import indian_map from "../assets/Indian_Map.png";
import StateCard from "../components/StateCard";

const search_value = "http://localhost:5000/search";
const state_details = "http://localhost:5000/state_details";

function SearchSection({ updateCache }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [stateData, setStateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultMessage, setResultMessage] = useState("");

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "New Delhi",
    "Puducherry",
    "Ladakh",
    "Jammu and Kashmir",
  ];

  const searchValue = async (value) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(search_value, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      console.log("API Response:", result); // Log the API response
      setResultMessage(
        `${result.message} (Response time: ${result.response_time.toFixed(
          2
        )} ms)`
      );
      updateCache(); // Update cache after search
      if (result.value) {
        fetchStateDetails(result.value.state_ut); // Pass the correct property
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStateDetails = async (state) => {
    try {
      const response = await fetch(
        `${state_details}/${encodeURIComponent(state)}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const stateDetails = await response.json();
      setStateData(stateDetails.value);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSuggestions(
      value
        ? states.filter((state) =>
            state.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleSuggestionClick = (state) => {
    setSearchTerm(state);
    setSuggestions([]);
    searchValue(state);
  };

  return (
    <div>
      <div className="bg-blue-700 p-4 flex items-center justify-center sticky top-0">
        <div className="flex items-center justify-between mx-8 w-full">
          <div className="flex items-center">
            <img
              src={indian_flag}
              alt="Indian Flag"
              className="w-8 h-6 rounded-sm"
            />
            <div className="text-white text-3xl font-bold mx-2">MapMyIndia</div>
          </div>
          <div className="relative w-2/3">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search Your State/UT"
              className="w-full p-3 pl-12 text-lg bg-white rounded-lg focus:outline-none"
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Search for Indian states and union territories"
            />
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto">
                {suggestions.map((state, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(state)}
                  >
                    {state}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {!stateData && (
        <div className="flex justify-center items-center my-55">
          <img
            src={indian_map}
            alt="Indian Map"
            className="w-48 h-48 rounded-sm"
          />
        </div>
      )}
      {error && <div className="text-center mt-4 text-red-500">{error}</div>}
      {loading && <div className="text-center mt-4">Loading...</div>}
      {stateData && (
        <StateCard
          stateName={stateData.state_ut}
          capital={stateData.capital}
          description={stateData.description}
          imageUrl={stateData.image_url}
          population={stateData.population}
          famousFood={stateData.famous_food}
          famousDance={stateData.famous_dance}
          famousPlaces={stateData.famous_places_to_visit}
          languagesSpoken={stateData.language_spoken}
        />
      )}
    </div>
  );
}

export default SearchSection;
