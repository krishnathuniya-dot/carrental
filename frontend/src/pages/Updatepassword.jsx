import React, { useState } from "react";
import "../css/updatepassword.css";

export default function Updatepassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClear = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Confirm password validation
  if (formData.newPassword !== formData.confirmPassword) {
    alert("New Password and Confirm Password do not match");
    return;
  }

  try {
    const response = await fetch("http://localhost:2340/api/changepassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("id"), 
        oldPassword: formData.currentPassword, 
        newPassword: formData.newPassword, 
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); // backend message show karega
      
      handleClear();
    } else {
      alert(data.message);
    }
    

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
 
};

  
  return (
    <div className="update-password-container">
      <div className="update-password-box">
        <h3 className="update-title">Update password</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="update-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}