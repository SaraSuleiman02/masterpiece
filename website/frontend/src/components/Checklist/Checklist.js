import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import Cookies from "js-cookie";
import WOW from "wow.js";
import "animate.css";
import "./Checklist.css";
import Swal from "sweetalert2";

function Checklist() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All"); // Filter: All, Done, To Do

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

  // Fetch checklist items
  const fetchChecklist = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/checklist/${userId}`);
      setTasks(response.data.checklist);
    } catch (error) {
      console.error("Error fetching checklist:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const response = await axiosInstance.post(`/checklist/add/${userId}`, {
        task: newTask,
      });
      setTasks([...tasks, response.data.checklist]);
      setNewTask("");
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "The task has been added successfully.",
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle task completion
  const toggleCompletion = async (taskId) => {
    try {
      const response = await axiosInstance.put(
        `/checklist/${userId}/${taskId}`
      );
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? { ...task, completed: response.data.checklist.completed }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/checklist/${taskId}`);
          setTasks(tasks.filter((task) => task.id !== taskId));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The task has been deleted successfully.",
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Something went wrong while deleting the task.",
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchChecklist();
  }, [userId]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  // Filter tasks
  const filteredTasks =
    filter === "Done"
      ? tasks.filter((task) => task.completed)
      : filter === "To Do"
      ? tasks.filter((task) => !task.completed)
      : tasks; // Default: All

  return (
    <div className="checklist-container container mt-4 pb-5">
      <div className="row">
        {/* Left Status Section */}
        <div className="col-md-3 wow animate__fadeInLeft">
          <h2 className="mb-3">Checklist</h2>

          <h5>Status</h5>
          <ul className="list-unstyled">
            <li
              className={`d-flex align-items-center ${
                filter === "All" ? "text-primary-pink" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setFilter("All")}
            >
              <span
                className="badge bg-secondary rounded-circle me-2"
                style={{ width: "10px", height: "10px" }}
              ></span>
              All <span className="ms-auto">{totalTasks}</span>
            </li>
            <li
              className={`d-flex align-items-center mb-2 ${
                filter === "Done" ? "text-primary-pink" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setFilter("Done")}
            >
              <span
                className="badge bg-success rounded-circle me-2"
                style={{ width: "10px", height: "10px" }}
              ></span>{" "}
              <span className="filter-circle done-circle"></span>
              Done <span className="ms-auto">{completedTasks}</span>
            </li>
            <li
              className={`d-flex align-items-center mb-2 ${
                filter === "To Do" ? "text-primary-pink" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setFilter("To Do")}
            >
              <span
                className="badge bg-warning rounded-circle me-2"
                style={{ width: "10px", height: "10px" }}
              ></span>{" "}
              <span className="filter-circle todo-circle"></span>
              To Do{" "}
              <span className="ms-auto">{totalTasks - completedTasks}</span>
            </li>
          </ul>
        </div>

        {/* Main Checklist Section */}
        <div className="col-md-9 wow animate__fadeInRight">
          <p>
            You have completed{" "}
            <span className="done-tasks">
              {completedTasks} out of {totalTasks}
            </span>{" "}
            tasks
          </p>
          <div className="progress mb-4" style={{ height: "8px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              aria-valuenow={completedTasks}
              aria-valuemin="0"
              aria-valuemax={totalTasks}
            ></div>
          </div>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className=" btn-primary-pink" onClick={addTask}>
              <i className="bi bi-plus"></i> Add Task
            </button>
          </div>

          <div className="list-group">
            {loading ? (
              <p>Loading...</p>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div
                    className="d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleCompletion(task.id)}
                  >
                    <div
                      className={`circle-checkbox ${
                        task.completed ? "completed" : ""
                      }`}
                    ></div>
                    <span
                      className={`ms-3 ${
                        task.completed
                          ? "text-decoration-line-through text-muted"
                          : ""
                      }`}
                    >
                      {task.task}
                    </span>
                  </div>
                  <i
                    className="bi bi-trash ms-3"
                    onClick={() => deleteTask(task.id)}
                  ></i>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checklist;
