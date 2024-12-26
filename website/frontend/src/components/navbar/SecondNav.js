import React from "react";
import "./SecondNav.css";
import { useLocation } from "react-router-dom";
import MyWedding from "../../assets/imgs/my_wedding.png";
import Checklist from "../../assets/imgs/checklist.png";
import Vendors from "../../assets/imgs/vendors.png";
import Guests from "../../assets/imgs/guests.png";
import Wishlist from "../../assets/imgs/wishlist.png";

const SecondNav = () => {
  const location = useLocation();

  const navItems = [
    { id: 1, name: "My Event", icon: MyWedding, link: "/myWedding" },
    { id: 2, name: "Checklist", icon: Checklist, link: "/checklist" },
    { id: 3, name: "Vendor Manager", icon: Vendors, link: "/vendorManager" },
    { id: 4, name: "Guest List", icon: Guests, link: "/guestList" },
    { id: 5, name: "Wishlist", icon: Wishlist, link: "/wishlist" },
  ];

  return (
    <div className="secondary-navbar">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={item.link}
          className={`nav-item2 ${
            location.pathname === item.link ? "current" : ""
          }`}
        >
          <img src={item.icon} alt={item.name} />
          <span>{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export default SecondNav;