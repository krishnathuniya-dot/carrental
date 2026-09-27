
import React, { useEffect, useState } from "react";
import "../css/bookingstyle.css";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH USER BOOKINGS
  // =====================================================

  const fetchBookings = async () => {
    try {
      const userId = localStorage.getItem("userId");

      console.log("Stored userId:", userId);

      if (!userId) {
        console.log("User ID not found in localStorage");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `http://localhost:2340/api/mybookings/${userId}`
      );

      const data = await res.json();

      console.log("Bookings API Response:", data);

      if (!res.ok) {
        console.log(
          data.message || "Failed to fetch bookings"
        );

        setBookings([]);
        return;
      }

      if (data.success) {
        setBookings(
          Array.isArray(data.data) ? data.data : []
        );
      } else {
        console.log(data.message);
        setBookings([]);
      }
    } catch (error) {
      console.log(
        "Error fetching bookings:",
        error
      );

      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // USE EFFECT
  // =====================================================

  useEffect(() => {
    fetchBookings();
  }, []);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    const newDate = new Date(date);

    if (isNaN(newDate.getTime())) {
      return date;
    }

    return newDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="mybookings-container">
        <h2 className="mybookings-title">
          MY BOOKINGS
        </h2>

        <p>Loading bookings...</p>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="mybookings-container">

      <h2 className="mybookings-title">
        MY BOOKINGS
      </h2>

      {/* =================================================
          BOOKINGS FOUND
      ================================================= */}

      {bookings.length > 0 ? (

        bookings.map((item) => (

          <div
            className="booking-card"
            key={item._id}
          >

            {/* ============================================
                BOOKING DETAILS
            ============================================ */}

            <div className="booking-details">

              {/* VEHICLE IMAGE */}

              {item.vehicleId?.image1 ? (

                <img
                  src={`http://localhost:2340/uploads/${item.vehicleId.image1}`}
                  alt={
                    item.vehicleId.vehicleTitle ||
                    item.brand ||
                    "Vehicle"
                  }
                  className="booking-car-image"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

              ) : (

                <div className="booking-no-image">
                  No Image
                </div>

              )}

              {/* VEHICLE NAME */}

              <h3>
                {item.vehicleId?.vehicleTitle ||
                  item.brand ||
                  "Vehicle"}
              </h3>

              {/* BRAND */}

              <p>
                <strong>Brand:</strong>{" "}
                {item.vehicleId?.brand ||
                  item.brand ||
                  "N/A"}
              </p>

              {/* NAME */}

              <p>
                <strong>Name:</strong>{" "}
                {item.name || "N/A"}
              </p>

              {/* FROM DATE */}

              <p>
                <strong>From Date:</strong>{" "}
                {formatDate(item.from_date)}
              </p>

              {/* TO DATE */}

              <p>
                <strong>To Date:</strong>{" "}
                {formatDate(item.to_date)}
              </p>

              {/* MESSAGE */}

              <p>
                <strong>Message:</strong>{" "}
                {item.message || "No message"}
              </p>

            </div>

            {/* ============================================
                BOOKING STATUS
            ============================================ */}

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
                {item.status ||
                  "Not Confirmed yet"}
              </span>

            </div>

          </div>

        ))

      ) : (

        /* ================================================
           NO BOOKINGS
        ================================================ */

        <div className="no-bookings">
          <p>No bookings found</p>
        </div>

      )}

    </div>
  );
}

