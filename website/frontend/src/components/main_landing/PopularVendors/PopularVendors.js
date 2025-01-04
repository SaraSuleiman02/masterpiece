import React, { useEffect } from "react";
import WOW from "wow.js";
import "animate.css";
import "./PopularVendors.css";
import img1 from '../../../assets/imgs/Four-Seasons.png';
import img2 from '../../../assets/imgs/justin-alexander.png';
import img3 from '../../../assets/imgs/St._Regis.png';
import img4 from '../../../assets/imgs/tws.png';

function PopularVendors() {
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
    <section className="section padding-small ">
      <div className="container">
        <div className="row row-30 justify-content-center text-center">
          <div className="col-12 wow animate__slideInDown">
            <h3 className="title-decorate title-decorate-center">
              Popular Vendors
            </h3>
          </div>
        </div>

        <div className="row row-30 justify-content-center text-center">
          <div className="col-sm-6 col-lg-3 img-container wow animate__fadeInUp" data-wow-delay="0.2s">
            <img
              src={img1}
              alt="Vendor 1"
              className="img-fluid vendor-img"
            />
          </div>
          <div className="col-sm-6 col-lg-3 img-container wow animate__fadeInUp" data-wow-delay="0.4s">
            <img
              src={img2}
              alt="Vendor 2"
              className="img-fluid vendor-img"
            />
          </div>
          <div className="col-sm-6 col-lg-3 img-container wow animate__fadeInUp" data-wow-delay="0.6s">
            <img
              src={img3}
              alt="Vendor 3"
              className="img-fluid vendor-img"
            />
          </div>
          <div className="col-sm-6 col-lg-3 img-container wow animate__fadeInUp" data-wow-delay="0.7s">
            <img
              src={img4}
              alt="Vendor 4"
              className="img-fluid vendor-img"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default PopularVendors;
