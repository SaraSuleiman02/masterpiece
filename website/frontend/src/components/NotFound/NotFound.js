import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    // <div style={{ textAlign: "center", marginTop: "150px", marginBottom: "150px" }}>
    //     <h1>404 - Page Not Found</h1>
    //     <p>Sorry, the page you are looking for does not exist.</p>
    //     <Link to="/" style={{ textDecoration: "none", color: "#10058c" }}>
    //         Go Back to Home
    //     </Link>
    // </div>
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404">
          <h1>
            4<span></span>4
          </h1>
        </div>
        <h2>Oops! Page Not Found</h2>
        <p>
          Sorry but the page you are looking for does not exist, have been
          removed. name changed or is temporarily unavailable
        </p>
        <Link to="/" style={{ textDecoration: "none" }}>
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
