import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Component/LandingPage";
import ChatbotComponent from "./Component/ChatbotComponent";
import AboutPage from "./Component/AboutPage";
import ContactPage from "./Component/ContactPage";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import ThemeProvider, { useTheme } from "./Component/ThemeContext"; // Import useTheme
import "./App.css";

function App() {
  const { theme } = useTheme(); // Get the current theme

  // Dynamically apply the theme class to the body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]); // This will run whenever the theme changes

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chatbot" element={<ChatbotComponent />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

export default AppWrapper;
