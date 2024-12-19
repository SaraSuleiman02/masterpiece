import React, { useEffect } from "react";
import WOW from "wow.js";
import "animate.css";
import "./WhatWeOffer.css";
import img1 from '../../../assets/imgs/service-1.jpg';
import img2 from '../../../assets/imgs/service-2.jpg';
import img3 from '../../../assets/imgs/service-3.jpg';
import img4 from '../../../assets/imgs/service-4.jpg';
import img5 from '../../../assets/imgs/service-5.jpg';
import img6 from '../../../assets/imgs/service-6.jpg';
const WhatWeOffer = () => {
  // Initialize WOW.js on component mount
  useEffect(() => {
    const wow = new WOW({
      boxClass: "wow", // Default class for triggering animations
      animateClass: "animate__animated", // Animate.css default class prefix
      offset: 0,
      mobile: true, // Enable animations on mobile
      live: true, // Act on asynchronously loaded content
    });
    wow.init();
  }, []);

  return (
    <section className="section padding-small bg-white">
      <div className="container">
        {/* Title */}
        <div className="row row-30 justify-content-center text-center">
          <div className="col-12 wow animate__slideInDown">
            <h3 className="title-decorate title-decorate-center">
              What we Offer
            </h3>
          </div>
          <div className="col-lg-8 wow animate__fadeInUp" data-wow-delay="0.3s">
            <p>
              Our company provides a variety of wedding-related vendors, from
              planning the pre-wedding event to organizing honeymoon details.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div className="row no-gutters mx-0">
          {/* Decoration */}
          <div
            className="offer-card col-md-6 col-lg-4 px-0 wow animate__fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="team-classic">
              <div className="team-classic-figure">
                <img
                  src={img1}
                  alt="Decoration"
                  width="391"
                  height="252"
                />
              </div>
              <div className="team-classic-caption">
                <h4>Decoration</h4>
                <p>Unique Decoration services</p>
              </div>
            </div>
          </div>

          {/* Event Planning */}
          <div
            className="offer-card col-md-6 col-lg-4 px-0 wow animate__fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="team-classic">
              <div className="team-classic-figure">
                <img
                  src={img2}
                  alt="Event Planning"
                  width="391"
                  height="252"
                />
              </div>
              <div className="team-classic-caption">
                <h4>Event Planning</h4>
                <p>Let us plan your wedding</p>
              </div>
            </div>
          </div>

          {/* Floral Design */}
          <div
            className="offer-card col-md-6 col-lg-4 px-0 wow animate__fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="team-classic">
              <div className="team-classic-figure">
                <img
                  src={img3}
                  alt="Floral Design"
                  width="391"
                  height="252"
                />
              </div>
              <div className="team-classic-caption">
                <h4>Floral Design</h4>
                <p>Best bouquets for your event</p>
              </div>
            </div>
          </div>

          {/* Stunning Locations */}
          <div
            className="offer-card col-md-6 col-lg-4 px-0 wow animate__fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="team-classic">
              <div className="team-classic-figure">
                <img
                  src={img4}
                  alt="Stunning Locations"
                  width="391"
                  height="252"
                />
              </div>
              <div className="team-classic-caption">
                <h4>Stunning Locations</h4>
                <p>Choose the best venue for your event</p>
              </div>
            </div>
          </div>

          {/* Cake Design */}
          <div
            className="offer-card col-md-6 col-lg-4 px-0 wow animate__fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="team-classic">
              <div className="team-classic-figure">
                <img
                  src={img5}
                  alt="Cake Design"
                  width="391"
                  height="252"
                />
              </div>
              <div className="team-classic-caption">
                <h4>Cake Design</h4>
                <p>Creative cake ideas for your event</p>
              </div>
            </div>
          </div>

          {/* Bridal Dresses */}
          <div
            className="offer-card col-md-6 col-lg-4 px-0 wow animate__fadeInUp"
            data-wow-delay="0.3s"
          >
            <div className="team-classic">
              <div className="team-classic-figure">
                <img
                  src={img6}
                  alt="Bridal Dresses"
                  width="391"
                  height="252"
                />
              </div>
              <div className="team-classic-caption">
                <h4>Bridal Dresses</h4>
                <p>Find the wedding dress of your dreams.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
