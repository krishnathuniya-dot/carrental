import React, { useState } from "react";
import {
  FaCarSide,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGooglePlusG,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/topheader.css";

export default function TopHeader() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://carrental-kmhk.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

 if (res.ok) {
  alert("Login successful");

  console.log("Login Response:", data);

  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("userId", data.user._id);
  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.user.email);

  setShowLoginPopup(false);
  setLoginData({
    email: "",
    password: "",
  });
} else {
  alert(data.message);
}
    } catch (error) {
      alert("Server error");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://carrental-kmhk.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful");
        setShowSignupPopup(false);
        setShowLoginPopup(true);
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="mi-top-header">
      <div className="mi-header-container">

        {/* LOGO */}
        <div className="mi-logo-section">
          <FaCarSide className="mi-logo-icon" />
          <div className="mi-logo-text">
            <h2>Car Rental</h2>
            <span>Portal</span>
          </div>
        </div>

        {/* EMAIL */}
        <div className="mi-info-box">
          <div className="mi-circle-icon">
            <FaEnvelope />
          </div>
          <div>
            <h4>Support Mail</h4>
            <p>info@example.com</p>
          </div>
        </div>

        {/* PHONE */}
        <div className="mi-info-box">
          <div className="mi-circle-icon">
            <FaPhoneAlt />
          </div>
          <div>
            <h4>Call Us</h4>
            <p>+91-1234567890</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="mi-right-section">
          <div className="mi-social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaGooglePlusG />
            <FaInstagram />
          </div>

          <button
            className="mi-login-btn"
            onClick={() => setShowLoginPopup(true)}
          >
            Login
          </button>

          <button
            className="mi-signup-btn"
            onClick={() => setShowSignupPopup(true)}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* LOGIN POPUP */}
      {showLoginPopup && (
        <div className="mi-popup-overlay">
          <div className="mi-popup-box">
            <div className="mi-popup-header">
              <h2>Login</h2>
              <button
                className="mi-close-btn"
                onClick={() => setShowLoginPopup(false)}
              >
                ×
              </button>
            </div>

            <form className="mi-form" onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />

              <button className="mi-popup-login-btn">Login</button>

              <p className="mi-text">
                Don’t have account?{" "}
                <span
                  className="mi-link"
                  onClick={() => {
                    setShowLoginPopup(false);
                    setShowSignupPopup(true);
                  }}
                >
                  Signup
                </span>
              </p>
            </form>
          </div>
        </div>
      )}

      {/* SIGNUP POPUP */}
      {showSignupPopup && (
        <div className="mi-popup-overlay">
          <div className="mi-popup-box">
            <div className="mi-popup-header">
              <h2>Sign Up</h2>
              <button
                className="mi-close-btn"
                onClick={() => setShowSignupPopup(false)}
              >
                ×
              </button>
            </div>

            <form className="mi-form" onSubmit={handleSignup}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="contact"
                placeholder="Phone Number"
                value={formData.contact}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <label className="mi-checkbox">
                <input type="checkbox" required />
                <span>
                  I agree with <Link to="/terms">Terms</Link>
                </span>
              </label>

              <button className="mi-popup-signup-btn">Sign Up</button>

              <p className="mi-text">
                Already have account?{" "}
                <span
                  className="mi-link"
                  onClick={() => {
                    setShowSignupPopup(false);
                    setShowLoginPopup(true);
                  }}
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}