import React, { useEffect, useState } from "react";
import "./profilecomponent.css";

function ProfileComponent() {
  const [currentUser, setCurrentUser] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: localStorage.getItem("user"),
    password: "",
    confirmPassword: "",
    selectedPlan: "Free",
  });

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      setCurrentUser(userFromLocalStorage);
      fetchData(userFromLocalStorage);
    }
  }, []);

  const fetchData = async (email) => {
    try {
      const response = await fetch("http://localhost:8080/getme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();

      setFormData({
        ...formData,
        name: data.user.name,
        selectedPlan: data.user.selectedPlan,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile data");
      }

      const responseData = await response.json();

      // Access the data from the response
      const { user, message } = responseData;
      setFormData({
        ...formData,
        name: user.name,
        selectedPlan: user.selectedPlan || "Free",
      });

      alert(message);
    } catch (error) {
      console.error("Error saving profile data:", error.message);
    }
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            disabled
            value={currentUser}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Subscription Plan:
          <select
            name="selectedPlan"
            value={formData.selectedPlan}
            onChange={handleInputChange}
          >
            <option value="Free">Free</option>
            <option value="Free">Silver</option>
            <option value="Free">Pro</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ProfileComponent;
