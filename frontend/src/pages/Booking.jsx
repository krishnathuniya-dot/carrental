import React, { useEffect, useState } from "react";
import "../css/bookingstyle.css"

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const userId = localStorage.getItem("userId");
      console.log("Stored userId:", userId);
      

      if (!userId) {
        console.log("User ID not found in localStorage");
        return;
      }

      const res = await fetch(`http://localhost:2340/api/mybookings/${userId}`);
      const data = await res.json();

      console.log("Bookings API Response:", data);

      if (data.success) {
        setBookings(data.data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="mybookings-container">
      <h2 className="mybookings-title">MY BOOKINGS</h2>

      {bookings.length > 0 ? (
        bookings.map((item) => (
          <div className="booking-card" key={item._id}>
            <div className="booking-details">
                <img
            src={`http://localhost:2340/uploads/${item.image1}`}
            alt={item.image1}
            
          />
              <h3>{item.brand}</h3>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>From Date:</strong> {item.from_date}</p>
              <p><strong>To Date:</strong> {item.to_date}</p>
              <p><strong>Message:</strong> {item.message}</p>
            </div>

            <div className="booking-status">
              <span
                className={
                  item.status === "Confirmed"
                    ? "status-confirmed"
                    : item.status === "Cancelled"
                    ? "status-cancelled"
                    : "status-pending"
                }
              >
                {item.status || "Pending"}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
}