import React, { useState } from "react";
import "../css/Testimonial.css";

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = localStorage.getItem("name"); 

    try {
      const res = await fetch("https://carrental-kmhk.onrender.com/api/testimonal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,              
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Submitted successfully!");

        setFormData({
          message: "",
        });
      } else {
        alert(data.message || "Failed to submit");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    }
  };

  return (
    <div className="gttt-container">
      <form onSubmit={handleSubmit}>
        <label className="gttt-label">Testimonial</label>

        <textarea
          name="message"
          className="gttt-textarea"
          placeholder="Enter testimonial..."
          onChange={handleChange}
          value={formData.message}
          required
        />

        <button type="submit" className="gttt-button">
          Save ➤
        </button>
      </form>
    </div>
  );
}