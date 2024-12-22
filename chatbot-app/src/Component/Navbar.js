import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import "../css/Navbar.css"; // Import the CSS file for the navbar styles
import logo from "../assets/Logo.webp"; // Update with your logo file path

function Navbar({ user, setUser }) {
    const handleLogout = () => {
        setUser(null); // Set user state to null to log out
        alert("Logged out successfully!");
    };

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
                    {!user ? (
                        <>
                            <li className="navbar-item">
                                <Link to="/signup" className="navbar-link">Sign Up</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="navbar-link">Login</Link>
                            </li>
                        </>
                    ) : (
                        <li className="navbar-item">
                            <button className="navbar-link" onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
