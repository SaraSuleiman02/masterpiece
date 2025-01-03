import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { Tilt } from "react-tilt";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import img from "../../../assets/imgs/bride_groom.png";
import "./Login.css";

// Tilt options
const defaultOptions = {
  reverse: false,
  max: 35,
  perspective: 1000,
  scale: 1.1,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Validation
  const validate = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Send login request
      const response = await axiosInstance.post("/login", formData);
      setServerMessage(response.data.message);

      // Check if login was successful or failed
      if (response.data.token && response.data.user) {
        // Successful login, store token and user info in cookies
        Cookies.set("authToken", response.data.token, { expires: 2 });
        Cookies.set("user_id", response.data.user.id, { expires: 2 });
        Cookies.set("user_name", response.data.user.name, { expires: 2 });
        Cookies.set("user_email", response.data.user.email, { expires: 2 });
        Cookies.set("event_date", response.data.user.event_date, {
          expires: 2,
        });
        
        navigate("/myevent");
      } else {
        // If no token or user info, treat as failure
        throw new Error(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      // Handle server-side or other errors
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";

      // Show error message using SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        html: errorMessage, // Display error message from server or thrown error
      });

      // Set error state to display server message and errors
      const serverErrors = error.response?.data?.errors || {};
      setErrors(serverErrors);
      setServerMessage(errorMessage);
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <Tilt className="login100-pic js-tilt" options={defaultOptions}>
            <img src={img} alt="Bride and Groom" />
          </Tilt>

          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title">Login</span>

            <div className="wrap-input100">
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="bi bi-envelope"></i>
              </span>
            </div>

            <div className="wrap-input100">
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="bi bi-lock"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">
                Login
              </button>
            </div>

            <div className="text-center p-t-136">
              <Link className="txt2" to="/register">
                Create your Account
                <i
                  className="fa fa-long-arrow-right m-l-5"
                  aria-hidden="true"
                ></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
