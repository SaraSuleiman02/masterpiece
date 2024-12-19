import React, { useState, useEffect } from "react";
import WOW from "wow.js";
import "animate.css";
import "./Steps.css";

const StepsSec = () => {
  const [activeTab, setActiveTab] = useState("step1");

  useEffect(() => {
    // Initialize WOW.js
    const wow = new WOW({
      boxClass: "wow",
      animateClass: "animate__animated",
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();
  }, []);

  return (
    <section className="section padding-small">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9 text-center wow-outer">
            <div className="steps-card wow animate__slideInLeft">
              <h3 className="title-decorate offset-top-30">
                Plan Your Event in 4 Steps
              </h3>
              <p>
                Planning your event is not complex at all if you decide to trust
                us with this matter.
                <br />
                This short guide will help you find out more about our services.
              </p>
            </div>
          </div>
        </div>

        <div className="tabs-custom tabs-horizontal tabs-modern">
          <div className="row no-gutters row-eq-height">
            {/* Tabs Navigation */}
            <div className="col-lg-4 col-xl-3 order-lg-2 wow-outer px-0">
              <div className="steps-card wow animate__slideInRight">
                <ul className="nav nav-tabs nav-tabs-modern">
                  {["step1", "step2", "step3", "step4"].map((step, index) => (
                    <li className="nav-item" key={step}>
                      <button
                        className={`nav-link ${
                          activeTab === step ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(step)}
                      >
                        STEP #{index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
                <a
                  className="button button-lg button-primary button-tabs-modern"
                  href="#"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Tabs Content */}
            <div className="col-lg-8 col-xl-9 order-lg-1 wow-outer px-0">
              <div className="steps-card wow animate__slideInLeft eq-tabs">
                <div className="tab-content">
                  {activeTab === "step1" && (
                    <div className="tab-pane fade active show">
                      <StepContent
                        stepNumber="01"
                        title="Sign Up and Set Your Profile"
                        linkText="Entering data"
                        subtitle="Information about you & event details"
                        description="Add your information and your event profile. Enter basic details like what type is your event, location, date, and budget."
                      />
                    </div>
                  )}
                  {activeTab === "step2" && (
                    <div className="tab-pane fade">
                      <StepContent
                        stepNumber="02"
                        title="Choose Vendors"
                        linkText="Vendors Selection"
                        subtitle="Picking restaurants/hotels or any other vendor"
                        description="The second step is to select the vendors categories that you still need for your event and specify the budget for each one of them."
                      />
                    </div>
                  )}
                  {activeTab === "step3" && (
                    <div className="tab-pane fade">
                      <StepContent
                        stepNumber="03"
                        title="Select the Options for Your Event"
                        linkText="Pick Vendors & Additional Services"
                        subtitle="Browsing vendors & services catalog"
                        description="Choosing vendors is always a tricky and responsible step, whether it means selecting proper florist services or considering various cake designs. We will help you make the right choice based on your preferences and budget."
                      />
                    </div>
                  )}
                  {activeTab === "step4" && (
                    <div className="tab-pane fade">
                      <StepContent
                        stepNumber="04"
                        title="Confirmation"
                        linkText="Confirm All Details"
                        subtitle="Event plan overview"
                        description="Book a one-on-one appointment at our office to finalize your event details. We'll help you secure your chosen vendors, create a timeline with your service providers, and schedule any necessary appointments."
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Step Content Component
const StepContent = ({
  stepNumber,
  title,
  linkText,
  subtitle,
  description,
}) => (
  <div className="event-item-classic">
    <div className="event-item-classic-figure">
      <div className="tab-circle">
        <span className="circle-nubmer">{stepNumber}</span>
      </div>
    </div>
    <div className="event-item-classic-caption">
      <p className="events-time">{title}</p>
      <h4 className="event-item-classic-title">
        <a href="#">{linkText}</a>
      </h4>
      <h5 className="event-item-classic-subtitle">
        <span>Includes:</span> <a href="#">{subtitle}</a>
      </h5>
      <p className="speaker-text">{description}</p>
    </div>
  </div>
);

export default StepsSec;
