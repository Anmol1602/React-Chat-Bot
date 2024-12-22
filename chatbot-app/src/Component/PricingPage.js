import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/PricingPage.css";

function PricingPage({ user, setUser }) {
    const [selectedSubscription, setSelectedSubscription] = useState('free');
    const [otp, setOtp] = useState('');
    const [status, setStatus] = useState('');
    const [otpSent, setOtpSent] = useState(false); // Track OTP sent state
    const [isSubscribedForYear, setIsSubscribedForYear] = useState(false); // Check if user is already subscribed
    const [hovered, setHovered] = useState(null); // Track which subscription plan is being hovered over
    const navigate = useNavigate(); // Initialize navigate

    // Fetch user data (subscription status) on component mount
    useEffect(() => {
        if (user) {
            const fetchUserProfile = async () => {
                try {
                    const response = await fetch(`http://localhost:5001/user-profile?email=${user.email}`);
                    if (response.ok) {
                        const data = await response.json();
                        // Check if user is already subscribed for 1 year
                        setIsSubscribedForYear(data.subscription === 'year');
                    } else {
                        setStatus('Error fetching user profile');
                    }
                } catch (error) {
                    setStatus('Error fetching user profile');
                }
            };

            fetchUserProfile();
        }
    }, [user]); // Runs only when the user object changes

    const handleSubscriptionSelect = (subscription) => {
        setSelectedSubscription(subscription);
        setOtpSent(false); // Reset OTP sent state when switching plans
        setStatus(''); // Clear any existing status messages
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSendOtp = async () => {
        // Check if the user already has a 1-Year subscription
        if (isSubscribedForYear) {
            setStatus("You already have a 1-Year subscription.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    subscription: selectedSubscription
                }),
            });

            if (response.ok) {
                setOtpSent(true);
                setStatus('OTP sent successfully. Check your email.');
            } else {
                const errorMessage = await response.text();
                setStatus(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setStatus('Error while sending OTP');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate OTP
        if (!otp) {
            setStatus("Please enter the OTP");
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/validate-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email, // User email
                    otp,
                    subscription: selectedSubscription
                }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser); // Update user with new subscription data
                setStatus('Subscription updated successfully!');

                // Redirect to UserProfile page
                navigate('/profile');
            } else {
                const errorMessage = await response.text();
                setStatus(`Error: ${errorMessage}`);
            }
        } catch (error) {
            setStatus('Error while updating subscription');
        }
    };

    return (
        <div className="pricing-page">
            <h1>Choose Your Subscription</h1>
            <div className="pricing-options">
                <div
                    className={`pricing-option ${selectedSubscription === 'free' ? 'selected' : ''}`}
                    onClick={() => handleSubscriptionSelect('free')}
                    onMouseEnter={() => setHovered('free')}
                    onMouseLeave={() => setHovered(null)}
                >
                    <h2>Free</h2>
                    <p>1-Day Chatbot Access</p>
                    {hovered === 'free' && !user && (
                        <div className="hover-message">Please log in or sign up to choose a plan</div>
                    )}
                </div>
                <div
                    className={`pricing-option ${selectedSubscription === 'year' ? 'selected' : ''}`}
                    onClick={() => handleSubscriptionSelect('year')}
                    onMouseEnter={() => setHovered('year')}
                    onMouseLeave={() => setHovered(null)}
                >
                    <h2>1-Year</h2>
                    <p>Full Access for 1 Year</p>
                    {hovered === 'year' && !user && (
                        <div className="hover-message">Please log in or sign up to choose a plan</div>
                    )}
                </div>
            </div>

            {/* Show Send OTP button only for the 1-Year plan and if the user is logged in */}
            {selectedSubscription === 'year' && !isSubscribedForYear && user && (
                <button
                    onClick={handleSendOtp}
                    disabled={otpSent} // Disable if OTP already sent
                >
                    {otpSent ? "OTP Sent" : "Send OTP"}
                </button>
            )}

            {/* Show OTP input form only if OTP is sent */}
            {otpSent && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="otp">Enter OTP:</label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="Enter OTP"
                        required
                    />
                    <button type="submit">Confirm Subscription</button>
                </form>
            )}

            {/* Display status messages */}
            {status && <p>{status}</p>}
        </div>
    );
}

export default PricingPage;
