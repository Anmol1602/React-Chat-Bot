import React, { useState } from "react";
import "../css/LoginPage.css"; // Import the CSS for styling
import { useNavigate } from "react-router-dom";


function LoginPage({ setUser }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [status, setStatus] = useState('');
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const user = await response.json();
                setUser(user); // Assuming a function `setUser` to store the logged-in user details
                alert('Logged in successfully!');
                setFormData({ email: '', password: '' }); // Clear form
                navigate('/chatbot'); // Redirect to chatbot
            } else {
                const errorMessage = await response.text();
                setStatus(`Error: ${errorMessage}`);
            }
        } catch (error) {
            setStatus('An error occurred while logging in. Please try again later.');
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
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

                <button type="submit">Login</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}

export default LoginPage;
