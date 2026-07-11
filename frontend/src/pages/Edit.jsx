import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/edit.css";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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

  const [images, setImages] = useState({});
  const [previewImages, setPreviewImages] = useState({});

  const accessoryOptions = [
    "Air Conditioner",
    "AntiLock Braking System",
    "Power Steering",
    "Power Windows",
    "CD Player",
    "Leather Seats",
  ];

  // ✅ Fetch vehicle data
  useEffect(() => {
    async function fetchVehicle() {
      try {
        const res = await fetch(`http://localhost:2340/api/caradd/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Vehicle not found");
        }

        const vehicle = data.user || data.vehicle || data;

        setFormData({
          vehicleTitle: vehicle.vehicleTitle || "",
          brand: vehicle.brand || "",
          vehicleOverview: vehicle.vehicleOverview || "",
          pricePerDay: vehicle.pricePerDay || "",
          fuelType: vehicle.fuelType || "",
          modelYear: vehicle.modelYear || "",
          seatingCapacity: vehicle.seatingCapacity || "",
          accessories: vehicle.accessories || [],
        });

        setPreviewImages({
          image1: vehicle.image1 ? `http://localhost:2340/uploads/${vehicle.image1}` : "",
          image2: vehicle.image2 ? `http://localhost:2340/uploads/${vehicle.image2}` : "",
          image3: vehicle.image3 ? `http://localhost:2340/uploads/${vehicle.image3}` : "",
          image4: vehicle.image4 ? `http://localhost:2340/uploads/${vehicle.image4}` : "",
          image5: vehicle.image5 ? `http://localhost:2340/uploads/${vehicle.image5}` : "",
        });
      } catch (error) {
        console.log("Fetch error:", error);
        alert("Vehicle load failed ❌");
      } finally {
        setLoading(false);
      }
    }

    fetchVehicle();
  }, [id]);

  // ✅ Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Checkbox change
  const handleAccessoryChange = (item) => {
    if (formData.accessories.includes(item)) {
      setFormData({
        ...formData,
        accessories: formData.accessories.filter((acc) => acc !== item),
      });
    } else {
      setFormData({
        ...formData,
        accessories: [...formData.accessories, item],
      });
    }
  };

  // ✅ Image change
  const handleImageChange = (e) => {
    const { name, files } = e.target;

    if (files[0]) {
      setImages({
        ...images,
        [name]: files[0],
      });

      setPreviewImages({
        ...previewImages,
        [name]: URL.createObjectURL(files[0]),
      });
    }
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      form.append("vehicleTitle", formData.vehicleTitle);
      form.append("brand", formData.brand);
      form.append("vehicleOverview", formData.vehicleOverview);
      form.append("pricePerDay", formData.pricePerDay);
      form.append("fuelType", formData.fuelType);
      form.append("modelYear", formData.modelYear);
      form.append("seatingCapacity", formData.seatingCapacity);
      form.append("accessories", JSON.stringify(formData.accessories));

      // images append only if selected
      Object.keys(images).forEach((key) => {
        form.append(key, images[key]);
      });

      const res = await fetch(`http://localhost:2340/api/carupdate/${id}`, {
        method: "PUT",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      alert("Vehicle updated successfully ✅");
      navigate("/cardata");
    } catch (error) {
      console.log("Update error:", error);
      alert("Vehicle update failed ❌");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  }

  return (
    <div className="av-wrapper">
      <div className="av-container">
        <h2 className="av-title">Edit Vehicle</h2>

        <form className="av-form" onSubmit={handleSubmit} >
          {/* Title */}
          <div className="av-group">
            <label>Vehicle Title</label>
            <input
              type="text"
              name="vehicleTitle"
              value={formData.vehicleTitle}
              onChange={handleChange}
              required
            />
          </div>

          {/* Brand */}
          <div className="av-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          {/* Overview */}
          <div className="av-group">
            <label>Vehicle Overview</label>
            <textarea
              name="vehicleOverview"
              value={formData.vehicleOverview}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="av-group">
            <label>Price Per Day</label>
            <input
              type="number"
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              required
            />
          </div>

          {/* Fuel Type */}
          <div className="av-group">
            <label>Fuel Type</label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          {/* Model Year */}
          <div className="av-group">
            <label>Model Year</label>
            <input
              type="number"
              name="modelYear"
              value={formData.modelYear}
              onChange={handleChange}
              required
            />
          </div>

          {/* Seating */}
          <div className="av-group">
            <label>Seating Capacity</label>
            <input
              type="number"
              name="seatingCapacity"
              value={formData.seatingCapacity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Accessories */}
          <div className="av-group">
            <label>Accessories</label>
            <div className="av-accessories">
              {accessoryOptions.map((item, index) => (
                <label key={index} className="av-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.accessories.includes(item)}
                    onChange={() => handleAccessoryChange(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="av-group">
            <label>Vehicle Images</label>
            <div className="av-image-grid">
              {["image1", "image2", "image3", "image4", "image5"].map((img, index) => (
                <div key={index} className="av-image-box">
                  <input
                    type="file"
                    name={img}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {previewImages[img] && (
                    <img src={previewImages[img]} alt={img} className="av-preview" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="av-btn">
            Update Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}