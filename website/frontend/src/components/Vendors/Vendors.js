import React, { useState, useEffect } from "react";
import img from "../../assets/imgs/vendors2.png";
import VendorCard from "./VendorCard";
import axiosInstance from "../../api/axiosInstance";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";

function Vendors() {
  const [cityOpen, setCityOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 5;
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.serviceId) {
      const serviceId = location.state.serviceId.toString();
      setSelectedCategory(serviceId);
      filterVendors(serviceId, selectedCities, selectedPriceRange);
    }
  }, [location.state]);

  useEffect(() => {
    fetchServices();
    fetchVendors();
  }, []);

  useEffect(() => {
    filterVendors();
  }, [selectedCategory, selectedCities, selectedPriceRange, vendors]);

  const fetchServices = async () => {
    try {
      const response = await axiosInstance.get(`/services`);
      setServices(response.data.services);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch services",
        icon: "error",
      });
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await axiosInstance.get(`/vendors`);
      const vendorsData = response.data.vendors || [];
      setVendors(vendorsData);
      setFilteredVendors(vendorsData); // Default to all vendors
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch vendors",
        icon: "error",
      });
    }
  };

  const filterVendors = (
    category = selectedCategory,
    cities = selectedCities,
    priceRange = selectedPriceRange
  ) => {
    let filtered = vendors;

    if (category) {
      filtered = filtered.filter(
        (vendor) => vendor.service_id === parseInt(category)
      );
    }

    if (cities.length > 0) {
      filtered = filtered.filter((vendor) => cities.includes(vendor.location));
    }

    if (priceRange) {
      filtered = filtered.filter((vendor) => {
        const price = parseInt(vendor.price);
        if (priceRange === "<1000") return price < 1000;
        if (priceRange === "1000-5000") return price >= 1000 && price <= 5000;
        if (priceRange === ">5000") return price > 5000;
        return true;
      });
    }

    setFilteredVendors(filtered);
  };

  const handleCityChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCities((prev) =>
      checked ? [...prev, value] : prev.filter((city) => city !== value)
    );
  };

  const handlePriceChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Calculate the vendors for the current page
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(
    indexOfFirstVendor,
    indexOfLastVendor
  );

  // Handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container ">
      {/* Search Section */}
      <div className="row mb-4">
        <div className="col-7 pt-4 vendors-header">
          <h1 className="mb-3">Vendors</h1>
          <div className="input-group">
            <select
              className="form-select"
              aria-label="Search Vendors"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Choose Vendor Category</option>
              {services.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
            <button className="btn-primary-pink">Search</button>
          </div>
        </div>
        <div className="col-5 vendors-img-container">
          <img src={img} height={100} alt="Vendors" />
        </div>
      </div>

      {/* Filters Section */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="mb-3">
            <button
              className="btn w-100 text-start btn-primary-white"
              onClick={() => setCityOpen(!cityOpen)}
            >
              City/Town {cityOpen ? "▴" : "▾"}
            </button>
            {cityOpen && (
              <div className="mt-2">
                {[
                  "Amman",
                  "Zarqa",
                  "Irbid",
                  "Aqaba",
                  "Mafraq",
                  "Jerash",
                  "Madaba",
                  "Ajloun",
                  "Salt",
                  "Karak",
                  "Tafilah",
                  "Ma’an",
                ].map((city) => (
                  <div className="form-check" key={city}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={city}
                      id={city}
                      onChange={handleCityChange}
                    />
                    <label className="form-check-label" htmlFor={city}>
                      {city}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-3">
            <button
              className="btn  w-100 text-start btn-primary-white"
              onClick={() => setPriceOpen(!priceOpen)}
            >
              Price {priceOpen ? "▴" : "▾"}
            </button>
            {priceOpen && (
              <div className="mt-2">
                {["<1000", "1000-5000", ">5000"].map((range) => (
                  <div className="form-check" key={range}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="price"
                      value={range}
                      id={range}
                      onChange={handlePriceChange}
                    />
                    <label className="form-check-label" htmlFor={range}>
                      {range === "<1000"
                        ? "Under 1,000 JD"
                        : range === "1000-5000"
                        ? "1,000 - 5,000 JD"
                        : "Above 5,000 JD"}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-md-9 d-flex flex-column">
          {/* Vendors Section */}
          <p>{filteredVendors.length} RESULTS</p>
          {currentVendors.map((vendor) => (
            <VendorCard vendor={vendor} key={vendor.id} />
          ))}
          {/* Pagination Controls */}
          <div className="pagination">
            {[
              ...Array(
                Math.ceil(filteredVendors.length / vendorsPerPage)
              ).keys(),
            ].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={` ${
                  currentPage === number + 1
                    ? "btn-primary-pink"
                    : "btn-primary-white"
                }`}
                style={{ marginLeft: "4px" }}
              >
                {number + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendors;
