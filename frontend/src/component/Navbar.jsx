import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <nav className="navbar">
        <div className="menu">
          <Link to="/">HOME</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/carlistening">Car Listing</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/contactus">Contact Us</Link>
        </div>

        <div className="user-dropdown">
          <button
            className="user-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaUserCircle className="user-icon" />

            {/* Show logged in user name */}
            <span>{user ? user.name : "Guest"}</span>

            <FaCaretDown className="down-icon" />
          </button>

          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/profile">PROFILE SETTINGS</Link>
              <Link to="/updatepassword">UPDATE PASSWORD</Link>
              <Link to="/booking">MY BOOKING</Link>
              <Link to="/testimonial">POST A TESTIMONIAL</Link>
              <Link to="/mytestimonial">MY TESTIMONIAL</Link>

              <Link
                to="/"
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("token");
                  localStorage.removeItem("email");
                  window.location.reload();
                }}
              >
                SIGN OUT
              </Link>
            </div>
          )}
        </div>

        <div className="search">
          <input type="text" placeholder="Search..." />
        </div>
      </nav>
    </div>
  );
}