import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import WOW from "wow.js";
import "animate.css";
import "./Wishlist.css";

function Wishlist({ onRemoveFromWishlist, isFavoriteInitial }) {
  const [vendors, setVendors] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [eventDate, setEventDate] = useState("");
  const userId = Cookies.get("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const userId = Cookies.get("user_id");
        if (!userId) {
          Swal.fire("Error", "User not logged in.", "error");
          return;
        }

        const response = await axiosInstance.get("/wishlist", {
          params: { user_id: userId },
        });

        const vendorsFromResponse = response.data.wishlists.flatMap(
          (wishlist) => wishlist.vendors
        );

        // Initialize favorites state
        const initialFavorites = {};
        vendorsFromResponse.forEach((vendor) => {
          initialFavorites[vendor.id] = vendor.isFavorite || false;
        });

        setVendors(vendorsFromResponse);
        setFavorites(initialFavorites);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        Swal.fire("Error", "Failed to fetch wishlist.", "error");
      }
    };

    const wow = new WOW({
      boxClass: "wow",
      animateClass: "animate__animated",
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();

    fetchWishlist();
    getDate();
  }, []);

  const toggleFavorite = async (vendorId) => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Must Login",
        text: "Please log in to add to favorites.",
      }).then(() => navigate("/login"));
      return;
    }

    try {
      const response = await axiosInstance.post("/wishlist/toggle", {
        vendor_id: vendorId,
        user_id: userId,
      });

      if (
        (response.status === 200 && response.data) ||
        (response.status === 201 && response.data)
      ) {
        const newFavoriteState = response.data.isFavorite;
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          [vendorId]: newFavoriteState,
        }));

        Swal.fire({
          icon: "success",
          title: newFavoriteState
            ? "Added to Favorites"
            : "Removed from Favorites",
          text: response.data.message || "Operation successful",
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        if (!newFavoriteState) {
          // Remove the vendor from the vendors list
          setVendors((prevVendors) =>
            prevVendors.filter((vendor) => vendor.id !== vendorId)
          );
        }
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.error("Error toggling favorite:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };
  const getDate = async () => {
    try {
      const response = await axiosInstance.get(`/eventDate/${userId}`);
      const date = response.data.date;
      setEventDate(date);
    } catch (e) {
      console.error("Error getting event date:", e);
    }
  };

  const handleBooking = async (vendorId) => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Must Login",
        text: "Please log in to book a venue.",
      }).then(() => navigate("/login"));
      return;
    }

    try {
      const response = await axiosInstance.post("book", {
        user_id: userId,
        vendor_id: vendorId,
        event_date: eventDate,
        status: "pending",
      });
      Swal.fire({
        icon: "success",
        title: "Chosen!",
        text: "This vendor has been chosen!",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      toggleFavorite(vendorId);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      console.error("Error booking:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="container mt-5 mb-5 d-flex flex-column">
      <h1 className="wishlist-header wow animate__fadeInLeft">Wishlist</h1>
      <div className="row mt-4  wow animate__fadeInRight">
        {vendors.length > 0 ? (
          vendors.map((vendor) => (
            <div className="col-lg-4 mb-4" key={vendor.id}>
              <div className="card h-100">
                <div className="position-relative">
                  <div className="heart-button-wrapper">
                    <button
                      type="button"
                      className={`btn btn-link p-0 text-danger p-1 border rounded shadow-lg bg-white bg-opacity-75`}
                      onClick={() => toggleFavorite(vendor.id)}
                      aria-label={
                        favorites[vendor.id]
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      <i className={"bi bi-heart-fill"}></i>
                    </button>
                  </div>
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
                <div className="wishlist-card-body">
                  <h5 className="card-title">{vendor.name}</h5>
                  <p className="card-text text-muted">{vendor.location}</p>
                  <p className="card-text">{vendor.about}</p>
                  <p className="card-text fw-bold mt-auto">
                    {vendor.price
                      ? `${parseInt(vendor.price)} JD`
                      : "Price not available"}
                  </p>
                  <button className="btn-primary-pink" onClick={() => handleBooking(vendor.id)}>Choose Vendor</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No vendors chosen yet.</p>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
