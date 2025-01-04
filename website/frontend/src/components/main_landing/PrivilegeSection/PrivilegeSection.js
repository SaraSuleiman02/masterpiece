import React, { useEffect } from "react";
import "./PrivilegeSection.css";

const PrivilegeSection = () => {
  const privilegeCards = [
    {
      id: 1,
      title: "Qualified Team",
      description:
        "Lumora employs the best events experts in Jordan to help you make your events unforgettable.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m19.5 1l-1.09 2.41L16 4.5l2.41 1.09L19.5 8l1.1-2.41L23 4.5l-2.4-1.09M12 2C6.5 2 2 6.5 2 12v10h20V12c0-1.47-.33-2.87-.9-4.13l-1.24 2.7c.09.47.14.93.14 1.43c0 4.43-3.57 8-8 8s-8-3.57-8-8v-.14a9.93 9.93 0 0 0 5.74-5.55a10 10 0 0 0 9.09 3.6L17.96 8h-.46c-2.82 0-5.4-1.5-6.84-3.88c.44-.07.88-.12 1.34-.12c.5 0 .96.05 1.42.13l2.71-1.22A9.9 9.9 0 0 0 12 2M8.09 5a8.12 8.12 0 0 1-3.68 4.5C5.04 7.57 6.37 6 8.09 5M9 11.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5m6 0a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5M4 17.97c.58.77 1.26 1.45 2.03 2.03H4m16-2.03V20h-2.03c.77-.58 1.45-1.26 2.03-2.03"
          />
        </svg>
      ),
      animationClass: "slide-from-left",
    },
    {
      id: 2,
      title: "Professional Approach",
      description:
        "We will thoroughly plan every element of your event so that you could enjoy your most important day.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="m25 10l1.593 3l3.407.414l-2.5 2.253L28 19l-3-1.875L22 19l.5-3.333l-2.5-2.253L23.5 13zm-3 20h-2v-5a5.006 5.006 0 0 0-5-5H9a5.006 5.006 0 0 0-5 5v5H2v-5a7.01 7.01 0 0 1 7-7h6a7.01 7.01 0 0 1 7 7zM12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7"
          />
        </svg>
      ),
      animationClass: "slide-from-top",
    },
    {
      id: 3,
      title: "Acceptable Prices",
      description:
        "Our clients value our affordable pricing policy and great service that allow us to plan the best events.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6.5 14.975v-1H4v-2h5v-2H5q-.425 0-.712-.287T4 8.975v-4q0-.425.288-.712T5 3.975h1.5v-1h2v1H11v2H6v2h4q.425 0 .713.288t.287.712v4q0 .425-.288.713t-.712.287H8.5v1zm7.45 6l-4.25-4.25l1.4-1.4l2.85 2.85l5.65-5.65l1.4 1.4z"
          />
        </svg>
      ),
      animationClass: "slide-from-right",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show-card");
          }
        });
      },
      { threshold: 0.2 } // Adjust the threshold as needed
    );

    const cards = document.querySelectorAll(".priv-card");
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <section id="privilege" style={{ marginTop: "-50px" }}>
      <div className="container pt-5 mt-5 text-center">
        <div className="row g-4 pt-4 justify-content-around">
          {privilegeCards.map((card) => (
            <div key={card.id} className="col-12 col-md-auto">
              <div className={`priv-card card border-0 ${card.animationClass}`}>
                <div>{card.icon}</div>
                <h4 className="card-title py-2 m-0">{card.title}</h4>
                <p className="blog-paragraph fs-6">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivilegeSection;
