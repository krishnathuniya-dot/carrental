import React, { useState, useEffect } from "react";
import "../css/addvechicle.css";

export default function AddVehicle() {
  const [formData, setFormData] = useState({
    vehicleTitle: "",
    brand: "",
    vehicleOverview: "",
    pricePerDay: "",
    fuelType: "",
    modelYear: "",
    seatingCapacity: "",
    accessories: [],
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);

  const fuelOptions = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];

  const accessoryOptions = [
    "Air Conditioner",
    "Power Door Locks",
    "AntiLock Braking System",
    "Brake Assist",
    "Power Steering",
    "Driver Airbag",
    "Passenger Airbag",
    "Power Windows",
    "CD Player",
    "Central Locking",
    "Crash Sensor",
    "Leather Seats",
  ];

  
  const fetchBrands = async () => {
    try {
      const res = await fetch("http://localhost:2340/api/carbrand"); 
      const data = await res.json();

      console.log("Brand API Response:", data);

      if (res.ok) {
        setBrands(data.data || []);
      } else {
        console.error("Failed to fetch brands:", data.message);
        setBrands([]);
      }
    } catch (error) {
      console.log("Error fetching brand data:", error);
      setBrands([]);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleAccessoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        accessories: [...prev.accessories, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        accessories: prev.accessories.filter((item) => item !== value),
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      vehicleTitle: "",
      brand: "",
      vehicleOverview: "",
      pricePerDay: "",
      fuelType: "",
      modelYear: "",
      seatingCapacity: "",
      accessories: [],
    });

    setImages({
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
    });

    document.querySelectorAll('input[type="file"]').forEach((input) => {
      input.value = "";
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const submitData = new FormData();

      submitData.append("vehicleTitle", formData.vehicleTitle);
      submitData.append("brand", formData.brand);
      submitData.append("vehicleOverview", formData.vehicleOverview);
      submitData.append("pricePerDay", formData.pricePerDay);
      submitData.append("fuelType", formData.fuelType);
      submitData.append("modelYear", formData.modelYear);
      submitData.append("seatingCapacity", formData.seatingCapacity);
      submitData.append("accessories", JSON.stringify(formData.accessories));

      if (images.image1) submitData.append("image1", images.image1);
      if (images.image2) submitData.append("image2", images.image2);
      if (images.image3) submitData.append("image3", images.image3);
      if (images.image4) submitData.append("image4", images.image4);
      if (images.image5) submitData.append("image5", images.image5);

      const res = await fetch("http://localhost:2340/api/addvehicle", {
        method: "POST",
        body: submitData,
      });

      const text = await res.text();
      console.log("Raw Response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Backend JSON nahi bhej raha. Response: " + text);
      }

      if (res.ok) {
        alert(data.message || "Vehicle added successfully!");
        resetForm();
      } else {
        alert(data.message || "Failed to add vehicle");
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      alert(error.message || "Server error while adding vehicle");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="addvehicle-container">
      <form onSubmit={handleSubmit}>
        <div className="section-box">
          <div className="section-title">BASIC INFO</div>

          <div className="form-grid">
            <div className="form-group">
              <label>Vehicle Title*</label>
              <input
                type="text"
                name="vehicleTitle"
                value={formData.vehicleTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Select Brand*</label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {brands.length > 1 ? (
                  brands.map((item, index) => (
                    <option key={index} >
                      {item.brand}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No brands found
                  </option>
                )}
              </select>
            </div>

            <div className="form-group full-width">
              <label>Vehicle Overview*</label>
              <textarea
                name="vehicleOverview"
                value={formData.vehicleOverview}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Price Per Day*</label>
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Select Fuel Type*</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {fuelOptions.map((fuel, index) => (
                  <option key={index} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Model Year*</label>
              <input
                type="number"
                name="modelYear"
                value={formData.modelYear}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Seating Capacity*</label>
              <input
                type="number"
                name="seatingCapacity"
                value={formData.seatingCapacity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="upload-wrapper">
            <h3>Upload Images</h3>

            <div className="image-grid">
              <div className="form-group">
                <label>Image 1*</label>
                <input
                  type="file"
                  name="image1"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Image 2</label>
                <input
                  type="file"
                  name="image2"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="form-group">
                <label>Image 3</label>
                <input
                  type="file"
                  name="image3"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="form-group">
                <label>Image 4</label>
                <input
                  type="file"
                  name="image4"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="form-group">
                <label>Image 5</label>
                <input
                  type="file"
                  name="image5"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="section-box">
          <div className="section-title">ACCESSORIES</div>

          <div className="accessories-grid">
            {accessoryOptions.map((item, index) => (
              <label key={index} className="checkbox-item">
                <input
                  type="checkbox"
                  value={item}
                  checked={formData.accessories.includes(item)}
                  onChange={handleAccessoryChange}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>

          <div className="btn-row">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>

            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}