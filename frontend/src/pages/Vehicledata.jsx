import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../css/Vehicledata.css";

export default function Vehicledata() {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:2340/api/addcardata");
      const data = await res.json();
      setVehicles(data.data || []);
    } catch (error) {
      console.log("Error fetching vehicle data:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:2340/api/deletecar/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert("Vehicle deleted successfully");
        fetchVehicles();
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.log("Delete error:", error);
      alert("Something went wrong while deleting");
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="fri-vehicledata-container">
      <h2 className="fri-vehicledata-title">Vehicle List</h2>

      <div className="fri-vehicledata-table-wrapper">
        <table className="fri-vehicledata-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Overview</th>
              <th>Price/Day</th>
              <th>Fuel</th>
              <th>Model Year</th>
              <th>Seats</th>
              <th>Accessories</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((v, index) => (
                <tr key={v._id}>
                  <td>{index + 1}</td>
                  <td>{v.vehicleTitle}</td>
                  <td>{v.brand}</td>
                  <td className="fri-overview-cell">{v.vehicleOverview}</td>
                  <td>₹{v.pricePerDay}</td>
                  <td>{v.fuelType}</td>
                  <td>{v.modelYear}</td>
                  <td>{v.seatingCapacity}</td>
                  <td>
                    {Array.isArray(v.accessories)
                      ? v.accessories.join(", ")
                      : "N/A"}
                  </td>
                  <td>
                    {v.createdAt
                      ? new Date(v.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <div className="fri-action-btns">
                      <Link to={`/edit/${v._id}`} className="fri-icon-btn fri-edit-btn">
                        <FaEdit />
                      </Link>

                      <button
                        className="fri-icon-btn fri-delete-btn"
                        onClick={() => handleDelete(v._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="fri-no-data">
                  No vehicles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}