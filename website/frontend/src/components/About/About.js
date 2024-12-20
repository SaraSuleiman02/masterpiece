import React from "react";
import "aos/dist/aos.css";
import img from "../../assets/imgs/hero-img2.png";
import img2 from "../../assets/imgs/event.jpg";
import "./About.css";

function About() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section jarallax d-flex align-items-center justify-content-center padding-small pb-5"
        style={{ background: `url(${img}) no-repeat` }}
      >
        <div className="hero-content">
          <div className="container">
            <div className="row">
              <div className="text-center padding-large no-padding-bottom">
                <h1>About</h1>
                <div className="breadcrumbs">
                  <span className="item home">
                    <a href="/">Home &gt;</a>
                  </span>
                  <span className="item">About</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" data-aos="fade" data-aos-once="true">
        <div className="container">
          <div className="row position-relative">
            <div className="col-lg-8">
              <div className="image-holder zoom-out">
                <img
                  src={img2}
                  alt="single"
                  className="single-image img-fluid"
                />
              </div>
            </div>
            <div className="about-content col-lg-4 m-auto top-0 end-0 bottom-0">
              <span className="title-accent fs-6 text-uppercase">About us</span>
              <h3 className="py-3">
                At Lumora, we believe every special moment deserves a touch of
                magic.
              </h3>
              <p>
                Whether it’s a wedding, pre-wedding celebration, or honeymoon,
                Lumora connects you with trusted vendors to bring your vision to
                life. With personalized tools like checklists and a
                user-friendly platform, we make event planning simple and
                stress-free, so you can focus on cherishing every moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section padding-medium bg-white">
        <div className="container">
          {/* Title */}
          <div className="row row-30 justify-content-center text-center">
            <div className="col-12 wow animate__slideInDown">
              <h3 className="title-decorate title-decorate-center">
                Our Story
              </h3>
            </div>
            <div
              className="col-lg-8 wow animate__fadeInUp"
              data-wow-delay="0.3s"
            >
              <p>
                Lumora was born from a passion for turning life’s most cherished
                moments into unforgettable experiences. Inspired by the joy and
                beauty of weddings and celebrations, we set out to create a
                platform that simplifies the planning process while connecting
                people with the best vendors in the industry. From humble
                beginnings, our mission has always been to help couples and
                families focus on what truly matters—creating memories—while we
                take care of the details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
