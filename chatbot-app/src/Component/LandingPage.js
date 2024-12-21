import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import logo from "../assets/Logo.webp"; // Update with your logo file path
import "../css/LandingPage.css";

function LandingPage() {
    const navigate = useNavigate(); // Initialize navigation

    const handleChatbotOpen = () => {
        navigate("/chatbot"); // Navigate to the /chatbot route
    };

    return (
        <div className="landing-page">
            <img src={logo} alt="Chatbot Logo" className="landing-logo" />
            <h1>Welcome to the Chatbot Demo</h1>
            <p>Click below to interact with our AI-powered chatbot.</p>
            <button className="open-chatbot-button" onClick={handleChatbotOpen}>
                Open Chatbot
            </button>
        </div>
    );
}

export default LandingPage;
