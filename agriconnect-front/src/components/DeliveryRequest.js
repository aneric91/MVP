import React, { useState } from "react";
import { Truck, Home, MapPin, X } from "lucide-react";
import '../styles/DeliveryRequest.css';
import DeliveryAddressForm from './DeliveryAddressForm'; 

const DeliveryRequest = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleOrderClick = () => {
    setShowPopup(true);
  };

  const handleSelection = (option) => {
    setSelectedOption(option);
    setShowPopup(false);
    setShowAddressForm(true);
  };

  return (
    <div className="delivery-container">
      <div className="delivery-header">
        <h1 className="header-title">Demande de Livraison</h1>
        <p className="header-description">
          Choisissez le mode de livraison qui vous convient le mieux pour recevoir vos intrants agricoles
        </p>
      </div>

      {!showAddressForm ? (
        <div className="delivery-card">
          <div className="card-content">
            <div className="icon-container">
              <Truck className="truck-icon" />
            </div>
            <p className="delivery-description">
              Nous nous engageons à livrer vos produits dans les meilleurs délais
            </p>
            <button
              onClick={handleOrderClick}
              className="order-button"
            >
              Commander maintenant
            </button>
          </div>
        </div>
      ) : (
        <DeliveryAddressForm 
          deliveryType={selectedOption} 
          onBack={() => setShowAddressForm(false)}
        />
      )}

      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setShowPopup(false)}
              className="close-button"
            >
              <X />
            </button>
            
            <h2 className="modal-title">
              Mode de livraison
            </h2>
            
            <div className="delivery-options">
              <button
                className="delivery-option"
                onClick={() => handleSelection("Livraison à domicile")}
              >
                <div className="option-content">
                  <Home className="option-icon" />
                  <span className="option-text">Livraison à domicile</span>
                </div>
                <span className="option-arrow">→</span>
              </button>
              
              <button
                className="delivery-option"
                onClick={() => handleSelection("Récupérer en point relais")}
              >
                <div className="option-content">
                  <MapPin className="option-icon" />
                  <span className="option-text">Point relais</span>
                </div>
                <span className="option-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryRequest;