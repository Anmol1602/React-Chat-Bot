import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Component/LandingPage";
import ChatbotComponent from "./Component/ChatbotComponent";
import AboutPage from "./Component/AboutPage";
import ContactPage from "./Component/ContactPage";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import SignUpPage from "./Component/SignUpPage"; // Import SignUpPage
import LoginPage from "./Component/LoginPage"; // Import LoginPage
import UserProfile from "./Component/UserProfile"; // Import UserProfile
import ThemeProvider, { useTheme } from "./Component/ThemeContext"; // Import useTheme
import "./App.css";

function App() {
  const { theme } = useTheme(); // Get the current theme
  const [user, setUser] = useState(null); // Manage user state (null means not logged in)

  // Dynamically apply the theme class to the body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]); // This will run whenever the theme changes

  return (
    <Router>
      <div className="App">
        {/* Navbar with user state */}
        <Navbar user={user} setUser={setUser} />

        {/* Main content */}
        <main className="content">
          <Routes>
            <Route path="/" element={<LandingPage user={user} />} />
            <Route path="/chatbot" element={<ChatbotComponent />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} /> 
            <Route path="/login" element={<LoginPage setUser={setUser} />} /> 
            <Route path="/profile" element={<UserProfile user={user} setUser={setUser} />} />

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
