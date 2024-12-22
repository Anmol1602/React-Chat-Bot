import React from "react";
import "../css/TeamPage.css"; // You can create and style this page similarly to other pages

function TeamPage() {
    return (
        <div className="team-page">
            <h1>Meet Our Team</h1>
            <div className="team-members">
                <div className="team-member">
                    <h2>John Doe</h2>
                    <p>Frontend Developer</p>
                </div>
                <div className="team-member">
                    <h2>Jane Smith</h2>
                    <p>Backend Developer</p>
                </div>
                <div className="team-member">
                    <h2>Mike Johnson</h2>
                    <p>UI/UX Designer</p>
                </div>
                {/* Add more team members as necessary */}
            </div>
        </div>
    );
}

export default TeamPage;
