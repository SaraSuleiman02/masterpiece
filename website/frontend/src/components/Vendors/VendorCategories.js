const VendorCategories = ({ vendors, vendorIcons, handleCardClick }) => (
    <div className="row row-cols-1 row-cols-md-3 g-3">
      {vendors.map((vendor, index) => (
        <div className="col" key={index}>
          <div className="card text-center p-3 border-0 shadow-sm bg-gray category-card">
            <i
              className={`bi ${
                vendorIcons[vendor] || "bi-question-circle"
              } fs-1 mb-2`}
            ></i>
            <h5 className="card-title mb-3">{vendor}</h5>
            <button
              className="btn-outline-white btn-sm bg-white search-btn"
              onClick={() => handleCardClick(vendor.service_id)}
            >
              <i className="bi bi-search"></i> Search
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  export default VendorCategories;