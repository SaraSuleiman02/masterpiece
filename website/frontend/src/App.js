import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from './components/navbar/navbar';
import MainLanding from './components/main_landing/MainLanding';

import NotFound from './components/NotFound/NotFound';
import Footer from './components/Footer/Footer';

const ScrollToTopButton = ({ isVisible, onClick }) => {
  return isVisible ? (
    <button className="scroll-top active" onClick={onClick} aria-label="Scroll to top">
      <i className="bi bi-arrow-up"></i>
    </button>
  ) : null;
};

function App() {
  const [scrollTopActive, setScrollTopActive] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });

    const handleScroll = () => {
      setScrollTopActive(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Define the scrollToTop function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/' element={<MainLanding />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <ScrollToTopButton isVisible={scrollTopActive} onClick={scrollToTop} />
    </Router>
  );
}

export default App;
