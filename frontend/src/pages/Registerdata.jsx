import React, { useEffect, useState } from "react";
import "../css/Registerdata.css";

export default function Registerdata() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("https://carrental-kmhk.onrender.com/api/registerdata");
      const data = await res.json();
      setQuotes(data.data);
    } catch (error) {
      console.log("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const deleteQuote = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`https://carrental-kmhk.onrender.com/api/managequote/${id}`, {
        method: "DELETE",
      });

      setQuotes((prevQuotes) =>
        prevQuotes.filter((quote) => quote._id !== id)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="regdata-wrapper">
      <h2 className="regdata-title">REG USERS</h2>

      <div className="regdata-controls">
        <div className="regdata-left">
          <span>Show</span>
          <select className="regdata-select">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>entries</span>
        </div>

        <div className="regdata-right">
          <label>Search:</label>
          <input type="text" className="regdata-search" />
        </div>
      </div>

      <table className="regdata-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact no</th>
            <th>DOB</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Reg Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {quotes.map((q, index) => (
            <tr key={q._id}>
              <td>{index + 1}</td>
              <td>{q.name}</td>
              <td>{q.email}</td>
              <td>{q.contact}</td>
              <td>{q.dob}</td>
              <td>{q.Address}</td>
              <td>{q.city}</td>
              <td>{q.country}</td>
              <td>{q.createdAt ? new Date(q.createdAt).toLocaleString() : "N/A"}</td>
              <td>
                <button className="regdata-edit-btn">Edit</button>
                <button
                  className="regdata-delete-btn"
                  onClick={() => deleteQuote(q._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}