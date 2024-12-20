import React from "react";
import "./Pricing.css"; 

function Pricing() {
  return (
    <section className="padding-medium">
      <div className="container text-center">
        <h3 className="title-decorate">Pricing Plan</h3>

        <div className="cards">
          <div className="card shadow">
            <ul>
              <li className="pack">Basic</li>
              <li id="basic" className="price bottom-bar">
                Free
              </li>
              <li className="bottom-bar">Use Checklist</li>
              <li className="bottom-bar">Use Guest List</li>
              <li className="bottom-bar">See the available vendors</li>
              <li>
                <button className="button button-gradient-hovered">
                  Sign Up
                </button>
              </li>
            </ul>
          </div>

          <div className="card active prof">
            <ul>
              <li className="pack">Plus</li>
              <li className="price bottom-bar">50 JD</li>
              <li className="bottom-bar">All the previous</li>
              <li className="bottom-bar">Booking Vendors</li>
              <li className="bottom-bar">Free Appointment at the office</li>
              <li>
                <button className="button button-white-outline prof-btn">
                  Buy Now
                </button>
              </li>
            </ul>
          </div>

          <div className="card shadow">
            <ul>
              <li className="pack">Premium </li>
              <li id="master" className="price bottom-bar">
                150 JD
              </li>
              <li className="bottom-bar">All the previous</li>
              <li className="bottom-bar">Visiting the booked vendors</li>
              <li className="bottom-bar">Personal assistant for a day</li>
              <li>
                <button className="button button-gradient-hovered">
                  Buy Now
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;