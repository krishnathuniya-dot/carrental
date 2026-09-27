
import React, { useState, useEffect } from "react";
import "../css/car.css";
import { Link } from "react-router-dom";

export default function Carlistening() {
  const [vehicles, setVehicles] = useState([]);
  const [brands, setBrands] = useState([]);

  // =========================================================
  // FETCH VEHICLES
  // =========================================================

  const fetchVehicles = async () => {
    try {
      const res = await fetch(
        "https://carrental-kmhk.onrender.com/api/addcardata"
      );

      const data = await res.json();

      console.log(
        "VEHICLES RESPONSE:",
        data
      );

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch vehicles"
        );
      }

      setVehicles(
        Array.isArray(data.data)
          ? data.data
          : []
      );

    } catch (error) {
      console.log(
        "Error fetching vehicle data:",
        error
      );

      setVehicles([]);
    }
  };

  // =========================================================
  // FETCH BRANDS
  // =========================================================

  const fetchBrands = async () => {
    try {
      const res = await fetch(
        "https://carrental-kmhk.onrender.com/api/carbrand"
      );

      const data = await res.json();

      console.log(
        "BRANDS RESPONSE:",
        data
      );

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch brands"
        );
      }

      setBrands(
        Array.isArray(data.data)
          ? data.data
          : []
      );

    } catch (error) {
      console.log(
        "Error fetching brand data:",
        error
      );

      setBrands([]);
    }
  };

  // =========================================================
  // USE EFFECT
  // =========================================================

  useEffect(() => {
    fetchVehicles();
    fetchBrands();
  }, []);

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="gi-page">

      <div className="gi-container">

        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <div className="gi-left">

          {/* =================================================
              FIND YOUR CAR
          ================================================= */}

          <div className="gi-box">

            <h2>
              Find Your Car
            </h2>

            {/* BRAND DROPDOWN */}

            <select defaultValue="">
              <option value="">
                Select Brand
              </option>

              {brands.length > 0 ? (

                brands.map(
                  (item, index) => (

                    <option
                      key={index}
                      value={item.brand}
                    >
                      {item.brand}
                    </option>

                  )
                )

              ) : (

                <option
                  value=""
                  disabled
                >
                  No brands found
                </option>

              )}

            </select>

            {/* FUEL TYPE */}

            <select defaultValue="">
              <option value="">
                Select Fuel Type
              </option>

              <option value="Petrol">
                Petrol
              </option>

              <option value="Diesel">
                Diesel
              </option>

              <option value="CNG">
                CNG
              </option>

              <option value="Electric">
                Electric
              </option>

            </select>

            <button>
              Search Car
            </button>

          </div>

          {/* =================================================
              RECENTLY LISTED CARS
          ================================================= */}

          <div className="gi-box">

            <h2>
              Recently Listed Cars
            </h2>

            {vehicles
              .slice(0, 2)
              .map(
                (car, index) => (

                  <div
                    className="gi-recent-car"
                    key={
                      car._id || index
                    }
                  >

                    {/* CLOUDINARY IMAGE */}

                    <img
                      src={
                        car.image1
                          ? car.image1
                          : "https://via.placeholder.com/100"
                      }
                      alt={
                        car.vehicleTitle ||
                        "Vehicle"
                      }
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/100";
                      }}
                    />

                    <div>

                      <h4>
                        {car.brand},{" "}
                        {car.vehicleTitle}
                      </h4>

                      <p>
                        ₹
                        {
                          car.pricePerDay
                        }{" "}
                        Per Day
                      </p>

                    </div>

                  </div>

                )
              )}

          </div>

        </div>

        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <div className="gi-right">

          {vehicles.length > 0 ? (

            vehicles.map(
              (car, index) => (

                <div
                  className="gi-car-card"
                  key={
                    car._id || index
                  }
                >

                  {/* CLOUDINARY IMAGE */}

                  <img
                    src={
                      car.image1
                        ? car.image1
                        : "https://via.placeholder.com/400x250"
                    }
                    alt={
                      car.vehicleTitle ||
                      "Vehicle"
                    }
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x250";
                    }}
                  />

                  <div className="gi-details">

                    <h2>
                      {car.brand},{" "}
                      {car.vehicleTitle}
                    </h2>

                    <p className="gi-price">
                      ₹
                      {
                        car.pricePerDay
                      }{" "}
                      Per Day
                    </p>

                    <div className="gi-info">

                      <span>
                        {
                          car.seatingCapacity
                        }{" "}
                        seats
                      </span>

                      <span>
                        {
                          car.modelYear
                        }{" "}
                        model
                      </span>

                      <span>
                        {
                          car.fuelType
                        }
                      </span>

                    </div>

                    <button>
                      <Link
                        to={`/view/${car._id}`}
                      >
                        View Details
                      </Link>
                    </button>

                  </div>

                </div>

              )
            )

          ) : (

            <p>
              No vehicles found
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

