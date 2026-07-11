import React, { useEffect, useState } from "react";

export default function Footer() {
  const [vehicles, setVehicles] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);

 
  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:2340/api/addcardata");
      const data = await res.json();
      setVehicles(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH TESTIMONIAL
  const fetchTestimonials = async () => {
    try {
      const res = await fetch("http://localhost:2340/api/testiomonaldata");
      const data = await res.json();
      setTestimonials(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVehicles();
    fetchTestimonials();
  }, []);

  
  useEffect(() => {
    if (!hoveredCard) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => {
        const updated = { ...prev };

        const vehicle = vehicles.find(v => v._id === hoveredCard);
        if (!vehicle) return prev;

        const images = [
          vehicle.image1,
          vehicle.image2,
          vehicle.image3,
          vehicle.image4,
          vehicle.image5,
        ].filter(Boolean);

        const current = prev[hoveredCard] || 0;
        updated[hoveredCard] = (current + 1) % images.length;

        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [hoveredCard, vehicles]);

  
  useEffect(() => {
    if (!showModal || selectedImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        (prev + 1) % selectedImages.length
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [showModal, selectedImages]);

  return (
    <div className="heading">
      <h1>Find the best car For You</h1>

      {/* VEHICLES */}
      <div className="imagegee">
        {vehicles.map((v) => {
          const images = [
            v.image1,
            v.image2,
            v.image3,
            v.image4,
            v.image5,
          ].filter(Boolean);

          const currentIndex = activeImageIndex[v._id] || 0;

          const nextImage = () => {
            setActiveImageIndex((prev) => ({
              ...prev,
              [v._id]: (currentIndex + 1) % images.length,
            }));
          };

          const prevImage = () => {
            setActiveImageIndex((prev) => ({
              ...prev,
              [v._id]:
                (currentIndex - 1 + images.length) % images.length,
            }));
          };

          return (
            <div
              className="imagegeecard"
              key={v._id}
              onMouseEnter={() => setHoveredCard(v._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="imagegeeimgbox">

                <img
                  src={`http://localhost:2340/uploads/${images[currentIndex]}`}
                  alt="car"
                  onClick={() => {
                    setSelectedImages(images);
                    setCurrentSlide(currentIndex);
                    setShowModal(true);
                  }}
                />

                <button className="slider-btn left" onClick={prevImage}>◀</button>
                <button className="slider-btn right" onClick={nextImage}>▶</button>

                <div className="slider-dots">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={i === currentIndex ? "dot active" : "dot"}
                      onClick={() =>
                        setActiveImageIndex((prev) => ({
                          ...prev,
                          [v._id]: i,
                        }))
                      }
                    ></span>
                  ))}
                </div>

                <div className="imagegeeoverlay">
                  <span>🚗 {v.fuelType}</span>
                  <span>📅 {v.modelYear}</span>
                  <span>👤 {v.seatingCapacity}</span>
                </div>
              </div>

              <div className="imagegeecontent">
                <div className="imagegeetop">
                  <h4>{v.brand}, {v.vehicleTitle}</h4>
                  <p>₹{v.pricePerDay}/Day</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔥 TESTIMONIAL BACK */}
      <section className="testimonial-section">
        <div className="overlay"></div>

        <div className="testimonial-content">
          <h2 className="testimonial-title">
            Our Satisfied <span>Customers</span>
          </h2>

          <div className="testimonial-cards">
            {testimonials.map((item) => (
              <div className="testimonial-card" key={item._id}>
                <div className="icon-circle">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                    alt="customer"
                  />
                </div>

                <div className="card-content">
                  <h3>{item.name}</h3>
                  <p>{item.message}</p>
                </div>
              </div>
            ))}
          </div>
          {/* 🔥 IMAGE MODAL */}
{showModal && (
  <div
    className="modal-overlay"
    onClick={() => setShowModal(false)}
  >
    <div
      className="modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      {/* CLOSE BUTTON */}
      <span
        className="close-btn"
        onClick={() => setShowModal(false)}
      >
        ✖
      </span>

      {/* IMAGE */}
      <img
        src={`http://localhost:2340/uploads/${selectedImages[currentSlide]}`}
        alt="car"
        className="modal-image"
      />

      {/* LEFT RIGHT BUTTON */}
      <button
        className="modal-btn left"
        onClick={() =>
          setCurrentSlide(
            (currentSlide - 1 + selectedImages.length) %
              selectedImages.length
          )
        }
      >
        ◀
      </button>

      <button
        className="modal-btn right"
        onClick={() =>
          setCurrentSlide(
            (currentSlide + 1) %
              selectedImages.length
          )
        }
      >
        ▶
      </button>

      {/* DOTS */}
      <div className="modal-dots">
        {selectedImages.map((_, i) => (
          <span
            key={i}
            className={i === currentSlide ? "dot active" : "dot"}
            onClick={() => setCurrentSlide(i)}
          ></span>
        ))}
      </div>
    </div>
  </div>
)}

          <div className="dots">
            <span className="dot active"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>
    </div>
  );
}