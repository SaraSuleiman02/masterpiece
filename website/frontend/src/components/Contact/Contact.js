import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axiosInstance";
import "./Contact.css";
import img from "../../assets/imgs/hero-img2.png";

const ContactForm = () => {
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true); // Set to true when sending starts
    const messageWithSubject = `Subject: ${formData.subject}\n\n${formData.message}`;

    try {
      await axiosInstance.post("/contact", {
        name: formData.name,
        email: formData.email,
        message: messageWithSubject,
      });
      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully.",
        icon: "success",
        showCloseButton: true,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while sending your message. Please try again later.",
        icon: "error",
        showCloseButton: true,
      });
    } finally {
      setIsSending(false); // Set to false once the API call is done
    }
  };

  return (
    <>
      <section
        className="hero-section jarallax d-flex align-items-center justify-content-center padding-xsmall pb-5"
        style={{ background: `url(${img}) no-repeat` }}
      >
        <div className="hero-content">
          <div className="container">
            <div className="row">
              <div className="text-center padding-large no-padding-bottom">
                <h1>Contact</h1>
                <div className="breadcrumbs">
                  <span className="item home">
                    <a href="/">Home &gt;</a>
                  </span>
                  <span className="item">Contact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="padding-small">
        <div>
          <div className="contact-form-container">
            <div className="contact-info">
              <div className="info-item">
                <i className="bi bi-geo-alt"></i>
                <p>
                  <strong>Address</strong>
                  <br />
                  Amman, Jordan
                </p>
              </div>
              <div className="info-item">
                <i className="bi bi-telephone"></i>
                <p>
                  <strong>Call Me</strong>
                  <br />
                  +962 795894363
                </p>
              </div>
              <div className="info-item">
                <i className="bi bi-envelope"></i>
                <p>
                  <strong>Email Me</strong>
                  <br />
                  sarasuleiman1234@gmail.com
                </p>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                className="send-message-btn"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
