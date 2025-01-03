import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import AOS from "aos";

import Navbar from "./components/navbar/navbar";
import SecondNav from "./components/navbar/SecondNav";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import MainLanding from "./components/main_landing/MainLanding";
import MyEvent from "./components/MyEvent/MyEvent";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import NotFound from "./components/NotFound/NotFound";
import Profile from "./components/Profile/Profile";
import VendorManager from "./components/Vendors/VendorManager";
import Vendors from "./components/Vendors/Vendors";
import Checklist from "./components/Checklist/Checklist";
import GuestList from "./components/GuestList/GuestList";
import Wishlist from "./components/Wishlist/Wishlist";
import Footer from "./components/Footer/Footer";

const ScrollToTopButton = ({ isVisible, onClick }) => {
  return isVisible ? (
    <button
      className="scroll-top active"
      onClick={onClick}
      aria-label="Scroll to top"
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  ) : null;
};

function AppContent() {
  const [scrollTopActive, setScrollTopActive] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    const handleScroll = () => {
      setScrollTopActive(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // To conditionally render the navbar and footer
  const location = useLocation();
  const noLayoutPaths = ["/register"];
  const shouldShowLayout = !noLayoutPaths.includes(location.pathname);

  const noSecondNav = ['/',"/login","/register","/about","/contact","*"];
  const shouldShowSecondNav =!noSecondNav.includes(location.pathname);

  // conditionally render the second navbar
  const isLoggedIn =!!Cookies.get("authToken");

  return (
    <>
      {shouldShowLayout && <Navbar />}
      {isLoggedIn && shouldShowSecondNav && <SecondNav />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainLanding />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />

        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        {isLoggedIn && <Route path="/myevent" element={<MyEvent />} />}
        {isLoggedIn && <Route path="/vendorManager" element={<VendorManager />} />}
        {isLoggedIn && <Route path="/vendors" element={<Vendors />} />}
        {isLoggedIn && <Route path="/checklist" element={<Checklist />} />}
        {isLoggedIn && <Route path="/guestlist" element={<GuestList />} />}
        {isLoggedIn && <Route path="/wishlist" element={<Wishlist />} />}
      </Routes>

      {shouldShowLayout && <Footer />}
      <ScrollToTopButton isVisible={scrollTopActive} onClick={scrollToTop} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;