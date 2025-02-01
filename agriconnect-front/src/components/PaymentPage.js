import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, Phone } from "lucide-react";
import "../styles/PaymentPage.css";

const PaymentModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Entrez vos informations personnelles</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name, email);
          }}
        >
          <label>
            Nom:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">Valider</button>
        </form>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [plan, setPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planName = params.get("plan");
    setPlan(planName);
  }, [location]);

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Veuillez sélectionner un mode de paiement.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalSubmit = (name, email) => {
    alert(`Informations soumises: Nom - ${name}, Email - ${email}`);
    setIsModalOpen(false);
    navigate("/confirmation");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="payment-container">
      <h1>Paiement sécurisé</h1>
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
        <strong>Plan sélectionné :</strong> {plan ? plan : "Non spécifié"}
      </p>
      <button onClick={handlePayment} className="pay-button">
        Confirmer et payer
      </button>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default PaymentPage;
