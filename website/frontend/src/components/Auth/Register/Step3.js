import React, { useState } from "react";

function Step3({ formData, setFormData }) {
  // Event type options
  const eventTypes = ["pre-wedding", "wedding", "honeymoon"];

  // City options
  const cities = [
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
  ];

  // Handle checkbox change
  const handleEventTypeChange = (e) => {
    const { value, checked } = e.target;
    let updatedEventTypes = [...(formData.event_type || [])];
    if (checked) {
      updatedEventTypes.push(value);
    } else {
      updatedEventTypes = updatedEventTypes.filter((type) => type !== value);
    }
    setFormData({ ...formData, event_type: updatedEventTypes });
  };

  return (
    <div className="step-container">
      <h2>Event Details</h2>

      {/* Event Type */}
      <div className="event-cont">
        <h6>Select Event Type(s):</h6>
        {eventTypes.map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              value={type}
              checked={formData.event_type?.includes(type) || false}
              onChange={handleEventTypeChange}
            />
            {type.replace("_", " ")}{" "} &nbsp;&nbsp;
            {/* Replace underscores for better readability */}
          </label>
        ))}
        {!formData.event_type?.length && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Please select at least one event type.
          </p>
        )}
      </div>

      {/* Budget */}
      <div>
        <input
          type="number"
          min="0"
          value={formData.budget || ""}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          placeholder="Enter your budget"
          required
        />
        {!formData.budget && (
          <p style={{ color: "red", fontSize: "12px" }}>Budget is required.</p>
        )}
      </div>

      {/* City Dropdown */}
      <div>
        <select
          value={formData.city || ""}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
        >
          <option value="" disabled>
            Select a city
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {!formData.city && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Please select a city.
          </p>
        )}
      </div>

      {/* Event Date */}
      <div>
        <input
          type="date"
          value={formData.event_date || ""}
          onChange={(e) =>
            setFormData({ ...formData, event_date: e.target.value })
          }
          required
        />
        {!formData.event_date && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Please select an event date.
          </p>
        )}
        {new Date(formData.event_date) <= new Date() && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Event date must be in the future.
          </p>
        )}
      </div>
    </div>
  );
}

export default Step3;