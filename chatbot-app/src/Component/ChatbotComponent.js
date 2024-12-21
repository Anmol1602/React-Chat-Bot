import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useTheme } from "../Component/ThemeContext";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css"; // Import the chatbot styles
import config from "../Config/ChatbotConfig";
import MessageParser from "../Parser/MessageParser";
import ActionProvider from "../Actions/ActionProvider";

function ChatbotComponent() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate(); // Initialize navigation

  // Dynamically apply the theme class to the body or chatbot container
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Function to handle closing the chatbot and navigating back to the landing page
  const handleCloseChat = () => {
    navigate("/"); // Navigate to the landing page
  };

  return (
    <div className={`chatbot-container ${theme}`}>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
      <div className="chatbot-footer">
        <button onClick={toggleTheme} className="button">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <button onClick={handleCloseChat} className="button close-chat-button">
          Close Chat
        </button>
      </div>
    </div>
  );
}

export default ChatbotComponent;
