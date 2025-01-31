import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlanSelection from "./components/PlanSelection";
import PaymentPage from "./components/PaymentPage";
import ConfirmationPage from "./components/ConfirmationPage";
import InscriptionConnexion from "./components/InscriptionConnexion";
import DeliveryAddressForm from "./components/DeliveryAddressForm";
import DeliveryRequest from "./components/DeliveryRequest";
import "./App.css"; // Assure-toi que ce fichier existe

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InscriptionConnexion />} />
        <Route path="/plan-selection" element={<PlanSelection />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/delivery-address" element={<DeliveryAddressForm />} />
        <Route path="/delivery-request" element={<DeliveryRequest />} />
      </Routes>
    </Router>
  );
}

export default App;
