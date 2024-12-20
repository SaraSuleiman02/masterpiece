import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import "./Register.css";
import logo from "../../../assets/imgs/logo-dark.png";
import step1Img from "../../../assets/imgs/step1.png";
import step2Img from "../../../assets/imgs/step2.png";
import step3Img from "../../../assets/imgs/event.jpg";
import step4Img from "../../../assets/imgs/step4.jpg";

function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    dob: "",
    partner_name: "",
    event_type: "",
    event_date: "",
    budget: "",
    city: "",
    vendors_needed: "",
  });
  const totalSteps = 4;

  // Images for each step
  const stepImages = [step1Img, step2Img, step3Img, step4Img];

  const navigate = useNavigate();

  // Calculate the progress percentage
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Validate the current step
  const validateStep = () => {
    if (currentStep === 1 && !formData.email) return "Email is required!";
    if (currentStep === 1 && !formData.password) return "Password is required!";
    if (currentStep === 1 && !formData.password_confirmation) return "Password Confirmation is required!";
    if (currentStep === 1 && !formData.phone) return "Phone is required!";
    if (currentStep === 1 && !formData.dob) return "DOB is required!";
    if (currentStep === 2 && !formData.name) return "Name is required!";
    if (currentStep === 2 && !formData.partner_name) return "Partner Name is required!";
    if (currentStep === 3 && !formData.event_type) return "Event Type is required!";
    if (currentStep === 3 && !formData.event_date) return "Event Date is required!";
    if (currentStep === 3 && !formData.budget) return "Budget is required!";
    if (currentStep === 3 && !formData.city) return "City is required!";
    return null;
  };

  // Handle the Next button click
  const handleNext = () => {
    const error = validateStep();
    if (error) {
      alert(error);
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Handle the Previous button click
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Handle final submission
  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/register", formData);
      navigate("/success");
    } catch (error) {
      console.error(error);
      alert("Registration failed!");
    }
  };

  // Render the current step component
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step3 formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step4 formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="register-container padding-xsmall px-5">
      <img src={logo} className="logo-img" alt="Logo" />

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Register Content */}
      <div className="register-content row">
        <div className="info-container col-md-6">{renderStep()}</div>
        <div className="info-img col-md-6">
          <img src={stepImages[currentStep - 1]} alt={`Step ${currentStep}`} />
        </div>
      </div>

      {/* Buttons */}
      <div className="register-btns">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="home-btn"
        >
          Previous
        </button>
        {currentStep === 4 ? (
          <button onClick={handleSubmit} className="cta-button">
            Register!
          </button>
        ) : (
          <button onClick={handleNext} className="cta-button">
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Register;