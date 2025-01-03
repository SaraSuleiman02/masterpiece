import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import Pagination from "./Pagination"; // Ensure this is correctly imported
import "./Pagination.css"; // Ensure styles are applied

function ChosenVendors({ vendors }) {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [error, setError] = useState("");
  const [updatedVendors, setUpdatedVendors] = useState(vendors);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const vendorsPerPage = 3; // Number of vendors per page
  const userId = Cookies.get("user_id");

  useEffect(() => {
    setUpdatedVendors(vendors); // Sync updatedVendors with the initial vendors prop
  }, [vendors]);

  // Toggle Modal
  const handleModalToggle = () => setShowModal(!showModal);

  // Submit Appointment
  const handleSubmit = async () => {
    if (!date || !time) {
      setError("Please fill out all fields.");
      return;
    }

    const selectedDate = new Date(date);
    if (selectedDate <= new Date()) {
      setError("Please select a date after today.");
      return;
    }

    setError(""); // Clear previous errors

    try {
      const response = await axiosInstance.post("/appointments", {
        user_id: userId, // Ensure userId is correctly passed
        date: date,
        time: time,
      });

      Swal.fire({
        icon: "success",
        title: "Booked!",
        text: "Appointment booked successfully!",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: "swal-custom-popup",
        },
      });
      setShowModal(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong!";
      console.error("Error booking:", errorMessage);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: "swal-custom-popup",
        },
      });
    }
  };

  // Generate time options (10:00 AM to 3:00 PM)
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 10; hour <= 15; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`;
      times.push(time);
    }
    return times;
  };

  // Delete Vendor
  const deleteVendor = async (vendorId) => {
    try {
      await axiosInstance.delete(`/bookings/user/${userId}`, {
        data: { vendor_id: vendorId },
      });

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Vendor deleted successfully!",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: "swal-custom-popup",
        },
      });

      // Reload the page to re-fetch the updated vendor list
      window.location.reload();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong!";
      console.error("Error deleting vendor:", errorMessage);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: "swal-custom-popup",
        },
      });
    }
  };

  // Get current vendors for the current page
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = updatedVendors.slice(
    indexOfFirstVendor,
    indexOfLastVendor
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <div className="row">
        {currentVendors.length > 0 ? (
          currentVendors.map((vendor, index) => (
            <div className="col-lg-4 mb-4" key={index}>
              <div className="card h-100">
                <div className="position-relative">
                  <img
                    src={
                      vendor.img ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxOWYPo0IThEFfM4zvvKFR-9b_so6M0DdNbA&s"
                    }
                    className="card-img-top"
                    alt={vendor.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{vendor.name}</h5>
                  <p className="card-text text-muted">{vendor.location}</p>
                  <p className="card-text">{vendor.about}</p>
                  <div className="d-flex justify-content-between">
                    <p className="card-text fw-bold mt-auto">
                      {vendor.price
                        ? `${parseInt(vendor.price)} JD`
                        : "Price not available"}
                    </p>
                    <button
                      className="btn-primary-white"
                      onClick={() => deleteVendor(vendor.id)}
                    >
                      Delete Vendor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No vendors chosen yet.</p>
        )}
      </div>

      {/* Pagination */}
      {updatedVendors.length > vendorsPerPage && (
        <Pagination
          vendorsPerPage={vendorsPerPage}
          totalVendors={updatedVendors.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}

      <div className="row">
        <div className="col-lg-12 text-center">
          <button className="btn-primary-pink" onClick={handleModalToggle}>
            Book an appointment
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleModalToggle} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book an Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form>
            <Form.Group controlId="date">
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                min={new Date().toISOString().split("T")[0]} // Minimum date is today
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="time" className="mt-3">
              <Form.Label>Select Time</Form.Label>
              <Form.Select
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                {generateTimeOptions().map((timeOption) => (
                  <option key={timeOption} value={timeOption}>
                    {timeOption}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalToggle}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChosenVendors;
