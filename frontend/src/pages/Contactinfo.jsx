import React, { useState, useEffect } from "react";
import "../css/contactinfo.css";

export default function Contactinfo() {
  const [formData, setFormData] = useState({
    address: "",
    email: "",
    contact: "",
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const res = await fetch("https://carrental-kmhk.onrender.com/api/contactinfo");
      const data = await res.json();

      console.log("Fetched Data:", data);

      if (res.ok) {
    
        const contactData = data.data || data.info || data;

        setFormData({
          address: contactData.address || "",
          email: contactData.email || "",
          contact: contactData.contact || "",
        });

       
        localStorage.setItem("infoaddress", contactData.address || "");
        localStorage.setItem("infoemail", contactData.email || "");
        localStorage.setItem("infocontact", contactData.contact || "");
      } else {
        alert(data.message || "Failed to fetch contact info");
      }
    } catch (error) {
      console.log("Error fetching contact info:", error);
      alert("Server error while fetching data");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:2340/api/contactinfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          contact: formData.contact,
          address: formData.address,
        }),
      });

      const data = await response.json();
      console.log("Update Response:", data);

      if (response.ok) {
        alert(data.message || "Contact info updated successfully");

       
        if (data.info) {
          localStorage.setItem("infoaddress", data.info.address || "");
          localStorage.setItem("infoemail", data.info.email || "");
          localStorage.setItem("infocontact", data.info.contact || "");
        } else {
         
          localStorage.setItem("infoaddress", data.address || formData.address || "");
          localStorage.setItem("infoemail", data.email || formData.email || "");
          localStorage.setItem("infocontact", data.contact || formData.contact || "");
        }

        fetchContactInfo();
      } else {
        alert(data.message || "Failed to update contact info");
      }
    } catch (error) {
      console.log("Update error:", error);
      alert("Server error");
    }
  };

  const handleClear = () => {
    setFormData({
      address: "",
      email: "",
      contact: "",
    });
  };

  return (
    <div className="update-contact-wrapper">
      <div className="update-contact-box">
        <div className="form-header">FORM FIELDS</div>

        <form className="update-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-row">
            <label>Email Id</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Contact Number</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>

          <div className="form-btn-row">
            <button type="submit" className="updatee-btn">
              Update
            </button>

            <button type="button" className="clear-btn" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}