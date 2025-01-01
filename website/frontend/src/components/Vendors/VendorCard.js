import "./Vendors.css";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function VendorCard(
  { vendor, eventDate: initialEventDate },
  isFavoriteInitial,
  onRemoveFromWishlist
) {
  const [eventDate, setEventDate] = useState(initialEventDate);
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);
  const navigate = useNavigate();
  const img = vendor.img;
  const userId = Cookies.get("user_id");
  const price = parseInt(vendor.price, 10);

  useEffect(() => {
    isInWishlist();
    console.log(initialEventDate);
  }, []);

  const isInWishlist = async () => {
    if (!userId) {
      return false;
    }

    try {
      const response = await axiosInstance.get("/wishlist/isInWishlist", {
        params: {
          user_id: userId,
          vendor_id: vendor.id,
        },
      });
      const isInWishlist = response.data.isFavorite;
      setIsFavorite(isInWishlist);
    } catch (e) {
      console.error("Error checking if in wishlist:", e);
    }
  };

  const toggleFavorite = async () => {
    const userId = Cookies.get("user_id");
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
        vendor_id: vendor.id,
        user_id: userId,
      });

      if (
        (response.status === 200 && response.data) ||
        (response.status === 201 && response.data)
      ) {
        const newFavoriteState = response.data.isFavorite;
        setIsFavorite(newFavoriteState);

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

        if (!newFavoriteState && onRemoveFromWishlist) {
          onRemoveFromWishlist(vendor.id);
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

  const handleBooking = async () => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Must Login",
        text: "Please log in to book a venue.",
      }).then(() => navigate("/login"));
      return;
    }

    console.log({
      user_id: userId,
      vendor_id: vendor.id,
      event_date: eventDate,
      status: "pending",
    });

    try {
      const response = await axiosInstance.post("book", {
        user_id: userId,
        vendor_id: vendor.id,
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
    <div className="row">
      <div className="col-lg-12 mb-4 d-flex">
        <div className="vendor-card d-flex">
          <div className="position-relative vendor-card-img">
            <div className="heart-button-wrapper">
              <button
                type="button"
                className={`btn btn-link p-0 ${
                  isFavorite ? "text-danger" : "text-muted"
                } p-1 border rounded shadow-lg bg-white bg-opacity-75`}
                onClick={toggleFavorite}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <i
                  className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}
                ></i>
              </button>
            </div>
            <img src={img} className="card-img-top" alt="Vendor" />
          </div>
          <div className="vendor-card-body d-flex flex-column">
            <h5>{vendor.name}</h5>
            <p className="text-muted"> {vendor.location} </p>
            <p className="card-text">{vendor.about}</p>
            <div className="vendor-card-footer d-flex justify-content-between">
              <span className="text-muted mr-2">
                <i className="bi bi-cash"></i> {price} JD
              </span>
              <button className="btn-primary-pink" onClick={handleBooking}>
                Choose Vendor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorCard;
