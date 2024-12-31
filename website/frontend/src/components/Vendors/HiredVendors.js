function HiredVendors({ vendors }) {
  return (
    <div className="row">
      {vendors.length > 0 ? (
        vendors.map((vendor, index) => (
          <div className="col-lg-4 mb-4" key={index}>
            {" "}
            {/* 3 cards per row */}
            <div className="card h-100">
              {" "}
              {/* Ensure cards have the same height */}
              <div className="position-relative">
                <img
                  src={
                    vendor.img ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxOWYPo0IThEFfM4zvvKFR-9b_so6M0DdNbA&s"
                  }
                  className="card-img-top"
                  alt={vendor.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{vendor.name}</h5>
                <p className="card-text text-muted">{vendor.location}</p>
                <p className="card-text">{vendor.about}</p>
                <p className="card-text fw-bold mt-auto">
                  {" "}
                  {/* Push to the bottom */}
                  {vendor.price
                    ? `${parseInt(vendor.price)} JD`
                    : "Price not available"}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No vendors chosen yet.</p>
      )}
    </div>
  );
}

export default HiredVendors;