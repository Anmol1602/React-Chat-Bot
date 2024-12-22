import React, { useState } from "react";
import "../css/SignUpPage.css"; // Import the CSS for styling
import { useNavigate } from "react-router-dom";

function SignUpPage({ setUser }) { // Receive setUser as prop
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const user = await response.json(); // Get the user data returned by the server
                setUser(user); // Set the logged-in user
                alert('User registered and logged in successfully!');
                setFormData({ name: '', email: '', password: '' }); // Clear form
                navigate('/chatbot'); // Redirect to chatbot
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while signing up. Please try again later.');
        }
    };

    return (
        <div className="signup-page">
            <h1>Sign Up</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpPage;
