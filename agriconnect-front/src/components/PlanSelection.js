// import React from "react";
// import { useNavigate } from "react-router-dom"; 
// import '../styles/PlanSelection.css';

// const plans = [
//   { name: "Basic", price: "€10", area: "Up to 4 hectares", includes: "Fertilizer + Seeds" },
//   { name: "Standard", price: "€20", area: "Up to 10 hectares", includes: "Fertilizer + Seeds + Pesticides" },
//   { name: "Premium", price: "€30", area: "Up to 20 hectares", includes: "All inputs + Dedicated support" },
// ];

// const PlanSelection = () => {
//   const navigate = useNavigate();

//   const handleSelection = (planName) => {
//     navigate(`/payment?plan=${planName}`);
//   };

//   return (
//     <div className="plans-container">
//       <div className="plans-wrapper">
//         <h1 className="plans-title">Choose Your Plan</h1>
        
//         <div className="plans-grid">
//           {plans.map((plan) => (
//             <div key={plan.name} className="plan-card">
//               <div className="price-banner">
//                 {plan.price}/month
//               </div>
              
//               <div className="plan-content">
//                 <h2 className="plan-name">{plan.name}</h2>
                
//                 <div className="features-list">
//                   <div className="feature-item">
//                     <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                     {plan.area}
//                   </div>
                  
//                   <div className="feature-item">
//                     <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                     {plan.includes}
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => handleSelection(plan.name)}
//                   className="select-button"
//                 >
//                   Select
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default PlanSelection;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PlanSelection.css";

const plans = [
  { name: "Basic", price: "€10", area: "Up to 4 hectares", includes: "Fertilizer + Seeds" },
  { name: "Standard", price: "€20", area: "Up to 10 hectares", includes: "Fertilizer + Seeds + Pesticides" },
  { name: "Premium", price: "€30", area: "Up to 20 hectares", includes: "All inputs + Dedicated support" },
];

const PlanSelection = () => {
  const navigate = useNavigate();

  const handleSelection = async (planName) => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user")); // Récupération correcte de l'objet user
      
      if (!token || !user || !user._id) {
        alert("You must be logged in to select a plan.");
        return;
      }
      
      const userId = user._id; // Extraction de l'ID utilisateur
      
      const subscriptionIds = {
        "Basic": "679fd2a084bd383edbded181",
        "Standard": "679fd2a084bd383edbded182",
        "Premium": "679fd2a084bd383edbded183",
      };
      
      const subscriptionId = subscriptionIds[planName];
      if (!subscriptionId) {
        alert("Invalid plan selected.");
        return;
      }
      
      const response = await fetch("http://localhost:5000/subscriptions/choose", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId, subscriptionId })
      });
      
      const data = await response.json();
      if (!response.ok) {
        alert(data.error);
        return;
      }
      
      alert("Plan selected successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error selecting plan:", error);
      alert("Error selecting plan.");
    }
  };
  
  return (
    <div className="plans-container">
      <div className="plans-wrapper">
        <h1 className="plans-title">Choose Your Plan</h1>
        <div className="plans-grid">
          {plans.map((plan) => (
            <div key={plan.name} className="plan-card">
              <div className="price-banner">{plan.price}/month</div>
              <div className="plan-content">
                <h2 className="plan-name">{plan.name}</h2>
                <div className="features-list">
                  {[plan.area, plan.includes].map((feature, index) => (
                    <div key={index} className="feature-item">
                      <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
                <button onClick={() => handleSelection(plan.name)} className="select-button">
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
