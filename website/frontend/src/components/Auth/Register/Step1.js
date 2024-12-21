import React, { useState } from "react";

function Step1({ formData, setFormData }) {
  const [passwordError, setPasswordError] = useState("");
  const [dobError, setDobError] = useState("");

  // Password validation regex patterns
  const passwordRegex = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /\d/,
    specialChar: /[@$!%*?&]/,
    minLength: /.{8,}/,
  };

  // Individual validation state
  const [validations, setValidations] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    minLength: false,
  });

  // Handle password change
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });

    // Check each validation rule
    setValidations({
      lowercase: passwordRegex.lowercase.test(password),
      uppercase: passwordRegex.uppercase.test(password),
      number: passwordRegex.number.test(password),
      specialChar: passwordRegex.specialChar.test(password),
      minLength: passwordRegex.minLength.test(password),
    });
  };

  // Handle DOB change (check if the user is at least 18 years old)
  const handleDobChange = (e) => {
    const dob = e.target.value;
    const dobDate = new Date(dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    if (age < 18) {
      setDobError("You must be at least 18 years old.");
    } else {
      setDobError("");
    }
    setFormData({ ...formData, dob });
  };

  return (
    <div className="step-container">
      <h2>Basic Info</h2>

      {/* Email */}
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          value={formData.password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          required
        />

        {/* Password validation conditions */}
        <div className="password-errors" style={{ color: "red", fontSize: "12px" }}>
          <p style={{ display: validations.lowercase ? "none" : "block" }}>
            Must contain at least 1 lowercase letter.
          </p>
          <p style={{ display: validations.uppercase ? "none" : "block" }}>
            Must contain at least 1 uppercase letter.
          </p>
          <p style={{ display: validations.number ? "none" : "block" }}>
            Must contain at least 1 number.
          </p>
          <p style={{ display: validations.specialChar ? "none" : "block" }}>
            Must contain at least 1 special character (@$!%*?&).
          </p>
          <p style={{ display: validations.minLength ? "none" : "block" }}>
            Must be at least 8 characters long.
          </p>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <input
          type="password"
          value={formData.password_confirmation}
          onChange={(e) =>
            setFormData({ ...formData, password_confirmation: e.target.value })
          }
          placeholder="Confirm your password"
          required
        />
        {formData.password_confirmation !== formData.password &&
          formData.password_confirmation && (
            <p style={{ color: "red" }}>Passwords do not match.</p>
          )}
      </div>

      {/* Phone */}
      <div>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter your phone number"
          required
        />
      </div>

      {/* Date of Birth (DOB) */}
      <div>
        <input
          type="date"
          value={formData.dob}
          onChange={handleDobChange}
          max={new Date().toISOString().split("T")[0]} // Ensure the date is not in the future
          required
        />
        {dobError && <p style={{ color: "red" }}>{dobError}</p>}
      </div>
    </div>
  );
}

export default Step1;