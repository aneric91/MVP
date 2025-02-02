import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profil.css";

const paymentHistory = [
  { date: "2025-01-15", amount: "€10", status: "Paid" },
  { date: "2025-01-10", amount: "€20", status: "Paid" },
];

const ProfilePage = ({ onLogout }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    subscriptionPlan: "Standard",
    nextPaymentDate: "2025-02-15",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Logic to fetch user data from API or localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleOrderInputs = () => {
    navigate("/delivery-request"); // Redirects to the delivery request page
  };

  const handlePlanSelection = () => {
    navigate("/plan-selection"); // Redirects to the plan selection page
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    onLogout(); // Appelle la fonction de déconnexion de App.js
    navigate("/login", { replace: true }); // Redirection vers la page de login
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Subscription Plan:</strong> {user.subscriptionPlan}</p>
        <p><strong>Next Payment:</strong> {user.nextPaymentDate}</p>
      </div>

      <div className="payment-history">
        <h2>Payment History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, index) => (
              <tr key={index}>
                <td>{payment.date}</td>
                <td>{payment.amount}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="buttons-container">
        <div className="order-inputs">
          <h2>Order Inputs</h2>
          <button onClick={handleOrderInputs} className="order-button">
            Order Now
          </button>
        </div>

        <div className="plan-selection">
          <h2>Subscription Plan</h2>
          <button onClick={handlePlanSelection} className="plan-button">
            View My Subscription Plan
          </button>
        </div>
      </div>

      {/* Logout button */}
      <div className="logout-button-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
