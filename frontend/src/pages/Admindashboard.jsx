import React from "react";
import { Link } from "react-router-dom";
import "../css/admindash.css"

import { FaTachometerAlt, FaCar, FaUsers, FaClipboardList, FaCommentDots, FaFileAlt, FaEnvelope, FaTags } from "react-icons/fa";

export default function Amindashboard() {
  return (
    <div className="sidebar">
      <h4 className="logo">MAIN</h4>

      <ul>
        <li><Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link></li>
        <li><Link to={"/createbrands"} ><FaTags /> Brands</Link></li>
         <li><Link to={"/managebrand"} ><FaTags /> manage Brands</Link></li>
        <li><Link to={"/addvevechele"}><FaCar /> Vehicles</Link></li>
         <li><Link to={"/cardata"}><FaCar /> manage Vehicles</Link></li>
        <li><Link to={"/managebooking"}><FaClipboardList /> Manage Booking</Link></li>
        <li><Link to={"/testimonaldata"}><FaCommentDots /> Manage Testimonials</Link></li>
        <li><Link to="/contact"><FaEnvelope /> Contact Query</Link></li>
        <li><Link to="/users"><FaUsers /> Reg Users</Link></li>
        <li><Link ><FaFileAlt /> Manage Pages</Link></li>
        <li><Link to="/info"><FaEnvelope /> Contact Info</Link></li>
        <li><Link to="/subscribe"><FaUsers /> Subscribers</Link></li>
      </ul>
    </div>
  );
}