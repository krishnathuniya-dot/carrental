import React, { useState } from "react";
import "../css/register.css";

export default function REgister() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      {/* Open Popup Button */}
      <button className="open-btn" onClick={() => setShowPopup(true)}>
        Open Sign Up Popup
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            {/* Header */}
            <div className="popup-header">
              <h2>Sign Up</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>
                ×
              </button>
            </div>

            <hr />

            {/* Form */}
            <form className="signup-form">
              <input type="text" placeholder="Full Name" />
              <input type="text" placeholder="Phone Number" />
              <input type="email" placeholder="Email Address" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />

              <label className="checkbox-row">
                <input type="checkbox" />
                <span>
                  I Agree with <a href="/">Terms and Conditions</a>
                </span>
              </label>

              <button type="submit" className="signup-btn">
                Sign Up
              </button>

              <p className="login-text">
                Already got an account? <a href="/">Login Here</a>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}