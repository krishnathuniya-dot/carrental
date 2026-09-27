
import React, { useEffect, useState } from "react";

export default function Footer() {
  const [vehicles, setVehicles] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const [selectedImages, setSelectedImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // =========================================================
  // FETCH VEHICLES
  // =========================================================

  const fetchVehicles = async () => {
    try {
      const res = await fetch(
        "https://carrental-kmhk.onrender.com/api/addcardata"
      );

      const data = await res.json();

      console.log("VEHICLES RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch vehicles");
      }

      setVehicles(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("FETCH VEHICLES ERROR:", error);
      setVehicles([]);
    }
  };

  // =========================================================
  // FETCH TESTIMONIALS
  // =========================================================

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(
        "https://carrental-kmhk.onrender.com/api/testiomonaldata"
      );

      const data = await res.json();

      console.log("TESTIMONIAL RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch testimonials");
      }

      setTestimonials(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("FETCH TESTIMONIAL ERROR:", error);
      setTestimonials([]);
    }
  };

  // =========================================================
  // INITIAL FETCH
  // =========================================================

  useEffect(() => {
    fetchVehicles();
    fetchTestimonials();
  }, []);

  // =========================================================
  // HOVER AUTO SLIDER
  // =========================================================

  useEffect(() => {
    if (!hoveredCard) {
      return;
    }

    const vehicle = vehicles.find(
      (v) => v._id === hoveredCard
    );

    if (!vehicle) {
      return;
    }

    const images = [
      vehicle.image1,
      vehicle.image2,
      vehicle.image3,
      vehicle.image4,
      vehicle.image5,
    ].filter(
      (img) =>
        typeof img === "string" &&
        img.trim() !== ""
    );

    if (images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => {
        const current = prev[hoveredCard] || 0;

        return {
          ...prev,
          [hoveredCard]:
            (current + 1) % images.length,
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [hoveredCard, vehicles]);

  // =========================================================
  // MODAL AUTO SLIDER
  // =========================================================

  useEffect(() => {
    if (
      !showModal ||
      selectedImages.length <= 1
    ) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) =>
          (prev + 1) %
          selectedImages.length
      );
    }, 2500);

    return () =>
      clearInterval(interval);
  }, [showModal, selectedImages]);

  // =========================================================
  // NEXT IMAGE
  // =========================================================

  const nextImage = (
    vehicleId,
    imagesLength,
    currentIndex
  ) => {
    if (imagesLength <= 1) {
      return;
    }

    setActiveImageIndex((prev) => ({
      ...prev,
      [vehicleId]:
        (currentIndex + 1) %
        imagesLength,
    }));
  };

  // =========================================================
  // PREVIOUS IMAGE
  // =========================================================

  const prevImage = (
    vehicleId,
    imagesLength,
    currentIndex
  ) => {
    if (imagesLength <= 1) {
      return;
    }

    setActiveImageIndex((prev) => ({
      ...prev,
      [vehicleId]:
        (currentIndex -
          1 +
          imagesLength) %
        imagesLength,
    }));
  };

  // =========================================================
  // OPEN MODAL
  // =========================================================

  const openImageModal = (
    images,
    index
  ) => {
    if (!images.length) {
      return;
    }

    setSelectedImages(images);
    setCurrentSlide(index);
    setShowModal(true);
  };

  // =========================================================
  // CLOSE MODAL
  // =========================================================

  const closeModal = () => {
    setShowModal(false);
    setSelectedImages([]);
    setCurrentSlide(0);
  };

  // =========================================================
  // MODAL PREVIOUS
  // =========================================================

  const modalPrev = () => {
    if (selectedImages.length <= 1) {
      return;
    }

    setCurrentSlide(
      (prev) =>
        (prev -
          1 +
          selectedImages.length) %
        selectedImages.length
    );
  };

  // =========================================================
  // MODAL NEXT
  // =========================================================

  const modalNext = () => {
    if (selectedImages.length <= 1) {
      return;
    }

    setCurrentSlide(
      (prev) =>
        (prev + 1) %
        selectedImages.length
    );
  };

  return (
    <div className="heading">

      {/* =====================================================
          PAGE TITLE
      ===================================================== */}

      <h1>
        Find the best car For You
      </h1>

      {/* =====================================================
          VEHICLES
      ===================================================== */}

      <div className="imagegee">

        {vehicles.length > 0 ? (

          vehicles.map((v) => {

            // =================================================
            // VEHICLE IMAGES
            // =================================================

            const images = [
              v.image1,
              v.image2,
              v.image3,
              v.image4,
              v.image5,
            ].filter(
              (img) =>
                typeof img === "string" &&
                img.trim() !== ""
            );

            // =================================================
            // CURRENT IMAGE
            // =================================================

            const currentIndex =
              activeImageIndex[v._id] || 0;

            return (

              <div
                className="imagegeecard"
                key={v._id}
                onMouseEnter={() =>
                  setHoveredCard(v._id)
                }
                onMouseLeave={() =>
                  setHoveredCard(null)
                }
              >

                {/* ===========================================
                    IMAGE BOX
                =========================================== */}

                <div className="imagegeeimgbox">

                  {images.length > 0 ? (

                    <>

                      {/* =====================================
                          CLOUDINARY IMAGE
                          IMPORTANT:
                          NO /uploads/ HERE
                      ===================================== */}

                      <img
                        src={
                          images[currentIndex]
                        }
                        alt={`${v.brand || ""} ${
                          v.vehicleTitle || "car"
                        }`}
                        onClick={() =>
                          openImageModal(
                            images,
                            currentIndex
                          )
                        }
                        onError={(e) => {
                          console.error(
                            "CLOUDINARY IMAGE FAILED:",
                            images[currentIndex]
                          );

                          e.currentTarget.style.display =
                            "none";
                        }}
                      />

                      {/* =====================================
                          PREVIOUS BUTTON
                      ===================================== */}

                      {images.length > 1 && (

                        <button
                          type="button"
                          className="slider-btn left"
                          onClick={(e) => {
                            e.stopPropagation();

                            prevImage(
                              v._id,
                              images.length,
                              currentIndex
                            );
                          }}
                        >
                          ◀
                        </button>

                      )}

                      {/* =====================================
                          NEXT BUTTON
                      ===================================== */}

                      {images.length > 1 && (

                        <button
                          type="button"
                          className="slider-btn right"
                          onClick={(e) => {
                            e.stopPropagation();

                            nextImage(
                              v._id,
                              images.length,
                              currentIndex
                            );
                          }}
                        >
                          ▶
                        </button>

                      )}

                      {/* =====================================
                          DOTS
                      ===================================== */}

                      {images.length > 1 && (

                        <div className="slider-dots">

                          {images.map(
                            (_, i) => (

                              <span
                                key={i}
                                className={
                                  i ===
                                  currentIndex
                                    ? "dot active"
                                    : "dot"
                                }
                                onClick={(e) => {
                                  e.stopPropagation();

                                  setActiveImageIndex(
                                    (prev) => ({
                                      ...prev,
                                      [v._id]: i,
                                    })
                                  );
                                }}
                              ></span>

                            )
                          )}

                        </div>

                      )}

                      {/* =====================================
                          IMAGE OVERLAY
                      ===================================== */}

                      <div className="imagegeeoverlay">

                        <span>
                          🚗{" "}
                          {v.fuelType ||
                            "N/A"}
                        </span>

                        <span>
                          📅{" "}
                          {v.modelYear ||
                            "N/A"}
                        </span>

                        <span>
                          👤{" "}
                          {v.seatingCapacity ||
                            "N/A"}
                        </span>

                      </div>

                    </>

                  ) : (

                    <div className="no-image">

                      <p>
                        No vehicle image
                        available
                      </p>

                    </div>

                  )}

                </div>

                {/* =========================================
                    VEHICLE CONTENT
                ========================================= */}

                <div className="imagegeecontent">

                  <div className="imagegeetop">

                    <h4>
                      {v.brand},{" "}
                      {v.vehicleTitle}
                    </h4>

                    <p>
                      ₹{v.pricePerDay}/Day
                    </p>

                  </div>

                </div>

              </div>

            );
          })

        ) : (

          <div className="no-vehicles">

            <p>
              No vehicles available.
            </p>

          </div>

        )}

      </div>

      {/* =====================================================
          TESTIMONIAL SECTION
      ===================================================== */}

      <section className="testimonial-section">

        <div className="overlay"></div>

        <div className="testimonial-content">

          <h2 className="testimonial-title">
            Our Satisfied{" "}
            <span>Customers</span>
          </h2>

          <div className="testimonial-cards">

            {testimonials.length > 0 ? (

              testimonials.map((item) => (

                <div
                  className="testimonial-card"
                  key={item._id}
                >

                  <div className="icon-circle">

                    <img
                      src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                      alt="customer"
                    />

                  </div>

                  <div className="card-content">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      {item.message}
                    </p>

                  </div>

                </div>

              ))

            ) : (

              <p>
                No testimonials
                available.
              </p>

            )}

          </div>

          {/* =================================================
              IMAGE MODAL
          ================================================= */}

          {showModal &&
            selectedImages.length > 0 && (

              <div
                className="modal-overlay"
                onClick={closeModal}
              >

                <div
                  className="modal-content"
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >

                  {/* =========================================
                      CLOSE BUTTON
                  ========================================= */}

                  <button
                    type="button"
                    className="close-btn"
                    onClick={closeModal}
                    aria-label="Close"
                  >
                    ✖
                  </button>

                  {/* =========================================
                      MODAL IMAGE
                      DIRECT CLOUDINARY URL
                  ========================================= */}

                  <img
                    src={
                      selectedImages[
                        currentSlide
                      ]
                    }
                    alt="car"
                    className="modal-image"
                    onError={(e) => {
                      console.error(
                        "CLOUDINARY MODAL IMAGE FAILED:",
                        selectedImages[
                          currentSlide
                        ]
                      );
                    }}
                  />

                  {/* =========================================
                      MODAL PREVIOUS
                  ========================================= */}

                  {selectedImages.length >
                    1 && (

                    <button
                      type="button"
                      className="modal-btn left"
                      onClick={modalPrev}
                    >
                      ◀
                    </button>

                  )}

                  {/* =========================================
                      MODAL NEXT
                  ========================================= */}

                  {selectedImages.length >
                    1 && (

                    <button
                      type="button"
                      className="modal-btn right"
                      onClick={modalNext}
                    >
                      ▶
                    </button>

                  )}

                  {/* =========================================
                      MODAL DOTS
                  ========================================= */}

                  {selectedImages.length >
                    1 && (

                    <div className="modal-dots">

                      {selectedImages.map(
                        (_, i) => (

                          <span
                            key={i}
                            className={
                              i ===
                              currentSlide
                                ? "dot active"
                                : "dot"
                            }
                            onClick={() =>
                              setCurrentSlide(
                                i
                              )
                            }
                          ></span>

                        )
                      )}

                    </div>

                  )}

                </div>

              </div>

            )}

          {/* =================================================
              BOTTOM DOTS
          ================================================= */}

          <div className="dots">

            <span className="dot active"></span>

            <span className="dot"></span>

          </div>

        </div>

      </section>

    </div>
  );
}
