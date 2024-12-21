import React from "react";

function Step4({ formData, setFormData }) {
  // Vendors needed options
  const vendorsOptions = [
    "Catering",
    "Venue",
    "Florist",
    "Travel",
    "Decor",
    "Dress",
  ];

  // Handle checkbox change
  const handleVendorsChange = (e) => {
    const { value, checked } = e.target;
    let updatedVendors = formData.vendors_needed
      ? formData.vendors_needed.split(", ")
      : [];

    if (checked) {
      updatedVendors.push(value);
    } else {
      updatedVendors = updatedVendors.filter((vendor) => vendor !== value);
    }

    // Join the selected vendors back into a comma-separated string
    setFormData({ ...formData, vendors_needed: updatedVendors.join(", ") });
  };

  return (
    <div className="step-container">
      <h2>Vendors Needed</h2>

      {/* Vendors Needed Checkboxes */}
      <div>
        <h6>Which vendors do you still need ?</h6>
        {vendorsOptions.map((vendor) => (
          <label key={vendor} style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="checkbox"
              value={vendor}
              checked={
                formData.vendors_needed
                  ? formData.vendors_needed.split(", ").includes(vendor)
                  : false
              }
              onChange={handleVendorsChange}
            />
            {vendor}
          </label>
        ))}
        {!formData.vendors_needed && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Please select at least one vendor.
          </p>
        )}
      </div>
    </div>
  );
}

export default Step4;