import React, { useState, useEffect } from "react";
import "../css/profile.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    dob: "",
    address: "",
    city: "",
    country: "",
    regDate: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // ✅ ONLY ONE SOURCE (FINAL FIX)
        const userId = localStorage.getItem("userId");

        console.log("USER ID:", userId);

        if (!userId) {
          alert("User not logged in");
          navigate("/");
          return;
        }

        const res = await fetch(`http://localhost:2340/api/profile/${userId}`);
        const data = await res.json();

        console.log("PROFILE DATA:", data);

        if (res.ok) {
          setFormData({
            name: data.user?.name || "",
            email: data.user?.email || "",
            contact: data.user?.contact || "",
            dob: data.user?.dob ? data.user.dob.split("T")[0] : "",
            address: data.user?.address || "",
            city: data.user?.city || "",
            country: data.user?.country || "",
            regDate: data.user?.createdAt
              ? new Date(data.user.createdAt).toLocaleString()
              : "",
          });
        } else {
          alert(data.message || "Failed to fetch profile");
        }
      } catch (error) {
        console.log("Fetch error:", error);
        alert("Server error");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ SAME SOURCE HERE
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User not logged in");
        navigate("/");
        return;
      }

      const res = await fetch(`http://localhost:2340/api/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          dob: formData.dob,
          address: formData.address,
          city: formData.city,
          country: formData.country,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update profile");
        return;
      }

      alert("Profile updated successfully ✅");
    } catch (error) {
      console.log("Update error:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      contact: "",
      dob: "",
      address: "",
      city: "",
      country: "",
      regDate: "",
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="content">
          <h2 className="title">GENERAL SETTINGS</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Reg Date</label>
              <p>{formData.regDate}</p>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>DOB</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>

            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button type="button" className="save-btn" onClick={handleClear}>
              Clear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}