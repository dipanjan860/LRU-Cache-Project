import React, { useState } from "react";
import CacheCard from "../components/CacheCard";
import { FaExclamation } from "react-icons/fa";

const reset_page = 'http://localhost:5000/reset';
const cache_contents = 'http://localhost:5000/get_cache_contents';

function TechSection({ cacheContents, updateCache }) {
  const [cacheCapacity, setCacheCapacity] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  const handleInputChange = (event) => {
    setCacheCapacity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const capacity = parseInt(cacheCapacity, 10);

    if (!isNaN(capacity) && capacity > 0) {
      try {
        const response = await fetch("http://localhost:5000/set_capacity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ capacity }),
        });
        const result = await response.json();
        setResultMessage(result.message);
        updateCache();
      } catch (error) {
        console.error("Error setting cache capacity:", error);
        setResultMessage("Failed to set capacity");
      }
    } else {
      alert("Please enter a valid positive integer for cache capacity.");
    }
  };

  const resetCache = async () => {
    try {
      const response = await fetch(reset_page, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setResultMessage(result.message);
      updateCache();
    } catch (error) {
      console.error("Error resetting cache:", error);
      setResultMessage("Failed to reset cache");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-300 via-gray-200 to-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-500 p-4 flex items-center space-x-4 sticky top-0"
      >
        <button
          type="button"
          onClick={resetCache}
          className="w-1/6 bg-red-500 text-white py-3 text-xl font-semibold rounded-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Reset
        </button>
        <input
          type="number"
          value={cacheCapacity}
          onChange={handleInputChange}
          placeholder="Set Cache Capacity"
          className="w-4/6 p-3 text-lg bg-white rounded-lg focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-1/6 bg-gray-800 text-white py-3 text-xl font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Set
        </button>
      </form>
      {resultMessage && (
        <p className="text-center text-lg text-green-600 mt-2">{resultMessage}</p>
      )}
      <div className="flex flex-col p-4">
        {cacheContents.length > 0 ? (
          cacheContents.slice().reverse().map((item, index) => (
            <CacheCard key={index} name={item.state_ut} keyValue={item.key} showArrow={index !== 0} />
          ))          
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 text-4xl font-semibold my-55">
            <FaExclamation className="text-7xl mb-4" />No Cache Memory
          </div>
        )}
      </div>
    </div>
  );
}

export default TechSection;
