// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { CreditCard, Smartphone, Phone } from "lucide-react";
// import "../styles/PaymentPage.css";

// const PaymentPage = () => {
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [plan, setPlan] = useState(null);
//   const [amount, setAmount] = useState(1500000);
//   const [txnRef, setTxnRef] = useState("");

//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const planName = params.get("plan");
//     setPlan(planName);
    
//     const randomTxnRef = "txn_" + Math.random().toString(36).slice(2, 11);
//     setTxnRef(randomTxnRef);
//   }, [location]);

//   return (
//     <div className="payment-container">
//       <h1>Paiement sécurisé</h1>
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
//         <strong>Plan sélectionné :</strong> {plan ? plan : "Non spécifié"}
//       </p>

//       {selectedPayment && (
//         <form method="post" action="https://newwebpay.qa.interswitchng.com/collections/w/pay">
//           <input type="hidden" name="merchant_code" value="MX6072" />
//           <input type="hidden" name="pay_item_id" value="9405967" />
//           <input type="hidden" name="site_redirect_url" value="http://localhost:5000/delivery-request" />
//           <input type="hidden" name="txn_ref" value={txnRef} />
//           <input type="hidden" name="amount" value={amount} />
//           <input type="hidden" name="currency" value="566" />
//           <input type="submit" className="pay-button" value="Confirmer et payer" />
//         </form>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import '../styles/PaymentPage.css';

// const PaymentPage = () => {
//   const [amount, setAmount] = useState(1500000);
//   const [txnRef, setTxnRef] = useState('');
//   const [plan, setPlan] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const planName = params.get("plan");
//     setPlan(planName);

//     const randomTxnRef = 'txn_' + Math.random().toString(36).slice(2, 11);
//     setTxnRef(randomTxnRef);
//   }, [location]);

//   return (
//     <div className="payment-container">
//       <h1>Secure Payment</h1>
//       <p><strong>Selected Plan:</strong> {plan ? plan : "Not specified"}</p>

//       {plan && (
//         <form method="post" action="https://newwebpay.qa.interswitchng.com/collections/w/pay">
//           <input type="hidden" name="merchant_code" value="MX6072" />
//           <input type="hidden" name="pay_item_id" value="9405967" />
//           <input name="site_redirect_url" value="http://localhost:5000/delivery-request" type="hidden" />
//           <input type="hidden" name="txn_ref" value={txnRef} />
//           <input type="hidden" name="amount" value={amount} />
//           <input type="hidden" name="currency" value="566" />
          
//           <button type="submit" className="pay-button">
//             Proceed to Payment
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default PaymentPage;
import React, { useState, useEffect } from "react";
import "../styles/PaymentPage.css";

const PaymentPage = () => {
  const [amount, setAmount] = useState(1500000);
  const [txnRef, setTxnRef] = useState('');
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    // Essayer de récupérer l'objet user depuis le localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      // Si l'utilisateur a une propriété subscription peuplée, récupérer son nom
      if (user.subscription && user.subscription.name) {
        setPlan(user.subscription.name);
      }
    }
    
    // Génération d'une référence de transaction aléatoire
    const randomTxnRef = 'txn_' + Math.random().toString(36).slice(2, 11);
    setTxnRef(randomTxnRef);
  }, []);

  return (
    <div className="payment-container">
      <h1>Secure Payment</h1>
      <p><strong>Selected Plan:</strong> {plan ? plan : "Not specified"}</p>

      {plan && (
        <form method="post" action="https://newwebpay.qa.interswitchng.com/collections/w/pay">
          <input type="hidden" name="merchant_code" value="MX6072" />
          <input type="hidden" name="pay_item_id" value="9405967" />
          <input type="hidden" name="site_redirect_url" value="http://localhost:5000/delivery-request" />          
          <input type="hidden" name="txn_ref" value={txnRef} />
          <input type="hidden" name="amount" value={amount} />
          <input type="hidden" name="currency" value="566" />
          <button type="submit" className="pay-button">
            Proceed to Payment
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentPage;
