import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UserProfile.css";

function UserProfile({ user, setUser }) {
    const [profile, setProfile] = useState(null);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5001/user-profile?email=${user.email}`)
                .then((response) => response.json())
                .then((data) => setProfile(data))
                .catch((error) => console.error("Error fetching profile:", error));
        }
    }, [user]);

    const handleChange = (e) => {
        setUpdatedProfile({
            ...updatedProfile,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        fetch("http://localhost:5001/user-profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, ...updatedProfile }),
        })
            .then((response) => response.json())
            .then((data) => {
                setProfile(data);
                alert("Profile updated successfully!");
            })
            .catch((error) => console.error("Error updating profile:", error));
    };

    const handleLogout = () => {
        setUser(null);
        navigate("/");
        alert("Logged out successfully!");
    };
    
   // redirect to landing page
    if (!user) {
        navigate("/");
    }

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            {profile ? (
                <div className="profile-form">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={updatedProfile.name || profile.name}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            disabled
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={updatedProfile.phone || profile.phone || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={updatedProfile.address || profile.address || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <button onClick={handleSave}>Save Changes</button>
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}

export default UserProfile;
