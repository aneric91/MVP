// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CreditCard, Smartphone, Phone } from "lucide-react";
// import "../styles/PaymentPage.css"; // Assure-toi d'avoir ce fichier CSS

// const PaymentPage = () => {
//   const navigate = useNavigate();
//   const [selectedPayment, setSelectedPayment] = useState(null);

//   const handlePayment = () => {
//     if (!selectedPayment) {
//       alert("Veuillez sélectionner un mode de paiement.");
//       return;
//     }

//     // Simule un paiement réussi (tu remplaceras ça par la logique Interswitch)
//     setTimeout(() => {
//       navigate("/confirmation");
//     }, 2000); // Redirection après 2 secondes
//   };

//   return (
//     <div className="payment-container">
//       <h2>Paiement sécurisé</h2>
//       <p>Choisissez votre mode de paiement :</p>

//       <div className="payment-options">
//         <button
//           className={`payment-button ${selectedPayment === "mobile" ? "selected" : ""}`}
//           onClick={() => setSelectedPayment("mobile")}
//         >
//           <Smartphone className="icon" />
//           Mobile Money (MTN, Airtel)
//         </button>

//         <button
//           className={`payment-button ${selectedPayment === "card" ? "selected" : ""}`}
//           onClick={() => setSelectedPayment("card")}
//         >
//           <CreditCard className="icon" />
//           Carte Bancaire (Visa, Mastercard)
//         </button>

//         <button
//           className={`payment-button ${selectedPayment === "ussd" ? "selected" : ""}`}
//           onClick={() => setSelectedPayment("ussd")}
//         >
//           <Phone className="icon" />
//           Paiement USSD
//         </button>
//       </div>

//       <p className="payment-summary">
//         <strong>Plan sélectionné :</strong> Abonnement Premium
//       </p>
//       <p className="payment-amount">
//         <strong>Montant :</strong> 10 000 FCFA
//       </p>

//       <button onClick={handlePayment} className="pay-button">
//         Confirmer et payer
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, Phone } from "lucide-react";
import "../styles/PaymentPage.css"; // Assure-toi d'avoir ce fichier CSS

// Composant pour afficher le formulaire de paiement dans le modale
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
  const [isModalOpen, setIsModalOpen] = useState(false); // Gérer l'ouverture du modale

  const location = useLocation();

  useEffect(() => {
    // Récupérer le paramètre 'plan' de l'URL
    const params = new URLSearchParams(location.search);
    const planName = params.get("plan");
    setPlan(planName);
  }, [location]);

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Veuillez sélectionner un mode de paiement.");
      return;
    }

    // Ouvre le modale pour saisir les informations personnelles
    setIsModalOpen(true);
  };

  const handleModalSubmit = (name, email) => {
    alert(`Informations soumises: Nom - ${name}, Email - ${email}`);
    setIsModalOpen(false); // Fermer le modale après soumission
    navigate("/confirmation"); // Rediriger après la soumission
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Fermer le modale
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
        <strong>Plan sélectionné :</strong> {plan ? plan : "Non spécifié"}
      </p>
      <p className="payment-amount">
        <strong>Montant :</strong> 10 000 FCFA
      </p>

      <button onClick={handlePayment} className="pay-button">
        Confirmer et payer
      </button>

      {/* Affichage du modale */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default PaymentPage;
