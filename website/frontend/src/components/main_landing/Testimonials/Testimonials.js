import React from "react";
import "swiper/css"; // Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="position-relative padding-xlarge bg-white"
    >
      <div className="container">
        <div className="row">
          <div className="offset-md-2 col-md-8">
            <h3
              className="title-decorate text-center mb-5"
              data-aos="fade"
              data-aos-easing="ease-in"
              data-aos-duration="1000"
              data-aos-once="true"
            >
              What our clients say
            </h3>

            <div
              className="review-content position-relative"
              data-aos="fade"
              data-aos-easing="ease-in"
              data-aos-duration="1500"
              data-aos-once="true"
            >
              <Swiper
                className="testimonial-swiper"
                modules={[Navigation]} // Pass Navigation module correctly
                navigation={{
                  prevEl: ".testimonial-arrow-prev",
                  nextEl: ".testimonial-arrow-next",
                }}
                spaceBetween={50}
                slidesPerView={1}
              >
                <SwiperSlide className="text-center d-flex justify-content-center">
                  <div className="review-item">
                    <blockquote className="fs-4 fw-light">
                      “After meeting with you, we knew you were the perfect
                      match for us. I hired Angels for my wedding because I
                      honestly had no idea where to begin and I had to do it in
                      10 months. Your event planning solutions have helped me a
                      lot.”
                    </blockquote>
                    <div className="author-detail">
                      <div
                        className="name fw-bold text-uppercase pt-2"
                        style={{ color: "var(--pink-color)" }}
                      >
                        Rahaf Bader
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="text-center d-flex justify-content-center">
                  <div className="review-item">
                    <blockquote className="fs-4 fw-light">
                      “Angels was a dream come true! From finding the perfect
                      Henna party vendors to organizing our wedding and
                      honeymoon, every detail was covered with much less
                      spending than we expected. The budget tracker and
                      consultant kept us on track effortlessly. Absolutely
                      incredible service!”
                    </blockquote>
                    <div className="author-detail">
                      <div
                        className="name fw-bold text-uppercase pt-2"
                        style={{ color: "var(--pink-color)" }}
                      >
                        Rasha Yaseen
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide className="text-center d-flex justify-content-center">
                  <div className="review-item">
                    <blockquote className="fs-4 fw-light">
                      “Thanks to Angels, our wedding planning was stress-free!
                      The budget tracker kept us on target, and the guest list
                      tool was a lifesaver. Vendors were perfectly matched to
                      our budget, making everything beautifully simple.”
                    </blockquote>
                    <div className="author-detail">
                      <div
                        className="name fw-bold text-uppercase pt-2"
                        style={{ color: "var(--pink-color)" }}
                      >
                        Yousef Suleiman
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div
              className="swiper-buttons text-center mt-5"
              data-aos="fade"
              data-aos-easing="ease-in"
              data-aos-duration="1800"
              data-aos-once="true"
            >
              <button className="swiper-prev testimonial-arrow-prev me-2">
                <i className="bi bi-arrow-left"></i>
              </button>
              <span>|</span>
              <button className="swiper-next testimonial-arrow-next ms-2">
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
