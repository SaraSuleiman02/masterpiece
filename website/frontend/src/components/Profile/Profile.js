import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axiosInstance from "../../api/axiosInstance";
import Cookies from "js-cookie";
import "./Profile.css";
import Swal from "sweetalert2";
import WOW from "wow.js";
import "animate.css";

function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const [editModalData, setEditModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editingBox, setEditingBox] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = Cookies.get("user_id");
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

  useEffect(() => {
    const wow = new WOW({
      boxClass: "wow",
      animateClass: "animate__animated",
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();
  }, []);
  // Fetch user profile data on load
  useEffect(() => {
    fetchUserProfile();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/profile/${userId}`);
      const user = response.data.user;
      user.event_type = user.event_type.split(",");
      user.phone = "0" + user.phone;
      setUserProfile(user);
      console.log(user);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        toast: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle opening modal
  const handleEditClick = (box) => {
    setEditingBox(box);
    setEditModalData(userProfile); // Load current profile data into the modal
    setShowModal(true);
  };

  const handleEventTypeChange = (e) => {
    const { value, checked } = e.target;
    console.log(value);
    let updatedEventTypes = editModalData.event_type
      ? [...editModalData.event_type]
      : [];
    console.log("Events before adding: " + updatedEventTypes);
    if (checked && !updatedEventTypes.includes(value)) {
      updatedEventTypes.push(value);
      console.log("Events after adding: " + updatedEventTypes);
    } else {
      updatedEventTypes = updatedEventTypes.filter((type) => type !== value);
      console.log("Events after removing: " + updatedEventTypes);
    }

    setEditModalData({
      ...editModalData,
      event_type: updatedEventTypes,
    });
  };

  // Handle saving changes
  const handleSave = async () => {
    try {
      if (editingBox === "wedding") {
        console.log(editModalData);
        const response1 = await axiosInstance.put(`/profile/update/${userId}`, {
          ...editModalData,
        });
      } else if (editingBox === "account") {
        const response1 = await axiosInstance.put(
          `/profile/updatePass/${userId}`,
          {
            ...editModalData,
          }
        );
      }

      // Refresh the profile data
      const response = await axiosInstance.get(`/profile/${userId}`);
      setUserProfile(response.data.user);
      setShowModal(false);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "The information has been updated successfully.",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        toast: true,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4 profile-container d-flex flex-column">
      <div className="row">
        <h1 className="text-center wow animate__zoomIn">Profile</h1>
      </div>
      <div className="row">
        {/* Wedding Details */}
        <div className="col-md-6 wow animate__fadeInLeft">
          <div className="card p-3 shadow-sm box">
            <div className="d-flex justify-content-between">
              <h5 className="profile-subtitle">Event Details</h5>
              <i
                className="bi bi-pencil-fill cursor-pointer edit-icon"
                onClick={() => handleEditClick("wedding")}
              ></i>
            </div>
            <div>
              <div className="row">
                <p className="col-md-6">
                  <strong className="profile-label">Name:</strong>{" "}
                  {userProfile.name}
                </p>
                <p className="col-md-6">
                  <strong className="profile-label">Partner's Name:</strong>{" "}
                  {userProfile.partner_name}
                </p>
              </div>
              <p></p>
              <p>
                <strong className="profile-label">Phone:</strong>{" "}
                {userProfile.phone}
              </p>
              <p>
                <strong className="profile-label">DOB:</strong>{" "}
                {new Date(userProfile.dob).toLocaleDateString("en-US")}
              </p>

              <p>
                <strong className="profile-label">Event Type:</strong>{" "}
                {Array.isArray(userProfile.event_type)
                  ? userProfile.event_type.join(", ")
                  : userProfile.event_type}{" "}
                &nbsp;
              </p>

              <p>
                <strong className="profile-label">Event Date:</strong>
                {new Date(userProfile.event_date).toLocaleDateString("en-US")}
              </p>
              <p>
                <strong className="profile-label">Budget:</strong>{" "}
                {userProfile.budget} JD
              </p>
              <p>
                <strong className="profile-label">City:</strong>{" "}
                {userProfile.city}
              </p>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="col-md-6 wow animate__fadeInRight">
          <div className="card p-3 shadow-sm box">
            <div className="d-flex justify-content-between">
              <h5 className="profile-subtitle">Account Details</h5>
              <i
                className="bi bi-pencil-fill cursor-pointer edit-icon"
                onClick={() => handleEditClick("account")}
              ></i>
            </div>
            <div>
              <p>
                <strong className="profile-label">Email:</strong>{" "}
                {userProfile.email}
              </p>
              <p>
                <strong className="profile-label">Password:</strong>{" "}
                {"************"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit{" "}
            {editingBox === "wedding" ? "Wedding Details" : "Account Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {editingBox === "wedding" ? (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={editModalData.name || ""}
                        onChange={(e) =>
                          setEditModalData({
                            ...editModalData,
                            name: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>

                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Partner's Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={editModalData.partner_name || ""}
                        onChange={(e) =>
                          setEditModalData({
                            ...editModalData,
                            partner_name: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        value={editModalData.phone || ""}
                        onChange={(e) =>
                          setEditModalData({
                            ...editModalData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        value={
                          editModalData.dob
                            ? new Date(editModalData.dob)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          setEditModalData({
                            ...editModalData,
                            dob: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                </div>

                <Form.Group>
                  <Form.Label>Event Type</Form.Label>
                  <div>
                    {["pre-wedding", "wedding", "honeymoon"].map((type) => (
                      <Form.Check
                        inline
                        key={type}
                        label={type}
                        type="checkbox"
                        value={type}
                        checked={editModalData.event_type?.includes(type)} // Check if the type is selected
                        onChange={handleEventTypeChange}
                      />
                    ))}
                  </div>
                </Form.Group>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Event Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={
                          editModalData.event_date
                            ? new Date(editModalData.event_date)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          setEditModalData({
                            ...editModalData,
                            event_date: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Budget</Form.Label>
                      <Form.Control
                        type="number"
                        value={editModalData.budget || ""}
                        onChange={(e) =>
                          setEditModalData({
                            ...editModalData,
                            budget: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                </div>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    value={editModalData.city || ""}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        city: e.target.value,
                      })
                    }
                  >
                    {cities.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={editModalData.email || ""}
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        current_password: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        new_password: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    onChange={(e) =>
                      setEditModalData({
                        ...editModalData,
                        new_password_confirmation: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
