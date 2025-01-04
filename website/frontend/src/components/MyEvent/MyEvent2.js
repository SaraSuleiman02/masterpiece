import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MyEvent = () => {
  // Static data
  const countdown = { days: 336, hours: 3, minutes: 45 };
  const userName = "Sarah";
  const partnerName = "Yousef";
  const vendorsHired = 5;
  const totalVendors = 21;
  const tasksCompleted = 14;
  const totalTasks = 72;
  const guestsAttending = 50;
  const totalGuests = 100;
  const budgetSpent = 5000;
  const totalBudget = 15000;

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <section className="text-center mb-5">
        <div className="bg-light p-4 rounded shadow-sm">
          <h1 className="display-4 fw-bold">
            Welcome {userName} & {partnerName}
          </h1>
          <p className="lead text-muted">
            Your special day is just around the corner!
          </p>
          <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="bg-primary text-white rounded-circle p-4 shadow">
              <h2 className="mb-0">{countdown.days}</h2>
              <small>Days</small>
            </div>
            <div className="bg-secondary text-white rounded-circle p-4 shadow mx-3">
              <h2 className="mb-0">{countdown.hours}</h2>
              <small>Hours</small>
            </div>
            <div className="bg-dark text-white rounded-circle p-4 shadow">
              <h2 className="mb-0">{countdown.minutes}</h2>
              <small>Minutes</small>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Summary Section */}
      <section className="mb-5">
        <h2 className="text-center fw-bold mb-4">Progress Summary</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <div className="p-4 bg-light shadow-sm rounded">
              <h4>Vendors Hired</h4>
              <div className="progress-circle bg-primary text-white d-inline-flex justify-content-center align-items-center rounded-circle">
                {((vendorsHired / totalVendors) * 100).toFixed(0)}%
              </div>
              <p className="mt-2">
                {vendorsHired} of {totalVendors}
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-4 bg-light shadow-sm rounded">
              <h4>Checklist Progress</h4>
              <div className="progress-circle bg-secondary text-white d-inline-flex justify-content-center align-items-center rounded-circle">
                {((tasksCompleted / totalTasks) * 100).toFixed(0)}%
              </div>
              <p className="mt-2">
                {tasksCompleted} of {totalTasks}
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-4 bg-light shadow-sm rounded">
              <h4>Guests Attending</h4>
              <div className="progress-circle bg-dark text-white d-inline-flex justify-content-center align-items-center rounded-circle">
                {((guestsAttending / totalGuests) * 100).toFixed(0)}%
              </div>
              <p className="mt-2">
                {guestsAttending} of {totalGuests}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Overview Section */}
      <section className="mb-5">
        <h2 className="text-center fw-bold mb-4">Budget Overview</h2>
        <div className="bg-light p-4 shadow-sm rounded text-center">
          <h4>Total Budget: ${totalBudget}</h4>
          <p>Spent: ${budgetSpent}</p>
          <div className="progress" style={{ height: "1.5rem" }}>
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${(budgetSpent / totalBudget) * 100}%` }}
              aria-valuenow={(budgetSpent / totalBudget) * 100}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </section>

      {/* Visual Appeal Section */}
      <section className="text-center">
        <div className="p-5 bg-dark text-white rounded shadow">
          <h3 className="fw-bold">Your Dream Event Awaits</h3>
          <p className="lead">Plan, relax, and enjoy every moment.</p>
          <img
            src="https://via.placeholder.com/800x400"
            alt="Event visual"
            className="img-fluid rounded mt-3 shadow-sm"
          />
        </div>
      </section>
    </div>
  );
};

export default MyEvent;