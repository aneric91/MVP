// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Profil.css";

// const paymentHistory = [
//   { date: "2025-01-15", amount: "€10", status: "Paid" },
//   { date: "2025-01-10", amount: "€20", status: "Paid" },
// ];

// const ProfilePage = ({ onLogout }) => {
//   const [user, setUser] = useState({
//     name: "John Doe",
//     subscriptionPlan: "Standard",
//     nextPaymentDate: "2025-02-15",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Logic to fetch user data from API or localStorage
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const handleOrderInputs = () => {
//     navigate("/delivery-request"); // Redirects to the delivery request page
//   };

//   const handlePlanSelection = () => {
//     navigate("/plan-selection"); // Redirects to the plan selection page
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user"); // Remove user from localStorage
//     onLogout(); // Appelle la fonction de déconnexion de App.js
//     navigate("/login", { replace: true }); // Redirection vers la page de login
//   };

//   return (
//     <div className="profile-container">
//       <h1>My Profile</h1>

//       <div className="profile-info">
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Subscription Plan:</strong> {user.subscriptionPlan}</p>
//         <p><strong>Next Payment:</strong> {user.nextPaymentDate}</p>
//       </div>

//       <div className="payment-history">
//         <h2>Payment History</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Amount</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paymentHistory.map((payment, index) => (
//               <tr key={index}>
//                 <td>{payment.date}</td>
//                 <td>{payment.amount}</td>
//                 <td>{payment.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="buttons-container">
//         <div className="order-inputs">
//           <h2>Order Inputs</h2>
//           <button onClick={handleOrderInputs} className="order-button">
//             Order Now
//           </button>
//         </div>

//         <div className="plan-selection">
//           <h2>Subscription Plan</h2>
//           <button onClick={handlePlanSelection} className="plan-button">
//             View My Subscription Plan
//           </button>
//         </div>
//       </div>

//       {/* Logout button */}
//       <div className="logout-button-container">
//         <button className="logout-button" onClick={handleLogout}>Logout</button>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profil.css";

const ProfilePage = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fonction pour récupérer le profil de l'utilisateur depuis le backend
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found, please login.");
        return;
      }

      const response = await fetch("http://localhost:5000/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to fetch user profile.");
        return;
      }
      setUser(data);
      // Optionnel : stocker les données de l'utilisateur dans le localStorage
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Error fetching user profile.");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleOrderInputs = () => {
    navigate("/delivery-request");
  };

  const handlePlanSelection = () => {
    navigate("/plan-selection");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    onLogout(); // Appelle la fonction de déconnexion définie dans App.js
    navigate("/login", { replace: true });
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      {user ? (
        <>
          <div className="profile-info">
            <p><strong>Name:</strong> {user.name || "Not provided"}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            <p>
              <strong>Subscription Plan:</strong> {user.subscription?.name || "Not set"}
            </p>
            {user.nextPaymentDate && (
              <p>
                <strong>Next Payment:</strong> {new Date(user.nextPaymentDate).toLocaleDateString()}
              </p>
            )}
            <p>
              <strong>Balance:</strong> {user.balance !== undefined ? user.balance + " FCFA" : "N/A"}
            </p>
          </div>
  
          <div className="payment-history">
            <h2>Payment History</h2>
            {user.paymentHistory && user.paymentHistory.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {user.paymentHistory.map((payment, index) => (
                    <tr key={index}>
                      <td>{new Date(payment.date).toLocaleDateString()}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.payRef}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No payment history available.</p>
            )}
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
  
          <div className="logout-button-container">
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        !error && <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
