import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../css/sidebar.css"

export default function Siddebar() {
  const navigate = useNavigate();

   const handleSignOut = () => {
    localStorage.removeItem("id");
     localStorage.removeItem("name");
    alert("are you sure");
    navigate("/");
  };

  return (
    <div className="sidbar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/profile" className="active">Profile Settings</Link>
        </li>
        <li>
          <Link to="/updatepassword">Update Password</Link>
        </li>
        <li>
          <Link to="/booking">My Booking</Link>
        </li>
        <li>
          <Link to="/testimonial">Post a Testimonial</Link>
        </li>
        <li>
          <Link to="/testimonial">My Testimonials</Link>
        </li>
        <li>
          <button onClick={handleSignOut} className="logoutbtn">
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}