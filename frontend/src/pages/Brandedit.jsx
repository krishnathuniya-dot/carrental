import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Brandedit.css";

export default function Brandedit() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brand: "",
  });

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Old brand data fetch by id
  const fetchBrand = async () => {
    try {
      const res = await fetch(`https://carrental-kmhk.onrender.com/api/brandfetch/${id}`);
      const data = await res.json();

      if (res.ok) {
        setFormData({
          brand: data.brand,
        });
      } else {
        alert(data.message || "Brand not found");
      }
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchBrand();
  }, []);

  // Update brand
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:2340/api/brandupdate/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Brand updated successfully");
        navigate("/branddata"); // update ke baad list page
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.log("Update Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="brandedit-containerli">
      <h2>Edit Brand</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-groupgli">
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

        <button type="submit" className="buttongli">
          Update Brand
        </button>
      </form>
    </div>
  );
}