import React, { useState } from "react";
import "../css/contactus.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contactus() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",   
    Massage: "",   
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://carrental-kmhk.onrender.com/api/contactdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          contact: "",
          Massage: "",
        });
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Error sending message");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        
        {/* Left Side Form */}
        <div className="contact-form-section">
          <h2>Get in touch using the form below</h2>

          <div className="form-box">
            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label>Full Name <span>*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email Address <span>*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone Number <span>*</span></label>
                <input
                  type="tel"
                  name="contact"   
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Message <span>*</span></label>
                <textarea
                  rows="6"
                  name="Massage"   
                  value={formData.Massage}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="send-btn">
                Send Message
              </button>

            </form>
          </div>
        </div>

      
        <div className="contact-infoo-section">
          <h2>Contact Info</h2>

          <div className="infoo-item">
            <div className="iconn-box">
              <FaMapMarkerAlt />
            </div>
            <p>{localStorage.getItem("infoaddress")}</p>
          </div>

          <div className="infoo-item">
            <div className="iconn-box">
              <FaPhoneAlt />
            </div>
            <p>{localStorage.getItem("infocontact")}</p>
          </div>

          <div className="infoo-item">
            <div className="iconn-box">
              <FaEnvelope />
            </div>
            <p>{localStorage.getItem("infoemail")}</p>
          </div>

        </div>

      </div>
    </div>
  );
}