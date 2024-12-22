import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../assets/Logo.webp"; // Replace with your logo file path
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";


function Navbar({ user, setUser }) {
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser]);

    const handleLogout = () => {
        localStorage.removeItem("user");
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
                        <Link to="/" className="navbar-link">
                            <HomeIcon style={{ fontSize: "30px" }} />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/about" className="navbar-link">
                            <InfoIcon style={{ fontSize: "30px" }} />
                            <span>About</span>
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/contact" className="navbar-link">
                            <ContactMailIcon style={{ fontSize: "30px" }} />
                            <span>Contact</span>
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/pricing" className="navbar-link">
                            <AttachMoneyIcon style={{ fontSize: "30px" }} />
                            <span>Pricing</span>
                        </Link>
                    </li>
                    {!user ? (
                        <>
                            <li className="navbar-item">
                                <Link to="/signup" className="navbar-link">
                                    <PersonAddIcon style={{ fontSize: "30px" }} />
                                    <span>Sign Up</span>
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="navbar-link">
                                    <LoginIcon style={{ fontSize: "30px" }} />
                                    <span>Login</span>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item">
                                <Link to="/profile" className="navbar-link">
                                    <AccountCircleIcon style={{ fontSize: "30px" }} />
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li className="navbar-item">
                                <button className="navbar-link" onClick={handleLogout}>
                                        <ExitToAppIcon style={{ fontSize: "30px" }} />
                                        <span>Logout</span>
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
