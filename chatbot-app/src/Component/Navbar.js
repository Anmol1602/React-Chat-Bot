import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import "../css/Navbar.css"; // Import the CSS file for the navbar styles
import logo from "../assets/Logo.webp"; // Update with your logo file path

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Chatbot Logo" />
            </div>
            <div className="navbar-links">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/about" className="navbar-link">About</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/contact" className="navbar-link">Contact</Link>
                </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
