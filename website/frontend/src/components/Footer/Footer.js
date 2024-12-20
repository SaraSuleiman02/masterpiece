import React from "react";
import logo from "../../assets/imgs/logo.png";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      id="footer"
      className="overflow-hidden padding-medium pb-0 bg-light-dark"
    >
      <div className="container">
        <div className="row">
          <div className="footer-top-area pb-5">
            <div className="row d-flex flex-wrap justify-content-between">
              <div
                className="col-lg-3 col-sm-6 pb-3"
                data-aos="fade"
                data-aos-easing="ease-in"
                data-aos-duration="1000"
                data-aos-once="true"
              >
                <div className="footer-menu">
                  <img src={logo} alt="logo" className="mb-2" height={100} />
                  <p>Your all in one place to get ready for your event!</p>
                  <hr />
                  <span className="privacy-policy">
                    © {currentYear} Lumora. Privacy Policy
                  </span>
                </div>
              </div>
              <div
                className="col-lg-2 col-sm-6 pb-3"
                data-aos="fade"
                data-aos-easing="ease-in"
                data-aos-duration="1200"
                data-aos-once="true"
              >
                <div className="footer-menu">
                  <h4 className="widget-title pb-2">Quick Links</h4>
                  <ul className="menu-list list-unstyled">
                    <li className="menu-item pb-2">
                      <a href="/">Home</a>
                    </li>
                    <li className="menu-item pb-2">
                      <a href="/about">About</a>
                    </li>
                    <li className="menu-item pb-2">
                      <a href="/contact">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 pb-3"
                data-aos="fade"
                data-aos-easing="ease-in"
                data-aos-duration="1400"
                data-aos-once="true"
              >
                <div className="footer-menu contact-item">
                  <h4 className="widget-title pb-2">Contact info</h4>
                  <ul className="menu-list list-unstyled">
                    <li className="menu-item pb-2">
                      <a href="#">
                        <i
                          class="bi bi-geo-alt-fill"
                          style={{ color: "#F29EA1" }}
                        ></i>{" "}
                        Amman, Jordan
                      </a>
                    </li>
                    <li className="menu-item pb-2">
                      <a href="#">
                        <i
                          class="bi bi-telephone-fill"
                          style={{ color: "#F29EA1" }}
                        ></i>{" "}
                        +962 795 8943 63
                      </a>
                    </li>
                    <li className="menu-item pb-2">
                      <a href="mailto:sarasuleiman1234@gmail.com">
                        <i
                          class="bi bi-envelope"
                          style={{ color: "#F29EA1" }}
                        ></i>{" "}
                        sarasuleiman1234@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="col-lg-3 col-sm-6 pb-3"
                data-aos="fade"
                data-aos-easing="ease-in"
                data-aos-duration="1600"
                data-aos-once="true"
              >
                <div className="footer-menu">
                  <h4 className="widget-title pb-2">Social info</h4>
                  <p>
                    You can follow us on our social platforms to get updates.
                  </p>
                  <div className="social-links">
                    <ul className="d-flex list-unstyled">
                      <li>
                        <a
                          href="https://web.facebook.com/?_rdc=1&_rdr#"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/accounts/login/?hl=en"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://x.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyIiOiIiLCJteCI6IjIifQ%3D%3D%22%7D"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/in/sara-suleiman-b3aa9b280/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-linkedin"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="bi bi-youtube"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </footer>
  );
}

export default Footer;
