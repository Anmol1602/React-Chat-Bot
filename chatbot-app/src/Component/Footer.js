import React from "react";
import "../css/Footer.css"; // Import the CSS for styling
import logo from "../assets/Logo.webp"; // Update with your logo file path
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <img src={logo} alt="Chatbot Logo" className="footer-logo" />
                <p>&copy; {new Date().getFullYear()} Chatbot Application. All Rights Reserved.</p>
                <p>
                    Built with ❤️ by <a href="/team" target="_blank" rel="noopener noreferrer">Our Team</a>.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
