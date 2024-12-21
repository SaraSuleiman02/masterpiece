import React from "react";

function Step2({ formData, setFormData }) {
  return (
    <div className="step-container">
      <h2>Let's get to know each other. What are your names?</h2>

      {/* Your Name */}
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
          required
        />
        {!formData.name && (
          <p style={{ color: "red", fontSize: "12px" }}>Name is required.</p>
        )}
      </div>

      {/* Partner's Name */}
      <div>
        <input
          type="text"
          value={formData.partner_name}
          onChange={(e) =>
            setFormData({ ...formData, partner_name: e.target.value })
          }
          placeholder="Enter your partner's name"
          required
        />
        {!formData.partner_name && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Partner's name is required.
          </p>
        )}
      </div>
    </div>
  );
}

export default Step2;