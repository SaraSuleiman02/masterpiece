import React from "react";

const Pagination = ({ vendorsPerPage, totalVendors, paginate, currentPage }) => {
  const pageNumbers = [];
  
  // Calculate total number of pages
  for (let i = 1; i <= Math.ceil(totalVendors / vendorsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button
              onClick={() => paginate(number)}
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
