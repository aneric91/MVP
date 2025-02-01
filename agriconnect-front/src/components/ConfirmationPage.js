import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import "../styles/ConfirmationPage.css"; 

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <CheckCircle className="check-icon" />
      <h2>Félicitations !</h2>
      <p>Votre abonnement est actif.</p>
      <button onClick={() => navigate("/delivery-request")} className="return-button">
       Demande de Livraison
      </button>
    </div>
  );
};

export default ConfirmationPage;
