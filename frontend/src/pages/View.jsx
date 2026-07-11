import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/view.css";

export default function View() {
  const { id } = useParams();

  const accessoriesList = [
    "Air Conditioner",
    "AntiLock Braking System",
    "Power Steering",
    "Power Windows",
    "CD Player",
    "Leather Seats",
  ];

  const [vehicleData, setVehicleData] = useState({
    vehicleTitle: "",
    brand: "",
    vehicleOverview: "",
    pricePerDay: "",
    fuelType: "",
    modelYear: "",
    seatingCapacity: "",
    accessories: [],
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });

  const [loading, setLoading] = useState(true);

  const [bookingData, setBookingData] = useState({
    from_date: "",
    to_date: "",
    message: "",
    name: "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  // FETCH
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`http://localhost:2340/api/vehiclefetch/${id}`);
        const data = await res.json();
        const vehicle = data.vehicle || data;

        setVehicleData(vehicle);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  // IMAGES
  const vehicleImages = [
    vehicleData.image1,
    vehicleData.image2,
    vehicleData.image3,
    vehicleData.image4,
    vehicleData.image5,
  ].filter((img) => img && img.trim() !== "");

  // SLIDER
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === vehicleImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? vehicleImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (vehicleImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === vehicleImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [vehicleImages]);

  // BOOKING
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async () => {
    const userId = localStorage.getItem("userId");

    if (!bookingData.name || !bookingData.from_date || !bookingData.to_date) {
      alert("Fill all fields");
      return;
    }

    const res = await fetch("http://localhost:2340/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...bookingData, userId }),
    });

    if (res.ok) {
      alert("Booking Success");
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="full-page">

      {/* 🔥 PREMIUM SLIDER */}
      <div className="slider">
        {vehicleImages.length > 0 && (
          <>
            {/* BLUR BG */}
            <div
              className="slider-bg"
              style={{
                backgroundImage: `url(http://localhost:2340/uploads/${vehicleImages[currentIndex]})`,
              }}
            ></div>

            {/* MAIN IMAGE */}
            <img
              src={`http://localhost:2340/uploads/${vehicleImages[currentIndex]}`}
              alt="car"
              className="slider-img"
            />

            {/* BUTTONS */}
            <button className="prev" onClick={prevSlide}>❮</button>
            <button className="next" onClick={nextSlide}>❯</button>

            {/* DOTS */}
            <div className="dots">
              {vehicleImages.map((_, index) => (
                <span
                  key={index}
                  className={index === currentIndex ? "dot active" : "dot"}
                  onClick={() => setCurrentIndex(index)}
                ></span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* TITLE */}
      <div className="title-section">
        <div className="car-title">
          <h1>{vehicleData.brand} {vehicleData.vehicleTitle}</h1>
        </div>
        <div className="car-price">
          <h2>₹{vehicleData.pricePerDay}</h2>
          <p>Per Day</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="main-section">

        <div className="left-section">

          <div className="top-boxes">
            <div className="info-box">
              <h3>{vehicleData.modelYear}</h3>
              <p>Year</p>
            </div>
            <div className="info-box">
              <h3>{vehicleData.fuelType}</h3>
              <p>Fuel</p>
            </div>
            <div className="info-box">
              <h3>{vehicleData.seatingCapacity}</h3>
              <p>Seats</p>
            </div>
          </div>

          <div className="tabs">
            <button
              className={activeTab === "overview" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>

            <button
              className={activeTab === "accessories" ? "tab-btn active" : "tab-btn"}
              onClick={() => setActiveTab("accessories")}
            >
              Accessories
            </button>
          </div>

          {activeTab === "overview" && (
            <div className="accessories-box">
              <h3>Vehicle Overview</h3>
              <p>{vehicleData.vehicleOverview}</p>
            </div>
          )}

          {activeTab === "accessories" && (
            <div className="accessories-box">
              <h3>Accessories</h3>
              <table>
                <tbody>
                  {accessoriesList.map((item, index) => {
                    const isAvailable =
                      vehicleData.accessories.includes(item);

                    return (
                      <tr key={index}>
                        <td>{item}</td>
                        <td className={isAvailable ? "yes" : "no"}>
                          {isAvailable ? "✔" : "✖"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

        <div className="right-section">
          <div className="book-box">
            <h3>Book Now</h3>

            <input type="date" name="from_date" onChange={handleBookingChange} />
            <input type="date" name="to_date" onChange={handleBookingChange} />
            <input type="text" name="name" placeholder="Your Name" onChange={handleBookingChange} />
            <textarea name="message" placeholder="Message" onChange={handleBookingChange}></textarea>

            <button onClick={handleBookingSubmit}>Book Now</button>
          </div>
        </div>

      </div>
    </div>
  );
}