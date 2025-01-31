import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, Phone } from "lucide-react";
import "../styles/PaymentPage.css"; // Assure-toi d'avoir ce fichier CSS

const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Veuillez sélectionner un mode de paiement.");
      return;
    }

    // Simule un paiement réussi (tu remplaceras ça par la logique Interswitch)
    setTimeout(() => {
      navigate("/confirmation");
    }, 2000); // Redirection après 2 secondes
  };

  return (
    <div className="payment-container">
      <h2>Paiement sécurisé</h2>
      <p>Choisissez votre mode de paiement :</p>

      <div className="payment-options">
        <button
          className={`payment-button ${selectedPayment === "mobile" ? "selected" : ""}`}
          onClick={() => setSelectedPayment("mobile")}
        >
          <Smartphone className="icon" />
          Mobile Money (MTN, Airtel)
        </button>

        <button
          className={`payment-button ${selectedPayment === "card" ? "selected" : ""}`}
          onClick={() => setSelectedPayment("card")}
        >
          <CreditCard className="icon" />
          Carte Bancaire (Visa, Mastercard)
        </button>

        <button
          className={`payment-button ${selectedPayment === "ussd" ? "selected" : ""}`}
          onClick={() => setSelectedPayment("ussd")}
        >
          <Phone className="icon" />
          Paiement USSD
        </button>
      </div>

      <p className="payment-summary">
        <strong>Plan sélectionné :</strong> Abonnement Premium
      </p>
      <p className="payment-amount">
        <strong>Montant :</strong> 10 000 FCFA
      </p>

      <button onClick={handlePayment} className="pay-button">
        Confirmer et payer
      </button>
    </div>
  );
};

export default PaymentPage;
