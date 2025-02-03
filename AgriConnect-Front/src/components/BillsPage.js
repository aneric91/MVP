import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BillsPage = () => {
  // State for data from backend
  const [categories, setCategories] = useState([]);
  const [billers, setBillers] = useState([]);
  const [paymentItems, setPaymentItems] = useState([]);

  // Selection states
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedBillerId, setSelectedBillerId] = useState(null);
  const [selectedPaymentItem, setSelectedPaymentItem] = useState(null);

  // Customer details form state
  const [customerId, setCustomerId] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [amount, setAmount] = useState('');

  // Responses for validation and payment
  const [validationResponse, setValidationResponse] = useState(null);
  const [paymentResponse, setPaymentResponse] = useState(null);

  // States to control dropdown visibility
  const [showCategories, setShowCategories] = useState(true);
  const [showBillers, setShowBillers] = useState(false);
  const [showPaymentItems, setShowPaymentItems] = useState(false);

  // 1. Fetch biller categories on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/categories')
      .then(res => {
        if (res.data && res.data.BillerCategories) {
          setCategories(res.data.BillerCategories);
        } else {
          console.error("Unexpected response structure:", res.data);
          setCategories([]);
        }
      })
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const handleCategoryClick = (categoryId) => {
    console.log("Selected Category ID:", categoryId);
    setSelectedCategoryId(categoryId);
    // Fermer le menu des catégories
    setShowCategories(false);
    // Réinitialiser les étapes suivantes
    setBillers([]);
    setPaymentItems([]);
    setSelectedBillerId(null);
    setSelectedPaymentItem(null);
    setValidationResponse(null);
    setPaymentResponse(null);
    // Fermer les menus inférieurs s'ils étaient ouverts
    setShowBillers(false);
    setShowPaymentItems(false);

    axios.get(`http://localhost:3000/billers/${categoryId}`)
      .then(res => {
        console.log("Billers API Response:", res.data);
        if (!res.data || !res.data.BillerList || !Array.isArray(res.data.BillerList.Category)) {
          console.error("Invalid API response: Missing BillerList or Category");
          setBillers([]);
          return;
        }

        // Chercher le bon objet catégorie (ou prendre le premier)
        const categoryObj = res.data.BillerList.Category.find(
          cat => cat.Id === categoryId || cat.Id === Number(categoryId)
        ) || res.data.BillerList.Category[0];

        if (!categoryObj || !categoryObj.Billers) {
          alert("No billers found for the selected category.");
          setBillers([]);
          return;
        }
        console.log("Category billers list:", categoryObj.Billers);
        setBillers(categoryObj.Billers);
        // Ouvrir le menu des billers
        setShowBillers(true);
      })
      .catch(err => {
        console.error("Error fetching billers:", err.message);
        setBillers([]); 
      });
  };

  // 3. When a biller is clicked, fetch the payment items for that biller and close the biller menu.
  const handleBillerClick = (billerId) => {
    console.log("Selected Biller ID:", billerId);
    setSelectedBillerId(billerId);
    // Fermer le menu des billers
    setShowBillers(false);
    setPaymentItems([]);
    setSelectedPaymentItem(null);
    setValidationResponse(null);
    setPaymentResponse(null);
    // Fermer le menu des payment items s'il était ouvert
    setShowPaymentItems(false);

    axios.get(`http://localhost:3000/biller/${billerId}/items`)
      .then(res => {
        console.log("Payment Items API Response:", res.data);
        if (res.data && res.data.PaymentItems) {
          setPaymentItems(res.data.PaymentItems);
          // Ouvrir le menu des payment items
          setShowPaymentItems(true);
        } else {
          console.error("Unexpected payment items format:", res.data);
          setPaymentItems([]);
        }
      })
      .catch(err => console.error("Error fetching payment items:", err));
  };

  // 4. When a payment item is clicked, store the selection and close the payment items menu.
  const handlePaymentItemClick = (item) => {
    console.log("Selected Payment Item:", item);
    setSelectedPaymentItem(item);
    // Fermer le menu des payment items
    setShowPaymentItems(false);
  };

  // 5. Customer validation
  const handleValidateCustomer = () => {
    if (!selectedPaymentItem) {
      alert("Please select a payment item first.");
      return;
    }
    const payload = {
      customerId,
      paymentCode: selectedPaymentItem.PaymentCode 
    };
    axios.post('http://localhost:3000/validate-customer', payload)
      .then(res => {
        if (res.data.message) {
            alert(res.data.message);
            return;
        }
        setValidationResponse(res.data);
        console.log(res.data);
        alert(res.data.ResponseCodeGrouping);
        /* console.log("Customer Validation Response:", res.data); */
      })
      .catch(err => {
        console.error("Error validating customer:", err);
        const errorMessage = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
        alert("Error in Customer Validation");
      });
  };

  // 6. Bill payment advice
  const handleBillPaymentAdvice = () => {
    if (!selectedPaymentItem) {
      alert("Please select a payment item first.");
      return;
    }
    const payload = {
      paymentCode: selectedPaymentItem.PaymentCode,
      customerId,
      customerMobile,
      customerEmail,
      amount
    };
      axios.post('http://localhost:3000/bill-payment', payload)
      .then(res => {
        setPaymentResponse(res.data);
        console.log("Bill Payment Advice Response:", res.data);
        alert(res.data.ResponseCodeGrouping);
      })
      .catch(err => {
        console.error("Error in bill payment advice:", err);
        const errorMessage = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
        alert("Error in bill payment : Please retry later!");
      });
  };

  return (
    <div className="container">
      {/* Dropdown for categories */}
      <div className="dropdown">
        <button className="dropdown-toggle" onClick={() => setShowCategories(!showCategories)}>
          Select a Biller Category
        </button>
        {showCategories && (
          <ul className="dropdown-menu">
            {categories.map(cat => (
              <li key={cat.Id}>
                <button onClick={() => handleCategoryClick(cat.Id)}>
                  {cat.Name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dropdown for billers */}
      {billers.length > 0 && (
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={() => setShowBillers(!showBillers)}>
            Select a Biller
          </button>
          {showBillers && (
            <ul className="dropdown-menu">
              {billers.map(biller => (
                <li key={biller.Id}>
                  <button onClick={() => handleBillerClick(biller.Id)}>
                    {biller.Name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Dropdown for payment items */}
      {paymentItems.length > 0 && (
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={() => setShowPaymentItems(!showPaymentItems)}>
            Select a Payment Item
          </button>
          {showPaymentItems && (
            <ul className="dropdown-menu">
              {paymentItems.map(item => (
                <li key={item.Id}>
                  <button onClick={() => handlePaymentItemClick(item)}>
                    {item.Name} - {item.Description}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Customer details form & actions */}
      {selectedPaymentItem && (
        <div className="customer-form">
          <h2>Customer Validation & Bill Payment</h2>
          <div>
            <label>
              Customer ID:
              <input
                type="text"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Mobile:
              <input
                type="text"
                value={customerMobile}
                onChange={(e) => setCustomerMobile(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
          </div>
          <div className="action-buttons">
            <button onClick={handleValidateCustomer}>Validate Customer</button>
            <button onClick={handleBillPaymentAdvice}>Confirm Bill Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillsPage;
