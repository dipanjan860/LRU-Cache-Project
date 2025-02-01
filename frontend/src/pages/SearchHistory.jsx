import React, { useState, useEffect } from "react";
import { MdHistory } from "react-icons/md";

const SearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/search_history");
        if (!response.ok) {
          throw new Error("Failed to fetch search history");
        }
        const data = await response.json();
        setSearchHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading search history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-1/3">
        {searchHistory.length > 0 ? (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 my-6">
              Search History
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ul className="space-y-4">
                {searchHistory
                  .slice()
                  .reverse()
                  .map((entry, index) => (
                    <li key={index} className="border-b border-gray-200 pb-4">
                      <p className="text-gray-700">
                        <span className="font-semibold">State/UT:</span>{" "}
                        {entry.state_ut}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Response Time:</span>{" "}
                        {entry.response_time.toFixed(2)} ms
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 text-4xl font-semibold my-55">
            <MdHistory className="text-7xl mb-4" />
            No Search History
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHistory;
