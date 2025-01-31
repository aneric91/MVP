import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import "../styles/ConfirmationPage.css"; // Assure-toi d'avoir le fichier CSS

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <CheckCircle className="check-icon" />
      <h2>Félicitations !</h2>
      <p>Votre abonnement est actif.</p>
      <button onClick={() => navigate("/")} className="return-button">
        Retour à l'accueil
      </button>
    </div>
  );
};

export default ConfirmationPage;
