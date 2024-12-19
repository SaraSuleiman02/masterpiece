import React, { useEffect } from "react";
import WOW from "wow.js";
import "animate.css";
import "./Steps.css";

function Steps() {
  useEffect(() => {
    // Ensure WOW.js initializes after rendering
    const wow = new WOW({
      boxClass: "wow",
      animateClass: "animate__animated",
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();

    // Debug visibility
    const checkVisibility = () => {
      const wowElements = document.querySelectorAll(".wow");
      wowElements.forEach((element) => {
        console.log(
          `Element: ${element.className}, Visibility: ${getComputedStyle(
            element
          ).visibility}`
        );
      });
    };

    setTimeout(checkVisibility, 500); // Check visibility after WOW initialization
  }, []);

  return (
    <section className="section padding-small">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9 text-center wow-outer">
            <div
              className="steps-card wow animate__slideInLeft"
              style={{ animationDuration: "1s" }}
            >
              <h3 className="title-decorate offset-top-30">
                Plan your Event in 4 Steps
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

        <div className="tabs-custom tabs-horizontal tabs-modern" id="tabs-1">
          <div className="row no-gutters row-eq-height">
            <div className="col-lg-4 col-xl-3 order-lg-2 wow-outer px-0">
              <div
                className="steps-card wow animate__slideInRight"
                style={{ animationDuration: "1s" }}
              >
                <ul className="nav nav-tabs nav-tabs-modern">
                  {["STEP #1", "STEP #2", "STEP #3", "STEP #4"].map(
                    (step, index) => (
                      <li className="nav-item" role="presentation" key={index}>
                        <a
                          href={`#tabs-1-${index + 1}`}
                          className={`nav-link ${index === 0 ? "active" : ""}`}
                          data-toggle="tab"
                        >
                          {step}
                        </a>
                      </li>
                    )
                  )}
                </ul>
                <a
                  className="button button-lg button-primary button-tabs-modern"
                  href="#"
                >
                  Get Started
                </a>
              </div>
            </div>

            <div className="col-lg-8 col-xl-9 order-lg-1 wow-outer px-0">
              <div
                className="steps-card wow animate__slideInLeft eq-tabs"
                style={{ animationDuration: "1s" }}
              >
                <div className="tab-content">
                  {[...Array(4).keys()].map((index) => (
                    <div
                      className={`tab-pane fade ${
                        index === 0 ? "active show" : ""
                      }`}
                      id={`tabs-1-${index + 1}`}
                      key={index}
                    >
                      <div className="event-item-classic">
                        <div className="event-item-classic-figure">
                          <div className="tab-circle">
                            <span className="circle-number">{index + 1}</span>
                          </div>
                        </div>
                        <div className="event-item-classic-caption">
                          <h4 className="event-item-classic-title">
                            Step {index + 1}
                          </h4>
                          <p className="speaker-text">
                            Description for step {index + 1}.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;
