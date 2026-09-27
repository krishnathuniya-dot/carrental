import React, { useState, useEffect } from "react";
import "../css/car.css";
import { Link } from "react-router-dom";

export default function Carlistening() {
  const [vehicles, setVehicles] = useState([]);
  const [brands, setBrands] = useState([]);

 
  const fetchVehicles = async () => {
    try {
      const res = await fetch("https://carrental-kmhk.onrender.com/api/addcardata");
      const data = await res.json();
        console.log(data);
      setVehicles(data.data || []);
    } catch (error) {
      console.log("Error fetching vehicle data:", error);
    }
  };

  
  const fetchBrands = async () => {
    try {
      const res = await fetch("https://carrental-kmhk.onrender.com/api/carbrand");
      const data = await res.json();
      setBrands(data.data || []);
    } catch (error) {
      console.log("Error fetching brand data:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
    fetchBrands();
  }, []);

  return (
    <div className="gi-page">
      <div className="gi-container">
        {/* Left Side */}
        <div className="gi-left">
          <div className="gi-box">
            <h2>Find Your Car</h2>

            {/* Brand Dropdown */}
            <select>
              <option value="">Select Brand</option>
              {brands.length > 0 ? (
                brands.map((item, index) => (
                  <option key={index} value={item.brand}>
                    {item.brand}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No brands found
                </option>
              )}
            </select>

           
            <select>
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="CNG">CNG</option>
            </select>

            <button>Search Car</button>
          </div>

          {/* Recently Listed Cars */}
          <div className="gi-box">
            <h2>Recently Listed Cars</h2>

            {vehicles.slice(0, 2).map((car, index) => (
              <div className="gi-recent-car" key={index}>
                <img
                  src={
                    car.image1
                      ? `https://carrental-kmhk.onrender.com/uploads/${car.image1}`
                      : "https://via.placeholder.com/100"
                  }
                  alt={car.vehicleTitle}
                />
                <div>
                  <h4>
                    {car.brand}, {car.vehicleTitle}
                  </h4>
                  <p>₹{car.pricePerDay} Per Day</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="gi-right">
          {vehicles.length > 0 ? (
            vehicles.map((car, index) => (
              <div className="gi-car-card" key={index}>
                <img
                  src={
                    car.image1
                      ? `https://carrental-kmhk.onrender.com/uploads/${car.image1}`
                      : "https://via.placeholder.com/400x250"
                  }
                  alt={car.vehicleTitle}
                />

                <div className="gi-details">
                  <h2>
                    {car.brand}, {car.vehicleTitle}
                  </h2>
                  <p className="gi-price">₹{car.pricePerDay} Per Day</p>

                  <div className="gi-info">
                    <span>{car.seatingCapacity} seats</span>
                    <span>{car.modelYear} model</span>
                    <span>{car.fuelType}</span>
                  </div>

                  <button>
                    <Link to={`/view/${car._id}`}>View Details</Link>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No vehicles found</p>
          )}
        </div>
      </div>
    </div>
  );
}