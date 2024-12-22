import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import logo from "../assets/Logo.webp"; // Update with your logo file path
import "../css/LandingPage.css";

function LandingPage({ user }) { // Receive the `user` prop
    const navigate = useNavigate(); // Initialize navigation

    const handleChatbotOpen = () => {
        if (user) {
            navigate("/chatbot"); // Navigate to the /chatbot route if logged in
        }
    };

    return (
        <div className="landing-page">
            <img src={logo} alt="Chatbot Logo" className="landing-logo" />
            <h1>Welcome to the Chatbot Demo</h1>
            <p>Click below to interact with our AI-powered chatbot.</p>
            <button
                className="open-chatbot-button"
                onClick={handleChatbotOpen}
                disabled={!user} // Disable the button if the user is not logged in
            >
                Open Chatbot
            </button>
        </div>
    );
}

export default LandingPage;
