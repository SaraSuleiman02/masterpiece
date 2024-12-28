import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Modal, Button, Form, Table, Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import WOW from "wow.js";
import "animate.css";
import "./GuestList.css";
import Guests from "../../assets/imgs/guests2.png";
import Rsvp from "../../assets/imgs/rsvp.png";

function GuestList() {
  const [guests, setGuests] = useState([]);
  const [guestGroups, setGuestGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
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

  const userId = Cookies.get("user_id");

  const [formGuest, setFormGuest] = useState({
    user_id: userId,
    name: "",
    phone: "",
    attendance: "Pending",
    guestGroup_id: "",
  });
  const [formGroup, setFormGroup] = useState({ name: "" });

  useEffect(() => {
    fetchGuestData();
    fetchGuestGroups();
  }, []);

  const fetchGuestData = async () => {
    try {
      const response = await axiosInstance.get(`/guestlist/${userId}`);
      const guests = response.data.guestlists;
      const updatedGuests = guests.map(guest => ({
        ...guest,
        phone: `0${guest.phone}`
      }));
      setGuests(updatedGuests);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const fetchGuestGroups = async () => {
    try {
      const response = await axiosInstance.get("/guestgroups");
      setGuestGroups(response.data);
    } catch (error) {
      console.error("Error fetching guest groups", error);
    }
  };

  const handleGuestSubmit = async () => {
    try {
      if (selectedGuest) {
        await axiosInstance.put(`/guestlist/${selectedGuest.id}`, formGuest);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Guest updated successfully.",
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        await axiosInstance.post("/guestlist/add", formGuest);
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Guest Added successfully.",
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
      setShowGuestModal(false);
      fetchGuestData();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const handleGroupSubmit = async () => {
    try {
      if (selectedGroup) {
        await axiosInstance.put(`/guestgroups/${selectedGroup.id}`, formGroup);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Group updated successfully.",
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        await axiosInstance.post("/guestgroups", formGroup);
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Group added successfully.",
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
      setShowGroupModal(false);
      fetchGuestGroups();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const handleDeleteGuest = async (guestId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/guestlist/${guestId}`);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Guest has been deleted.",
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });

          fetchGuestData();
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Something went wrong!";
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: errorMessage,
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  const filteredGuests = guests.filter((guest) =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalGuests = guests.length;
  const attendingCount = guests.filter(
    (guest) => guest.attendance === "Attending"
  ).length;
  const pendingCount = guests.filter(
    (guest) => guest.attendance === "Pending"
  ).length;
  const cancelledCount = guests.filter(
    (guest) => guest.attendance === "Cancelled"
  ).length;

  return (
    <div className="guest-container container mt-5 mb-5">
      <h1>Guest List</h1>
      {/* Attendance Overview Section */}
      <div className="attendance-overview mb-4 p-3 d-flex justify-content-evenly wow animate__fadeInDown">
        <div className="total-guests d-flex">
          <img src={Guests} alt="Guests" />
          <div className="text-center">
            <h4>{totalGuests}</h4>
            <p>Guests</p>
          </div>
        </div>

        <div className="d-flex  rsvp-wrapper ps-5">
          <img src={Rsvp} alt="Rsvp" />
          <div className="text-center">
            <h4>{attendingCount}</h4>
            <p>Attending</p>
          </div>

          <div className="sub-text text-center d-flex flex-column ms-3">
            <div className="d-flex">
              <h4>{pendingCount} &nbsp;</h4>
              <p>Pending</p>
            </div>
            <div className="d-flex">
              <h4>{cancelledCount} &nbsp;</h4>
              <p>Cancelled</p>
            </div>
          </div>
        </div>
      </div>

      <div className="guests-container wow animate__fadeInUp">
        {/* Buttons and Search */}
        <div className="guest-head d-flex justify-content-between align-items-center mb-4 p-2">
          <div>
            <button
              className="me-2 p-2 btn-primary-pink"
              onClick={() => setShowGuestModal(true)}
            >
              + Guest
            </button>
            <button
              className="me-2 p-2 btn-primary-white"
              onClick={() => setShowGroupModal(true)}
            >
              + Group
            </button>
          </div>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search guests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {guestGroups
          .filter(
            (group) =>
              filteredGuests.filter((guest) => guest.guestGroup_id === group.id)
                .length > 0
          )
          .map((group) => (
            <div key={group.id} className="guest-body mb-4 p-3">
              <h5 className="group d-flex justify-content-between align-items-center">
                {group.name}
                <span className="text-muted">
                  {
                    filteredGuests.filter(
                      (guest) => guest.guestGroup_id === group.id
                    ).length
                  }
                </span>
              </h5>
              <Table className="table table-borderless">
                <tbody>
                  {filteredGuests
                    .filter((guest) => guest.guestGroup_id === group.id)
                    .map((guest) => (
                      <tr key={guest.id}>
                        <td style={{ width: "30%" }}>{guest.name}</td>
                        <td style={{ width: "20%" }}>{guest.phone}</td>
                        <td style={{ width: "30%" }}>
                          <Dropdown>
                            <Dropdown.Toggle variant="light" className="p-0">
                              <span
                                className={`badge ${
                                  guest.attendance === "Attending"
                                    ? "bg-success"
                                    : guest.attendance === "Pending"
                                    ? "bg-warning"
                                    : "bg-danger"
                                }`}
                              >
                                {guest.attendance}
                              </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {["Attending", "Pending", "Cancelled"].map(
                                (status) => (
                                  <Dropdown.Item
                                    key={status}
                                    onClick={async () => {
                                      await axiosInstance.put(
                                        `/guestlist/${guest.id}`,
                                        {
                                          attendance: status,
                                        }
                                      );
                                      fetchGuestData();
                                      Swal.fire({
                                        icon: "success",
                                        title: "Updated!",
                                        text: "Attendance updated successfully.",
                                        toast: true,
                                        position: "bottom-end",
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                      });
                                    }}
                                  >
                                    {status}
                                  </Dropdown.Item>
                                )
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td style={{ width: "20%" }}>
                          <Dropdown>
                            <Dropdown.Toggle variant="light">
                              ...
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => {
                                  setSelectedGuest(guest);
                                  setFormGuest(guest);
                                  setShowGuestModal(true);
                                }}
                              >
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleDeleteGuest(guest.id)}
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          ))}
      </div>

      {/* Guest Modal */}
      <Modal
        show={showGuestModal}
        onHide={() => {
          setShowGuestModal(false);
          setSelectedGuest(null);
          setFormGuest({
            user_id: userId,
            name: "",
            phone: "",
            attendance: "Pending",
            guestGroup_id: "",
          });
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedGuest ? "Edit Guest" : "Add Guest"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="guestName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter guest name"
                value={formGuest.name}
                onChange={(e) =>
                  setFormGuest({ ...formGuest, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="guestPhone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone number"
                value={formGuest.phone}
                onChange={(e) =>
                  setFormGuest({ ...formGuest, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="guestAttendance" className="mb-3">
              <Form.Label>Attendance</Form.Label>
              <Form.Select
                value={formGuest.attendance}
                onChange={(e) =>
                  setFormGuest({ ...formGuest, attendance: e.target.value })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Attending">Attending</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="guestGroup" className="mb-3">
              <Form.Label>Group</Form.Label>
              <Form.Select
                value={formGuest.guestGroup_id}
                onChange={(e) =>
                  setFormGuest({ ...formGuest, guestGroup_id: e.target.value })
                }
              >
                <option value="">Unassigned</option>
                {guestGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowGuestModal(false);
              setSelectedGuest(null);
              setFormGuest({
                user_id: userId,
                name: "",
                attendance: "Pending",
                guestGroup_id: "",
              });
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleGuestSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Group Modal */}
      <Modal
        show={showGroupModal}
        onHide={() => {
          setShowGroupModal(false);
          setSelectedGroup(null);
          setFormGroup({ name: "" });
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedGroup ? "Edit Group" : "Add Group"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="groupName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter group name"
                value={formGroup.name}
                onChange={(e) =>
                  setFormGroup({ ...formGroup, name: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowGroupModal(false);
              setSelectedGroup(null);
              setFormGroup({ name: "" });
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleGroupSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default GuestList;
