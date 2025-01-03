import "./MyEvent.css";
import Countdown from "react-countdown";
import axiosInstance from "../../api/axiosInstance";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import img from "../../assets/imgs/landing2.jpg";
import WOW from "wow.js";
import "animate.css";

function MyEvent() {
  const [eventDate, setEventDate] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [vendors, setVendors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = Cookies.get("user_id");

  useEffect(() => {
    fetchUserProfile();
    getDate();
    fetchBookings();
    fetchVendors();
    fetchChecklist();
    fetchGuestData();
    fetchTotalCost();
  }, []);
  useEffect(() => {
    const wow = new WOW({
      boxClass: "wow",
      animateClass: "animate__animated",
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/profile/${userId}`);
      const user = response.data.user;
      user.event_type = user.event_type.split(",");
      user.phone = "0" + user.phone;
      setUserProfile(user);
      console.log(user);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        toast: true,
      });
    } finally {
      setLoading(false);
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

  const fetchChecklist = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/checklist/${userId}`);
      setTasks(response.data.checklist);
    } catch (error) {
      console.error("Error fetching checklist:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGuestData = async () => {
    try {
      const response = await axiosInstance.get(`/guestlist/${userId}`);
      const guests = response.data.guestlists;
      const updatedGuests = guests.map((guest) => ({
        ...guest,
        phone: `0${guest.phone}`,
      }));
      setGuests(updatedGuests);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const fetchTotalCost = async () => {
    try {
      const response = await axiosInstance.get(`/totalCost/${userId}`);
      setTotalCost(response.data.total_cost);
    } catch (error) {
      console.error("Error fetching total cost:", error);
    }
  };

  const hiredVendors = bookings
    .filter((booking) => booking.status === "confirmed")
    .flatMap((booking) => booking.vendors).length;

  const filteredTasks = tasks.filter((task) => task.completed).length;
  const attendingCount = guests.filter(
    (guest) => guest.attendance === "Attending"
  ).length;

  // Progress calculations
  const circumference = 2 * Math.PI * 30; // Circle radius = 30
  const vendorProgress =
    vendors.length > 0 ? (hiredVendors / vendors.length) * 100 : 0;
  const taskProgress =
    tasks.length > 0 ? (filteredTasks / tasks.length) * 100 : 0;
  const guestProgress =
    guests.length > 0 ? (attendingCount / guests.length) * 100 : 0;

  // Budget Overview Section
  const estimatedCost = parseInt(userProfile.budget);
  const finalCost = parseInt(totalCost);
  const budgetProgress = (finalCost / estimatedCost) * 100;

  return (
    <div className="my-event-container bg-gray d-flex flex-column">
      <div
        className="myevent-hero-container "
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "40px",
          borderRadius: "8px",
        }}
      >
        <div className="wow animate__fadeInDown d-flex flex-column justify-content-center align-items-center">
          <h1>
            Welcome {userProfile.name} & {userProfile.partner_name}
          </h1>
          <p>Your special day is just around the corner!</p>
          <Countdown
            date={new Date(eventDate)}
            renderer={({ days, hours, minutes, seconds }) => (
              <div className="countdown d-flex">
                <span className="countdown-item me-2 d-flex flex-column">
                  <span className="number">{days}</span> <span>days</span>
                </span>
                <span className="countdown-item me-2 d-flex flex-column">
                  <span className="number">{hours}</span>
                  <span>hrs</span>
                </span>
                <span className="countdown-item me-2 d-flex flex-column">
                  <span className="number">{minutes}</span> <span>min</span>
                </span>
              </div>
            )}
          />
        </div>
      </div>

      {/* Summary Section */}
      <div className="wedding-dashboard-container mb-4 wow animate__fadeInLeft">
        <div className="d-flex">
          {/* Services hired card */}
          <Link to="/vendorManager" className="progress-card d-flex">
            <div>
              <h5>Services hired</h5>
              <p>
                {hiredVendors} out of {vendors.length}
              </p>
            </div>
            <div className="progress-container">
              <svg className="progress-circle" viewBox="0 0 100 100">
                <circle className="progress-bg" cx="50" cy="50" r="30" />
                <circle
                  className="progress-bar"
                  cx="50"
                  cy="50"
                  r="30"
                  stroke-dasharray={circumference}
                  stroke-dashoffset={(1 - vendorProgress / 100) * circumference}
                  style={{ "--progress": `${vendorProgress}%` }}
                />
              </svg>
            </div>
          </Link>

          {/* Tasks completed card */}
          <Link to="/checklist" className="progress-card d-flex">
            <div>
              <h5>Tasks completed</h5>
              <p>
                {filteredTasks} out of {tasks.length}
              </p>
            </div>
            <div className="progress-container">
              <svg className="progress-circle" viewBox="0 0 100 100">
                <circle className="progress-bg" cx="50" cy="50" r="30" />
                <circle
                  className="progress-bar"
                  cx="50"
                  cy="50"
                  r="30"
                  stroke-dasharray={circumference}
                  stroke-dashoffset={(1 - taskProgress / 100) * circumference}
                  style={{ "--progress": `${taskProgress}%` }}
                />
              </svg>
            </div>
          </Link>

          {/* Guests attending card */}
          <Link to="/guestlist" className="progress-card d-flex">
            <div>
              <h5>Guests attending</h5>
              <p>
                {attendingCount} out of {guests.length}
              </p>
            </div>
            <div className="progress-container">
              <svg className="progress-circle" viewBox="0 0 100 100">
                <circle className="progress-bg" cx="50" cy="50" r="30" />
                <circle
                  className="progress-bar"
                  cx="50"
                  cy="50"
                  r="30"
                  stroke-dasharray={circumference}
                  stroke-dashoffset={
                    circumference - (guestProgress / 100) * circumference
                  }
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* Budget Overview Section */}
      <div className="budget-container d-flex flex-column wow animate__fadeInRight">
        <h3 className="text-center mb-4 title-decorate title-decorate-center">
          Budget
        </h3>
        <div className="budget-content d-flex justify-content-center">
          <div className="details-container d-flex flex-column">
            <div className="details d-flex">
              <i class="bi bi-piggy-bank"></i>
              <div className="budget-info ">
                <p>ESTIMATED COST</p>
                <p>{estimatedCost} JD</p>
              </div>
            </div>
            <div className="details d-flex">
              <i class="bi bi-cash"></i>
              <div className="budget-info">
                <p>FINAL COST</p>
                <p style={{ color: "green" }}>{finalCost} JD</p>
              </div>
            </div>
          </div>

          <div className="budget-progress-container">
            <svg className="budget-progress-circle" viewBox="0 0 100 100">
              <circle className="budget-progress-bg" cx="50" cy="50" r="47.7" />
              <circle
                className="budget-progress-bar"
                cx="50"
                cy="50"
                r="47.7"
                stroke-dasharray={2 * Math.PI * 47.7} // Total circumference
                stroke-dashoffset={
                  2 * Math.PI * 47.7 -
                  (Math.min(budgetProgress, 100) / 100) * 2 * Math.PI * 47.7
                }
                style={{
                  "--progress": `${Math.min(budgetProgress, 100)}%`,
                }}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyEvent;
