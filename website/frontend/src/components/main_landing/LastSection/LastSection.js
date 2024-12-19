import './LastSection.css';
function LastSection() {
  return (
    <section className="section padding-small custom-section">
      <div className="content-wrapper">
        <div className="container">
          {/* Title */}
          <div className="row row-30 justify-content-center text-center">
            <div className="col-12 wow animate__slideInDown">
              <h3 className="title-decorate title-decorate-center">
                Let’s Create the Best Event for You
              </h3>
            </div>
            <div
              className="col-lg-8 wow animate__fadeInUp"
              data-wow-delay="0.3s"
            >
              <p>
                Our team of vendors and planners is always glad to create an
                unforgettable event for you and your guests.
              </p>
              <button className="cta-button">
                <a href="/login">Get Started</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LastSection;