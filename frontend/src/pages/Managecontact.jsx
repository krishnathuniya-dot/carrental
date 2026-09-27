import React, { useEffect, useState } from "react";
import "../css/managecontact.css"

export default function Managecontact() {

  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("https://carrental-kmhk.onrender.com/api/contactt");
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
      "Are you sure you want to delete this quote?"
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
      console.error("Error deleting quote:", error);
    }
  };

  return (
    <div className="manage-container">

      <h2>contact data</h2>

      <table className="mq-tables">

        <thead>
          <tr className="mq-tr">
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Message</th> 
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {quotes.map((q) => (
            <tr key={q._id}>
              <td>{q.name}</td>
              <td>{q.email}</td>
              <td>{q.contact}</td>
              <td>{q.Massage}</td> 
              <td>
                <button className="edit-btn">
                  Edit
                </button>
                <button
                  className="delete-btn"
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