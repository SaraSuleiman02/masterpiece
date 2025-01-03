import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Logo from "../../assets/imgs/logo.png";
import axiosInstance from "../../api/axiosInstance";

const Navbar = () => {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("authToken"));
  const [isScrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const isContactPage = location.pathname === "/contact";
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";

  const knownRoutes = ["/", "/about", "/contact", "/register", "/login"];
  const isNotFoundPage = !knownRoutes.includes(location.pathname);

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
  }, []);

  // const handleLogout = () => {
  //   // Remove cookies
  //   Cookies.remove("authToken");
  //   Cookies.remove("user_id");
  //   Cookies.remove("user_name");
  //   Cookies.remove("user_email");

  //   // Update the logged-in state
  //   setIsLoggedIn(false);
  //   navigate("/");
  // };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/logout");

      if (response.data.status) {
        console.log("Logout successful");

        // Remove cookies
        Cookies.remove("authToken", { path: "/" });
        Cookies.remove("user_id", { path: "/" });
        Cookies.remove("user_name", { path: "/" });
        Cookies.remove("user_email", { path: "/" });

        // Update the logged-in state
        setIsLoggedIn(false);
        navigate("/");
      } else {
        console.error("Failed to logout:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <header
      id="header"
      className="site-header"
      style={{
        backgroundColor:
          isNotFoundPage || isRegisterPage || isLoginPage
            ? "#444141"
            : isScrolled
            ? "#444141"
            : "transparent",
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
              <a className="navbar-brand" href="/">
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
                    <a className="navbar-brand d-none d-lg-block me-0" href="/">
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
                    <div className="dropdown dropdown-menu dropdown-menu-end p-3">
                      <ul className="mb-3">
                        {isLoggedIn ? (
                          <>
                            <li className="bg-transparent border-dark d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="drop-item card-title fs-3 text-capitalize">
                                  <a href="/profile">Profile</a>
                                </h6>
                              </div>
                            </li>
                            <li className="bg-transparent border-dark d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="drop-item card-title fs-3 text-capitalize">
                                  <a onClick={handleLogout}>Logout</a>
                                </h6>
                              </div>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="bg-transparent border-dark d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="drop-item card-title fs-3 text-capitalize">
                                  <a href="/login">Login</a>
                                </h6>
                              </div>
                            </li>
                            <li className="bg-transparent border-dark d-flex justify-content-between lh-sm">
                              <div>
                                <h6 className="drop-item card-title fs-3 text-capitalize">
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
