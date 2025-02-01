import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import routing components
import Navbar from "./components/Navbar";
import SearchSection from "./pages/SearchSection";
import TechSection from "./pages/TechSection";
import SearchHistory from "./pages/SearchHistory"; // Import the new SearchHistory page
import About from "./pages/About";

function App() {
  const [cacheContents, setCacheContents] = useState([]);

  useEffect(() => {
    updateCacheContents();
  }, []);

  const updateCacheContents = async () => {
    try {
      const response = await fetch("http://localhost:5000/get_cache_contents");
      const cacheData = await response.json();
      setCacheContents(cacheData);
    } catch (error) {
      console.error("Error fetching cache contents:", error);
    }
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <div className="flex" style={{ height: "calc(100vh - 4.5rem)" }}>
                <div className="w-[40%] overflow-y-auto">
                  <TechSection cacheContents={cacheContents} updateCache={updateCacheContents} />
                </div>
                <div className="w-[60%] overflow-y-auto">
                  <SearchSection updateCache={updateCacheContents} />
                </div>
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/search-history" element={<SearchHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;