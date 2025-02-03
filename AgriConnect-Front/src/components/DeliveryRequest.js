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
        <h1 className="header-title">Delivery Request</h1>
        <p className="header-description">
          Choose the delivery method that suits you best to receive your agricultural inputs.
        </p>
      </div>

      {!showAddressForm ? (
        <div className="delivery-card">
          <div className="card-content">
            <div className="icon-container">
              <Truck className="truck-icon" />
            </div>
            <p className="delivery-description">
              We are committed to delivering your products as quickly as possible.
            </p>
            <button
              onClick={handleOrderClick}
              className="order-button"
            >
              Order Now
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
              Delivery Method
            </h2>

            <div className="delivery-options">
              <button
                className="delivery-option"
                onClick={() => handleSelection("Home Delivery")}
              >
                <div className="option-content">
                  <Home className="option-icon" />
                  <span className="option-text">Home Delivery</span>
                </div>
                <span className="option-arrow">→</span>
              </button>

              <button
                className="delivery-option"
                onClick={() => handleSelection("Pick up at Relay Point")}
              >
                <div className="option-content">
                  <MapPin className="option-icon" />
                  <span className="option-text">Relay Point</span>
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
