
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

  // =========================================================
  // FETCH VEHICLE DATA
  // =========================================================

  useEffect(() => {
    async function fetchVehicle() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://carrental-kmhk.onrender.com/api/caradd/${id}`
        );

        const data = await res.json();

        console.log("EDIT VEHICLE RESPONSE:", data);

        if (!res.ok) {
          throw new Error(
            data.message || "Vehicle not found"
          );
        }

        const vehicle =
          data.user ||
          data.vehicle ||
          data.data ||
          data;

        console.log(
          "EDIT VEHICLE DATA:",
          vehicle
        );

        // =====================================================
        // ACCESSORIES
        // =====================================================

        let parsedAccessories = [];

        if (Array.isArray(vehicle.accessories)) {
          parsedAccessories = vehicle.accessories;
        } else if (
          typeof vehicle.accessories === "string"
        ) {
          try {
            const parsed = JSON.parse(
              vehicle.accessories
            );

            parsedAccessories = Array.isArray(parsed)
              ? parsed
              : [];
          } catch (error) {
            console.log(
              "Accessories parse error:",
              error
            );

            parsedAccessories = [];
          }
        }

        // =====================================================
        // FORM DATA
        // =====================================================

        setFormData({
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
        });

        // =====================================================
        // CLOUDINARY IMAGE PREVIEW
        // =====================================================
        // IMPORTANT:
        // Cloudinary URL already complete hota hai.
        // /uploads/ add nahi karna hai.

        setPreviewImages({
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

      } catch (error) {
        console.log(
          "Fetch error:",
          error
        );

        alert(
          "Vehicle load failed ❌"
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchVehicle();
    }
  }, [id]);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // CHECKBOX CHANGE
  // =========================================================

  const handleAccessoryChange = (item) => {
    setFormData((prev) => {

      const alreadySelected =
        prev.accessories.includes(item);

      if (alreadySelected) {
        return {
          ...prev,
          accessories:
            prev.accessories.filter(
              (acc) => acc !== item
            ),
        };
      }

      return {
        ...prev,
        accessories: [
          ...prev.accessories,
          item,
        ],
      };
    });
  };

  // =========================================================
  // IMAGE CHANGE
  // =========================================================

  const handleImageChange = (e) => {
    const {
      name,
      files,
    } = e.target;

    if (!files || !files[0]) {
      return;
    }

    const selectedFile = files[0];

    // Store selected file
    setImages((prev) => ({
      ...prev,
      [name]: selectedFile,
    }));

    // Create local preview
    const previewUrl =
      URL.createObjectURL(
        selectedFile
      );

    setPreviewImages((prev) => ({
      ...prev,
      [name]: previewUrl,
    }));
  };

  // =========================================================
  // SUBMIT UPDATE
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      // =====================================================
      // TEXT DATA
      // =====================================================

      form.append(
        "vehicleTitle",
        formData.vehicleTitle
      );

      form.append(
        "brand",
        formData.brand
      );

      form.append(
        "vehicleOverview",
        formData.vehicleOverview
      );

      form.append(
        "pricePerDay",
        formData.pricePerDay
      );

      form.append(
        "fuelType",
        formData.fuelType
      );

      form.append(
        "modelYear",
        formData.modelYear
      );

      form.append(
        "seatingCapacity",
        formData.seatingCapacity
      );

      form.append(
        "accessories",
        JSON.stringify(
          formData.accessories
        )
      );

      // =====================================================
      // NEW IMAGES ONLY
      // =====================================================

      Object.keys(images).forEach(
        (key) => {
          if (images[key]) {
            form.append(
              key,
              images[key]
            );
          }
        }
      );

      console.log(
        "Updating vehicle..."
      );

      const res = await fetch(
        `https://carrental-kmhk.onrender.com/api/carupdate/${id}`,
        {
          method: "PUT",
          body: form,
        }
      );

      const data =
        await res.json();

      console.log(
        "UPDATE RESPONSE:",
        data
      );

      if (!res.ok) {
        throw new Error(
          data.message ||
            "Update failed"
        );
      }

      alert(
        "Vehicle updated successfully ✅"
      );

      navigate("/cardata");

    } catch (error) {

      console.log(
        "Update error:",
        error
      );

      alert(
        error.message ||
          "Vehicle update failed ❌"
      );
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </h2>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="av-wrapper">

      <div className="av-container">

        <h2 className="av-title">
          Edit Vehicle
        </h2>

        <form
          className="av-form"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              TITLE
          ================================================= */}

          <div className="av-group">

            <label>
              Vehicle Title
            </label>

            <input
              type="text"
              name="vehicleTitle"
              value={
                formData.vehicleTitle
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="av-group">

            <label>
              Brand
            </label>

            <input
              type="text"
              name="brand"
              value={
                formData.brand
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          {/* =================================================
              OVERVIEW
          ================================================= */}

          <div className="av-group">

            <label>
              Vehicle Overview
            </label>

            <textarea
              name="vehicleOverview"
              value={
                formData.vehicleOverview
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          {/* =================================================
              PRICE
          ================================================= */}

          <div className="av-group">

            <label>
              Price Per Day
            </label>

            <input
              type="number"
              name="pricePerDay"
              value={
                formData.pricePerDay
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          {/* =================================================
              FUEL TYPE
          ================================================= */}

          <div className="av-group">

            <label>
              Fuel Type
            </label>

            <select
              name="fuelType"
              value={
                formData.fuelType
              }
              onChange={
                handleChange
              }
              required
            >

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

          </div>

          {/* =================================================
              MODEL YEAR
          ================================================= */}

          <div className="av-group">

            <label>
              Model Year
            </label>

            <input
              type="number"
              name="modelYear"
              value={
                formData.modelYear
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          {/* =================================================
              SEATING
          ================================================= */}

          <div className="av-group">

            <label>
              Seating Capacity
            </label>

            <input
              type="number"
              name="seatingCapacity"
              value={
                formData.seatingCapacity
              }
              onChange={
                handleChange
              }
              required
            />

          </div>

          {/* =================================================
              ACCESSORIES
          ================================================= */}

          <div className="av-group">

            <label>
              Accessories
            </label>

            <div className="av-accessories">

              {accessoryOptions.map(
                (item, index) => (

                  <label
                    key={index}
                    className="av-checkbox"
                  >

                    <input
                      type="checkbox"
                      checked={formData.accessories.includes(
                        item
                      )}
                      onChange={() =>
                        handleAccessoryChange(
                          item
                        )
                      }
                    />

                    {item}

                  </label>

                )
              )}

            </div>

          </div>

          {/* =================================================
              IMAGES
          ================================================= */}

          <div className="av-group">

            <label>
              Vehicle Images
            </label>

            <div className="av-image-grid">

              {[
                "image1",
                "image2",
                "image3",
                "image4",
                "image5",
              ].map(
                (img, index) => (

                  <div
                    key={index}
                    className="av-image-box"
                  >

                    <input
                      type="file"
                      name={img}
                      accept="image/*"
                      onChange={
                        handleImageChange
                      }
                    />

                    {previewImages[img] && (

                      <img
                        src={
                          previewImages[img]
                        }
                        alt={img}
                        className="av-preview"
                        onError={(e) => {
                          console.error(
                            "Image failed:",
                            previewImages[img]
                          );

                          e.target.style.display =
                            "none";
                        }}
                      />

                    )}

                  </div>

                )
              )}

            </div>

          </div>

          {/* =================================================
              UPDATE BUTTON
          ================================================= */}

          <button
            type="submit"
            className="av-btn"
          >
            Update Vehicle
          </button>

        </form>

      </div>

    </div>
  );
}
