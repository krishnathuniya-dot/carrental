import React, { useEffect, useState } from "react";
import "../css/dashboard.css";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminDash() {
  const [userCount, setUserCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [brandCount, setBrandCount] = useState(0);
  const [manageCount, setmanageCount] = useState(0);
  const [carCount, setcarCount] = useState(0);
  const [contactCount, setcontactCount] = useState(0);

  // Fetch Registered Users Count
  const fetchUserCount = async () => {
    try {
      const res = await fetch("http://localhost:2340/api/registerdata/count");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setUserCount(data.count);
      }
    } catch (error) {
      console.log("Error fetching user count:", error);
    }
  };

  // Fetch Subscribers Count
  const fetchSubscriberCount = async () => {
    try {
      const res = await fetch("http://localhost:2340/api/subscribe/count");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setSubscriberCount(data.count);
      }
    } catch (error) {
      console.log("Error fetching subscriber count:", error);
    }
  };

  // Fetch Brand Count
  const fetchBrandCount = async () => {
    try {
      const res = await fetch("http://localhost:2340/api/brand/count");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setBrandCount(data.count);
      }
    } catch (error) {
      console.log("Error fetching brand count:", error);
    }
  };

  const fetchmanageCount = async () => {
    try {
      const res = await fetch("http://localhost:2340/api/booking/count");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setmanageCount(data.count);
      }
    } catch (error) {
      console.log("Error fetching booking count:", error);
    }
  };

  const fetchcarCount = async () => {
    try {
      const res = await fetch("http://localhost:2340/api/addcardata/count");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setcarCount(data.count);
      }
    } catch (error) {
      console.log("Error fetching car count:", error);
    }
  };

  const fetchcontactCount = async () => {
    try {
      const res = await fetch("http://localhost:2340/api/contact/count");

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setcontactCount(data.count);
      }
    } catch (error) {
      console.log("Error fetching contact count:", error);
    }
  };

  useEffect(() => {
    fetchUserCount();
    fetchSubscriberCount();
    fetchBrandCount();
    fetchmanageCount();
    fetchcarCount();
    fetchcontactCount();
  }, []);

  const cards = [
    { count: userCount, title: "REG USERS", color: "blue", link: "/users" },
    { count: carCount, title: "LISTED VEHICLES", color: "green", link: "/cardata" },
    { count: manageCount, title: "BOOKINGS", color: "sky", link: "/managebooking" },
    { count: brandCount, title: "LISTED BRANDS", color: "orange", link: "/managebrand" },
    { count: subscriberCount, title: "SUBSCRIBERS", color: "blue", link: "/subscribe" },
    { count: contactCount, title: "QUERIES", color: "green", link: "/contact" },
    { count: 2, title: "TESTIMONIALS", color: "sky", link: "/testimonaldata" },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <hr />

      <div className="dashboard-grid">
        {cards.map((card, index) => (
          <div className="dashboard-card" key={index}>
            <div className={`card-top ${card.color}`}>
              <h2>{card.count}</h2>
              <p>{card.title}</p>
            </div>

            <Link to={card.link} className="card-bottom-link">
              <div className="card-bottom">
                <span>full detail</span>
                <FaArrowRight className="arrow-icon" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}