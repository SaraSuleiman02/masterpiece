import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Vendors.css";
import VendorCategories from "./VendorCategories";
import ChosenVendors from "./ChosenVendors";
import HiredVendors from "./HiredVendors";

function VendorManager() {
  const [vendors, setVendors] = useState([]);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("categories"); // Tracks the active view
  const navigate = useNavigate();
  const userId = Cookies.get("user_id");

  const vendorIcons = {
    Venue: "bi-house",
    Catering: "bi-egg-fried",
    Florist: "bi-flower1",
    Travel: "bi-airplane",
    Decor: "bi-brush",
    Dress: "bi-shop",
  };

  useEffect(() => {
    fetchVendors();
    fetchServices();
    fetchBookings();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axiosInstance.get(`/vendors/${userId}`);
      setVendors(response.data.vendors);
      setLoading(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch vendors",
        icon: "error",
      });
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get(`/services`);
      setServices(response.data.services);
      setLoading(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch services",
        icon: "error",
      });
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get(`/bookings/user/${userId}`);
      if (response.data.bookings) {
        setBookings(response.data.bookings);
      } else {
        setBookings([]);
      }
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 429) {
        Swal.fire({
          title: "Too Many Requests!",
          text: "Please wait a moment before trying again.",
          icon: "warning",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch bookings",
          icon: "error",
        });
      }
      console.error(error);
    }
  };

  const handleCardClick = (serviceId) => {
    navigate("/vendors", { state: { serviceId } });
  };

  const handleVendorChange = (e) => {
    const { value, checked } = e.target;
    const updatedVendors = checked
      ? [...vendors, value]
      : vendors.filter((vendor) => vendor !== value);

    setVendors(updatedVendors);
  };

  const saveVendors = async () => {
    try {
      await axiosInstance.post(`/addVendors/${userId}`, { vendors });
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Vendors updated successfully",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      setShowModal(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update vendors",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  // Update chosenVendors and hiredVendors based on bookings
  const chosenVendors = bookings
    .filter((booking) => booking.status === "pending") // Filter for chosen bookings
    .flatMap((booking) => booking.vendors);
  const hiredVendors = bookings
    .filter((booking) => booking.status === "confirmed") // Filter for chosen bookings
    .flatMap((booking) => booking.vendors);

  if (loading) {
    return (
      <section className="bg-white pt-4 pb-4 vendors-needed-container">
        <div className="container d-flex justify-content-center">
          <h1 className="text-center">Loading...</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pt-4 pb-4 vendors-needed-container">
      <div className="container">
        {/* Header Section */}
        <div className="row align-items-center mb-4">
          <div className="col-md-6">
            <h2 className="mb-0">My Vendors</h2>
          </div>
        </div>

        {/* Tabs for Categories, Chosen, Hired */}
        <div className="row align-items-center mb-4">
          <div className="col-md-4">
            <p className="mb-1">
              {hiredVendors.length} of {vendors.length} Categories Hired
            </p>
            <div className="progress" style={{ height: "8px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${(hiredVendors.length / vendors.length) * 100}%`,
                }}
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <div className="btn-group mb-2 center-box">
              <button
                className={`btn ${
                  activeTab === "categories"
                    ? "btn-outline-secondary bg-white"
                    : "btn-outline-secondary bg-gray"
                }`}
                onClick={() => setActiveTab("categories")}
              >
                Categories <span className="badge">{vendors.length}</span>
              </button>
              <button
                className={`btn ${
                  activeTab === "chosen"
                    ? "btn-outline-secondary bg-white"
                    : "btn-outline-secondary bg-gray"
                }`}
                onClick={() => setActiveTab("chosen")}
              >
                <i className="bi bi-check2-square text-warning"></i> Chosen{" "}
                <span className="badge">{chosenVendors.length}</span>
              </button>
              <button
                className={`btn ${
                  activeTab === "hired"
                    ? "btn-outline-secondary bg-white"
                    : "btn-outline-secondary bg-gray"
                }`}
                onClick={() => setActiveTab("hired")}
              >
                <i className="bi bi-check-all text-success"></i> Hired{" "}
                <span className="badge">{hiredVendors.length}</span>
              </button>
            </div>
          </div>

          <div className="col-md-3 text-md-end">
            <button
              className="btn-primary-pink"
              onClick={() => setShowModal(true)}
            >
              + Add Vendor
            </button>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === "categories" && (
          <VendorCategories
            vendors={vendors}
            vendorIcons={vendorIcons}
            handleCardClick={handleCardClick}
          />
        )}
        {activeTab === "chosen" && <ChosenVendors vendors={chosenVendors} />}
        {activeTab === "hired" && <HiredVendors vendors={hiredVendors} />}
      </div>

      {/* Vendors Modal */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Vendor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Vendors</Form.Label>
              <div>
                {services.map((service) => (
                  <Form.Check
                    inline
                    key={service.id}
                    label={service.name}
                    type="checkbox"
                    value={service.name}
                    checked={vendors.includes(service.name)}
                    onChange={handleVendorChange}
                  />
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={saveVendors}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default VendorManager;
