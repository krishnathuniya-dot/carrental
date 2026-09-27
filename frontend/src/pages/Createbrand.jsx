import React, { useState, useEffect } from "react";
import "../css/CreateBrand.css";

export default function Createbrand() {
  const [formData, setFormData] = useState({
    brand: "",
  });

  const [success, setSuccess] = useState(false);
  const [quotes, setQuotes] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.brand.trim()) {
      alert("Please enter brand name");
      return;
    }

    try {
      const res = await fetch("https://carrental-kmhk.onrender.com/api/branddata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      console.log("Response:", data);

      if (res.ok && data.success) {
        setSuccess(true);

        setFormData({
          brand: "",
        });

        fetchQuotes(); // refresh list after adding

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        alert(data.message || "Failed to create brand");
      }
    } catch (err) {
      console.error("Frontend Error:", err);
      alert("Error creating brand. Check backend/server.");
    }
  };

  const fetchQuotes = async () => {
    try {
      const res = await fetch("https://carrental-kmhk.onrender.com/api/carbrand");
      const data = await res.json();
      setQuotes(data.data || []);
    } catch (error) {
      console.log("Error fetching brand data:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const deleteQuote = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this brand?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`https://carrental-kmhk.onrender.com/api/deletebrand/${id}`, {
        method: "DELETE",
      });

      const updatedQuotes = quotes.filter((quote) => quote._id !== id);
      setQuotes(updatedQuotes);

      // If current page becomes empty after delete, go to previous page
      const newTotalPages = Math.ceil(updatedQuotes.length / itemsPerPage);
      if (currentPage > newTotalPages && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(quotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentQuotes = quotes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="containerg">
        <h2>Create Brand</h2>

        {success && (
          <div className="successg">
            SUCCESS: Brand Created successfully
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-groupg">
            <label>Brand Name</label>
            <input
              type="text"
              name="brand"
              className="inputg"
              placeholder="Enter Brand Name"
              onChange={handleChange}
              value={formData.brand}
              required
            />
          </div>

          <button type="submit" className="buttong">
            Submit
          </button>
        </form>

        <div className="manage-container">
          <h2>Subscriber</h2>

          <table className="mq-tables">
            <thead>
              <tr className="mq-tr">
                <th>#</th>
                <th>Brands</th>
                <th>date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentQuotes.length > 0 ? (
                currentQuotes.map((q, index) => (
                  <tr key={q._id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{q.brand}</td>
                    <td>
                      {q.createdAt
                        ? new Date(q.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteQuote(q._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No subscribers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {quotes.length > itemsPerPage && (
            <div className="paginationg">
              <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`page-btn ${currentPage === i + 1 ? "active-page" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}