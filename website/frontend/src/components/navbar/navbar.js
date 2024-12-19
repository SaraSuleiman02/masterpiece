import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/imgs/logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const isContactPage = location.pathname === "/contact";

  useEffect(() => {
    const handleScrolled = () => {
      setScrolled(window.scrollY > 100);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScrolled);

    // Check initial scroll position
    handleScrolled();

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScrolled);
    };
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header
      id="header"
      className="site-header"
      style={{
        backgroundColor: isScrolled ? "#444141" : "transparent",
        transition: "background-color 0.3s ease",
      }}
    >
      <nav id="header-nav" className="navbar navbar-expand-lg px-3">
        <div className="container">
          <a className="navbar-brand d-lg-none" href="/">
            <img src={Logo} className="logo" alt="Logo" />
          </a>
          <button
            className="navbar-toggler d-flex d-lg-none order-3 p-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#bdNavbar"
            aria-controls="bdNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="bdNavbar"
            aria-labelledby="bdNavbarOffcanvasLabel"
          >
            <div className="offcanvas-header px-4 pb-0">
              <a className="navbar-brand" href="index.html">
                <img src={Logo} className="logo" alt="Logo" />
              </a>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                data-bs-target="#bdNavbar"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul
                id="navbar"
                className="navbar-nav w-100 d-flex justify-content-between align-items-center"
              >
                <ul className="list-unstyled d-lg-flex justify-content-md-between align-items-center">
                  <li className="nav-item">
                    <a
                      className="navbar-brand d-none d-lg-block me-0"
                      href="index.html"
                    >
                      <img src={Logo} className="logo" alt="Logo" />
                    </a>
                  </li>
                </ul>

                <ul className="list-unstyled d-lg-flex justify-content-between align-items-center">
                  <li className="nav-item">
                    <a
                      className={`nav-link ms-0 ${isHomePage ? "active" : ""}`}
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ms-0 ${isAboutPage ? "active" : ""}`}
                      href="/about"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ms-0 ${
                        isContactPage ? "active" : ""
                      }`}
                      href="/contact"
                    >
                      Contact
                    </a>
                  </li>
                  <li className="cart-dropdown nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle me-0"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-expanded="false"
                    >
                      <i
                        className="bi bi-person"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end p-3">
                      <ul className="list-group mb-3">
                        {isLoggedIn ? (
                          <>
                            <li className="list-group-item bg-transparent border-dark d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="card-title fs-3 text-capitalize">
                                  <a href="/profile">Profile</a>
                                </h6>
                              </div>
                            </li>
                            <li className="list-group-item bg-transparent border-dark d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="card-title fs-3 text-capitalize">
                                  <a href="#" onClick={handleLogout}>
                                    Logout
                                  </a>
                                </h6>
                              </div>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="list-group-item bg-transparent border-dark d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="card-title fs-3 text-capitalize">
                                  <a href="/login">Login</a>
                                </h6>
                              </div>
                            </li>
                            <li className="list-group-item bg-transparent border-dark d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="card-title fs-3 text-capitalize">
                                  <a href="/register">Register</a>
                                </h6>
                              </div>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;