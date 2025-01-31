// import React, { useState } from 'react';
// import { MapPin, Navigation } from 'lucide-react';
// import '../styles/DeliveryAddressForm.css'; // Import du CSS externe

// const DeliveryAddressForm = () => {
//   const [address, setAddress] = useState({
//     street: '',
//     city: '',
//     region: '',
//     phone: '',
//     additionalInfo: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddress(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleGeolocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         () => setUseGeolocation(true),
//         (error) => alert("Erreur de géolocalisation: " + error.message)
//       );
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Validation et soumission du formulaire
//   };

//   return (
//     <div className="delivery-form-container">
//       <div className="form-header">
//         <MapPin className="icon" />
//         <h2>Adresse de livraison</h2>
//       </div>

//       <form onSubmit={handleSubmit} className="form-content">
//         <div className="geo-button-container">
//           <button type="button" onClick={handleGeolocation} className="geo-button">
//             <Navigation className="icon-small" />
//             Utiliser ma position
//           </button>
//         </div>

//         <div className="form-group">
//           <label>Rue</label>
//           <input type="text" name="street" value={address.street} onChange={handleChange} required />
//         </div>

//         <div className="form-group-row">
//           <div className="form-group">
//             <label>Ville</label>
//             <input type="text" name="city" value={address.city} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Région</label>
//             <input type="text" name="region" value={address.region} onChange={handleChange} required />
//           </div>
//         </div>

//         <div className="form-group">
//           <label>Téléphone</label>
//           <input type="tel" name="phone" value={address.phone} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Instructions supplémentaires</label>
//           <textarea name="additionalInfo" value={address.additionalInfo} onChange={handleChange} rows="3"></textarea>
//         </div>

//         <button type="submit" className="submit-button">Confirmer l'adresse</button>
//       </form>
//     </div>
//   );
// };

// export default DeliveryAddressForm;
import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

const DeliveryAddressForm = ({ deliveryType, onBack }) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    region: '',
    phone: '',
    additionalInfo: ''
  });
  const [isGeolocating, setIsGeolocating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      setIsGeolocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Ici vous pourriez intégrer un service de géocodage inverse
          console.log(position.coords.latitude, position.coords.longitude);
          setIsGeolocating(false);
        },
        (error) => {
          alert("Erreur de géolocalisation: " + error.message);
          setIsGeolocating(false);
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traitement du formulaire
    console.log('Adresse soumise:', address);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      {/* En-tête avec option de retour */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MapPin className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-2xl font-semibold text-green-800">Adresse de livraison</h2>
        </div>
        <button 
          onClick={onBack}
          className="text-green-600 hover:text-green-700"
        >
          Retour
        </button>
      </div>

      {/* Type de livraison sélectionné */}
      <div className="mb-6 p-3 bg-green-50 rounded-lg">
        <p className="text-green-800">Mode sélectionné : {deliveryType}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Bouton de géolocalisation */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleGeolocation}
            className="flex items-center text-green-600 hover:text-green-700"
            disabled={isGeolocating}
          >
            <Navigation className="w-4 h-4 mr-1" />
            {isGeolocating ? 'Localisation...' : 'Utiliser ma position'}
          </button>
        </div>

        {/* Champs du formulaire */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rue
            </label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ville
              </label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Région
              </label>
              <input
                type="text"
                name="region"
                value={address.region}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions supplémentaires
            </label>
            <textarea
              name="additionalInfo"
              value={address.additionalInfo}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Confirmer l'adresse
        </button>
      </form>
    </div>
  );
};

export default DeliveryAddressForm;