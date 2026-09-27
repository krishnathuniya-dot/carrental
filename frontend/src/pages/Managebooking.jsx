import React, { useEffect, useState } from "react";
import "../css/managecontact.css";

export default function Managebooking() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("https://carrental-kmhk.onrender.com/api/managebooking");
      const data = await res.json();
      setQuotes(data.data);
    } catch (error) {
      console.log("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // Update Status
  const updateStatus = async (id, status) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${status} this booking?`
    );
    if (!confirmAction) return;

    try {
      const res = await fetch(`https://carrental-kmhk.onrender.com/api/bookingstatus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (res.ok) {
        setQuotes((prevQuotes) =>
          prevQuotes.map((quote) =>
            quote._id === id ? { ...quote, status } : quote
          )
        );

        alert(`Booking ${status} Successfully`);
      } else {
        alert(data.message || "Failed to update booking status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Something went wrong while updating status");
    }
  };

  // Delete Booking
  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://carrental-kmhk.onrender.com/api/deletebooking/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setQuotes((prevQuotes) =>
          prevQuotes.filter((quote) => quote._id !== id)
        );
        alert("Booking Deleted Successfully");
      } else {
        alert(data.message || "Failed to delete booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Something went wrong while deleting booking");
    }
  };

  return (
    <div className="manage-container">
      <h2>Booking Data</h2>

      <table className="mq-tables">
        <thead>
          <tr className="mq-tr">
            <th>Customer Name</th>
            <th>Brand</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Message</th>
            <th>Post Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {quotes.map((q) => (
            <tr key={q._id}>
              <td>{q.name}</td>
              <td>{q.brand}</td>
              <td>{q.from_date}</td>
              <td>{q.to_date}</td>
              <td>{q.message}</td>
              <td>
                {q.createdAt ? new Date(q.createdAt).toLocaleString() : "N/A"}
              </td>

              {/* Status Column */}
              <td>
                <span
                  className={
                    q.status === "Confirmed"
                      ? "status-confirm"
                      : q.status === "Cancelled"
                      ? "status-cancel"
                      : "status-pending"
                  }
                >
                  {q.status || "Pending"}
                </span>
              </td>

              {/* Action Column - No Buttons */}
              <td className="action-links">
                <span
                  className="confirm-text"
                  onClick={() => updateStatus(q._id, "Confirmed")}
                >
                  Confirm
                </span>

                <span
                  className="cancel-text"
                  onClick={() => updateStatus(q._id, "Cancelled")}
                >
                  Cancel
                </span>

             
              </td>
            </tr> 
          ))}
        </tbody>
      </table>
    </div>
  );
}