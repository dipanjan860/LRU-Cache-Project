import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchSection from "./pages/SearchSection";
import TechSection from "./pages/TechSection";
import SearchHistory from "./pages/SearchHistory";
import About from "./pages/About";
import Modal from "./components/Modal";

function App() {
  const [cacheContents, setCacheContents] = useState([]);
  const [isSearchHistoryOpen, setIsSearchHistoryOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

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

  const toggleSearchHistory = () => {
    setIsSearchHistoryOpen(!isSearchHistoryOpen);
  };

  const toggleAbout = () => {
    setIsAboutOpen(!isAboutOpen);
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar toggleSearchHistory={toggleSearchHistory} toggleAbout={toggleAbout} />
        <Routes>
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
          <Route path="/search-history" element={<SearchHistory updateSearchHistory={updateCacheContents} />} />
        </Routes>
        {isSearchHistoryOpen && (
          <div className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 transition-transform transform duration-300 ease-in-out">
            <SearchHistory toggleSearchHistory={toggleSearchHistory} updateSearchHistory={updateCacheContents} />
          </div>
        )}
        <Modal isOpen={isAboutOpen} onClose={toggleAbout}>
          <About />
        </Modal>
      </div>
    </BrowserRouter>
  );
}

export default App;
