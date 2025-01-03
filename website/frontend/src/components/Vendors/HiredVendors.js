import React, { useState } from "react";

function HiredVendors({ vendors }) {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  // Slice the vendors array to display only the items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVendors = vendors.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="row">
        {currentVendors.length > 0 ? (
          currentVendors.map((vendor, index) => (
            <div className="col-lg-4 mb-4" key={index}>
              <div className="card h-100">
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

     {/* create a pagination here */}
      <div className="row">
        <div className="col-12">
          <ul className="pagination justify-content-center">
            {[...Array(Math.ceil(vendors.length / itemsPerPage))].map(
              (_, pageIndex) => (
                <li
                  key={pageIndex + 1}
                  className={`page-item ${currentPage === pageIndex + 1? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageIndex + 1)}
                  >
                    {pageIndex + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HiredVendors;
