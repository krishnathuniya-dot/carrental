
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/View.css";

export default function View() {
  const { id } = useParams();

  // =========================================================
  // ACCESSORIES LIST
  // =========================================================  

  const accessoriesList = [
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

  // =========================================================
  // VEHICLE STATE
  // =========================================================

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
  const [bookingLoading, setBookingLoading] = useState(false);

  // =========================================================
  // BOOKING STATE
  // =========================================================

  const [bookingData, setBookingData] = useState({
    from_date: "",
    to_date: "",
    message: "",
    name: "",
  });

  // =========================================================
  // SLIDER STATE
  // =========================================================

  const [currentIndex, setCurrentIndex] = useState(0);

  // =========================================================
  // DEFAULT TAB = ACCESSORIES
  // =========================================================

  const [activeTab, setActiveTab] = useState("accessories");

  // =========================================================
  // FETCH VEHICLE
  // =========================================================

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://carrental-kmhk.onrender.com/api/vehiclefetch/${id}`
        );

        const data = await res.json();

        console.log("VEHICLE RESPONSE:", data);

        if (!res.ok) {
          throw new Error(data.message || "Vehicle not found");
        }

        // =====================================================
        // GET VEHICLE OBJECT
        // =====================================================

        const vehicle =
          data.vehicle ||
          data.data ||
          data;

        console.log("VEHICLE DATA:", vehicle);

        // =====================================================
        // FIX ACCESSORIES
        // =====================================================

        let parsedAccessories = [];

        const rawAccessories = vehicle.accessories;

        console.log(
          "RAW ACCESSORIES:",
          rawAccessories
        );

        if (Array.isArray(rawAccessories)) {
          /*
           * CASE 1:
           * Normal array:
           *
           * [
           *   "Air Conditioner",
           *   "Power Steering"
           * ]
           */

          if (
            rawAccessories.length > 0 &&
            typeof rawAccessories[0] === "string"
          ) {
            /*
             * Check whether first item itself is
             * a JSON string.
             *
             * Example:
             *
             * [
             *   "[\"Air Conditioner\",\"Power Steering\"]"
             * ]
             */

            try {
              const firstItem = rawAccessories[0].trim();

              if (
                firstItem.startsWith("[") &&
                firstItem.endsWith("]")
              ) {
                const parsed = JSON.parse(firstItem);

                if (Array.isArray(parsed)) {
                  parsedAccessories = parsed;
                } else {
                  parsedAccessories = rawAccessories;
                }
              } else {
                parsedAccessories = rawAccessories;
              }
            } catch (error) {
              console.error(
                "Accessories JSON Parse Error:",
                error
              );

              parsedAccessories = rawAccessories;
            }
          } else {
            parsedAccessories = rawAccessories;
          }
        } else if (
          typeof rawAccessories === "string"
        ) {
          /*
           * CASE 2:
           * Accessories directly string me hain.
           *
           * Example:
           *
           * "[\"Air Conditioner\",\"Power Steering\"]"
           */

          try {
            const parsed = JSON.parse(rawAccessories);

            parsedAccessories = Array.isArray(parsed)
              ? parsed
              : [];
          } catch (error) {
            console.error(
              "Accessories String Parse Error:",
              error
            );

            parsedAccessories = [];
          }
        }

        console.log(
          "FINAL ACCESSORIES:",
          parsedAccessories
        );

        // =====================================================
        // SET VEHICLE DATA
        // =====================================================

        setVehicleData({
          vehicleTitle:
            vehicle.vehicleTitle || "",

          brand:
            vehicle.brand || "",

          vehicleOverview:
            vehicle.vehicleOverview || "",

          pricePerDay:
            vehicle.pricePerDay || "",

          fuelType:
            vehicle.fuelType || "",

          modelYear:
            vehicle.modelYear || "",

          seatingCapacity:
            vehicle.seatingCapacity || "",

          accessories:
            parsedAccessories,

          image1:
            vehicle.image1 || "",

          image2:
            vehicle.image2 || "",

          image3:
            vehicle.image3 || "",

          image4:
            vehicle.image4 || "",

          image5:
            vehicle.image5 || "",
        });

        setCurrentIndex(0);
      } catch (error) {
        console.error(
          "Vehicle Fetch Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVehicle();
    }
  }, [id]);

  // =========================================================
  // VEHICLE IMAGES
  // =========================================================

  const vehicleImages = [
    vehicleData.image1,
    vehicleData.image2,
    vehicleData.image3,
    vehicleData.image4,
    vehicleData.image5,
  ].filter(
    (img) =>
      typeof img === "string" &&
      img.trim() !== ""
  );

  // =========================================================
  // NEXT SLIDE
  // =========================================================

  const nextSlide = () => {
    if (vehicleImages.length <= 1) {
      return;
    }

    setCurrentIndex((prev) =>
      prev === vehicleImages.length - 1
        ? 0
        : prev + 1
    );
  };

  // =========================================================
  // PREVIOUS SLIDE
  // =========================================================

  const prevSlide = () => {
    if (vehicleImages.length <= 1) {
      return;
    }

    setCurrentIndex((prev) =>
      prev === 0
        ? vehicleImages.length - 1
        : prev - 1
    );
  };

  // =========================================================
  // AUTO SLIDER
  // =========================================================

  useEffect(() => {
    if (vehicleImages.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === vehicleImages.length - 1
          ? 0
          : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [vehicleImages.length]);

  // =========================================================
  // BOOKING INPUT CHANGE
  // =========================================================

  const handleBookingChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // BOOKING SUBMIT
  // =========================================================

  const handleBookingSubmit = async () => {
    const userId =
      localStorage.getItem("userId");

    console.log(
      "Stored userId:",
      userId
    );

    console.log(
      "Vehicle ID:",
      id
    );

    // =======================================================
    // LOGIN CHECK
    // =======================================================

    if (!userId) {
      alert("Please login first");
      return;
    }

    // =======================================================
    // VEHICLE ID CHECK
    // =======================================================

    if (!id) {
      alert("Vehicle ID not found");
      return;
    }

    // =======================================================
    // BRAND CHECK
    // =======================================================

    if (!vehicleData.brand) {
      alert("Vehicle brand not found");
      return;
    }

    // =======================================================
    // NAME CHECK
    // =======================================================

    if (!bookingData.name.trim()) {
      alert("Please enter your name");
      return;
    }

    // =======================================================
    // FROM DATE CHECK
    // =======================================================

    if (!bookingData.from_date) {
      alert("Please select From Date");
      return;
    }

    // =======================================================
    // TO DATE CHECK
    // =======================================================

    if (!bookingData.to_date) {
      alert("Please select To Date");
      return;
    }

    // =======================================================
    // DATE VALIDATION
    // =======================================================

    const fromDate =
      new Date(
        bookingData.from_date
      );

    const toDate =
      new Date(
        bookingData.to_date
      );

    if (toDate < fromDate) {
      alert(
        "To Date cannot be before From Date"
      );
      return;
    }

    try {
      setBookingLoading(true);

      // =====================================================
      // BOOKING PAYLOAD
      // =====================================================

      const bookingPayload = {
        brand:
          vehicleData.brand,

        from_date:
          bookingData.from_date,

        to_date:
          bookingData.to_date,

        message:
          bookingData.message.trim() ||
          "No message",

        name:
          bookingData.name.trim(),

        userId:
          userId,

        vehicleId:
          id,
      };

      console.log(
        "BOOKING PAYLOAD:",
        bookingPayload
      );

      // =====================================================
      // BOOKING API
      // =====================================================

      const res = await fetch(
        "https://carrental-kmhk.onrender.com/api/booking",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            bookingPayload
          ),
        }
      );

      const data =
        await res.json();

      console.log(
        "BOOKING RESPONSE:",
        data
      );

      // =====================================================
      // ERROR
      // =====================================================

      if (!res.ok) {
        alert(
          data.message ||
            "Booking failed"
        );

        return;
      }

      // =====================================================
      // SUCCESS
      // =====================================================

      alert(
        data.message ||
          "Booking successful!"
      );

      // =====================================================
      // RESET BOOKING FORM
      // =====================================================

      setBookingData({
        from_date: "",
        to_date: "",
        message: "",
        name: "",
      });
    } catch (error) {
      console.error(
        "Booking Error:",
        error
      );

      alert(
        "Server error. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>
          Loading...
        </h2>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="full-page">

      {/* =====================================================
          SLIDER
      ===================================================== */}

      <div className="slider">

        {vehicleImages.length > 0 ? (
          <>

            {/* BACKGROUND IMAGE */}

            <div
              className="slider-bg"
              style={{
                backgroundImage: `url(https://carrental-kmhk.onrender.com/uploads/${vehicleImages[currentIndex]})`,
              }}
            ></div>

            {/* MAIN IMAGE */}

            <img
              src={`https://carrental-kmhk.onrender.com/uploads/${vehicleImages[currentIndex]}`}
              alt={`${vehicleData.brand} ${vehicleData.vehicleTitle}`}
              className="slider-img"
            />

            {/* PREVIOUS */}

            {vehicleImages.length > 1 && (
              <button
                type="button"
                className="prev"
                onClick={prevSlide}
                aria-label="Previous image"
              >
                ❮
              </button>
            )}

            {/* NEXT */}

            {vehicleImages.length > 1 && (
              <button
                type="button"
                className="next"
                onClick={nextSlide}
                aria-label="Next image"
              >
                ❯
              </button>
            )}

            {/* DOTS */}

            {vehicleImages.length > 1 && (
              <div className="dots">

                {vehicleImages.map(
                  (_, index) => (
                    <span
                      key={index}
                      className={
                        index === currentIndex
                          ? "dot active"
                          : "dot"
                      }
                      onClick={() =>
                        setCurrentIndex(index)
                      }
                    ></span>
                  )
                )}

              </div>
            )}

          </>
        ) : (

          <div className="no-image">

            <p>
              No vehicle image available
            </p>

          </div>

        )}

      </div>

      {/* =====================================================
          TITLE + PRICE
      ===================================================== */}

      <div className="title-section">

        <div className="car-title">

          <h1>
            {vehicleData.brand}{" "}
            {vehicleData.vehicleTitle}
          </h1>

        </div>

        <div className="car-price">

          <h2>
            ₹{vehicleData.pricePerDay}
          </h2>

          <p>
            Per Day
          </p>

        </div>

      </div>

      {/* =====================================================
          MAIN SECTION
      ===================================================== */}

      <div className="main-section">

        {/* ===================================================
            LEFT SECTION
        =================================================== */}

        <div className="left-section">

          {/* VEHICLE INFO */}

          <div className="top-boxes">

            <div className="info-box">

              <h3>
                {vehicleData.modelYear}
              </h3>

              <p>
                Year
              </p>

            </div>

            <div className="info-box">

              <h3>
                {vehicleData.fuelType}
              </h3>

              <p>
                Fuel
              </p>

            </div>

            <div className="info-box">

              <h3>
                {vehicleData.seatingCapacity}
              </h3>

              <p>
                Seats
              </p>

            </div>

          </div>

          {/* =================================================
              TABS
          ================================================= */}

          <div className="tabs">

            {/* ACCESSORIES */}

            <button
              type="button"
              className={
                activeTab === "accessories"
                  ? "tab-btn active"
                  : "tab-btn"
              }
              onClick={() =>
                setActiveTab("accessories")
              }
            >
              Accessories
            </button>

            {/* OVERVIEW */}

            <button
              type="button"
              className={
                activeTab === "overview"
                  ? "tab-btn active"
                  : "tab-btn"
              }
              onClick={() =>
                setActiveTab("overview")
              }
            >
              Overview
            </button>

          </div>

          {/* =================================================
              ACCESSORIES
          ================================================= */}

          {activeTab === "accessories" && (

            <div className="accessories-box">

              <h3>
                Accessories
              </h3>

              <table>

                <tbody>

                  {accessoriesList.map(
                    (item, index) => {

                      // ======================================
                      // CHECK ACCESSORY
                      // ======================================

                      const isAvailable =
                        Array.isArray(
                          vehicleData.accessories
                        ) &&
                        vehicleData.accessories.some(
                          (accessory) =>
                            String(accessory)
                              .trim()
                              .toLowerCase() ===
                            String(item)
                              .trim()
                              .toLowerCase()
                        );

                      return (
                        <tr
                          key={index}
                        >

                          <td>
                            {item}
                          </td>

                          <td
                            className={
                              isAvailable
                                ? "yes"
                                : "no"
                            }
                          >
                            {isAvailable
                              ? "✔"
                              : "✖"}
                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>
          )}

          {/* =================================================
              OVERVIEW
          ================================================= */}

          {activeTab === "overview" && (

            <div className="accessories-box">

              <h3>
                Vehicle Overview
              </h3>

              <p>
                {vehicleData.vehicleOverview ||
                  "No overview available."}
              </p>

            </div>
          )}

        </div>

        {/* ===================================================
            RIGHT BOOKING SECTION
        =================================================== */}

        <div className="right-section">

          <div className="book-box">

            <h3>
              Book Now
            </h3>

            {/* FROM DATE */}

            <input
              type="date"
              name="from_date"
              value={
                bookingData.from_date
              }
              onChange={
                handleBookingChange
              }
            />

            {/* TO DATE */}

            <input
              type="date"
              name="to_date"
              value={
                bookingData.to_date
              }
              onChange={
                handleBookingChange
              }
            />

            {/* NAME */}

            <input
              type="text"
              name="name"
              value={
                bookingData.name
              }
              placeholder="Your Name"
              onChange={
                handleBookingChange
              }
            />

            {/* MESSAGE */}

            <textarea
              name="message"
              value={
                bookingData.message
              }
              placeholder="Message"
              onChange={
                handleBookingChange
              }
            ></textarea>

            {/* BOOK BUTTON */}

            <button
              type="button"
              onClick={
                handleBookingSubmit
              }
              disabled={
                bookingLoading
              }
            >
              {bookingLoading
                ? "Booking..."
                : "Book Now"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
