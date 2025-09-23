import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import InputPage from "./pages/InputPage"; // ✅ make sure this path is correct
import Navbar from "./components/Navbar";        // ✅ adjust path if needed

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        

        {/* Page Routes */}
        <Navbar className="relative"/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<InputPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
