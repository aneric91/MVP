import React from "react";
import '../styles/PlanSelection.css';

const plans = [
  { name: "Basic", price: "10€", area: "Jusqu'à 4 hectares", includes: "Engrais + Semences" },
  { name: "Standard", price: "20€", area: "Jusqu'à 10 hectares", includes: "Engrais + Semences + Pesticides" },
  { name: "Premium", price: "30€", area: "Jusqu'à 20 hectares", includes: "Tous les intrants + Support dédié" },
];

const PlanSelection = () => {
  const handleSelection = (planName) => {
    alert(`Vous avez sélectionné le plan ${planName}`);
  };

  return (
    <div className="plans-container">
      <div className="plans-wrapper">
        <h1 className="plans-title">Choisissez votre plan</h1>
        
        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div key={plan.name} className="plan-card">
              <div className="price-banner">
                {plan.price}/mois
              </div>
              
              <div className="plan-content">
                <h2 className="plan-name">{plan.name}</h2>
                
                <div className="features-list">
                  <div className="feature-item">
                    <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {plan.area}
                  </div>
                  
                  <div className="feature-item">
                    <svg className="check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {plan.includes}
                  </div>
                </div>

                <button
                  onClick={() => handleSelection(plan.name)}
                  className="select-button"
                >
                  Sélectionner
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