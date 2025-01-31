import React, { useState } from "react";
import "../styles/InscriptionConnexion.css";

const InscriptionConnexion = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [surface, setSurface] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const regions = ["Cotonou", "Porto-Novo", "Parakou", "Abomey"];
  const surfaces = ["1-2 ha", "3-4 ha", "5+ ha"];

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[0-9]{8,15}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneSubmit = async () => {
    setError("");
    if (!validatePhone(phone)) {
      setError("Numéro de téléphone invalide");
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Envoi OTP à", phone);
      setStep(2);
    } catch (error) {
      setError("Erreur lors de l'envoi de l'OTP");
    }
  };

  const handleOtpSubmit = async () => {
    setError("");
    if (!otp || otp.length < 4) {
      setError("Code OTP invalide");
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep(3);
    } catch (error) {
      setError("Code OTP incorrect");
    }
  };

  const handleFinalSubmit = async () => {
    setError("");
    if (!name || !region || !surface) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const userData = { phone, name, region, surface };
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Utilisateur inscrit :", userData);
      setStep(4);
    } catch (error) {
      setError("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="inscription-container">
      <h2 className="inscription-title">Inscription & Connexion</h2>

      {error && <div className="error-message">{error}</div>}

      {step === 1 && (
        <div>
          <div className="form-group">
            <label className="form-label">
              Numéro de téléphone
              <span className="required">*</span>
            </label>
            <input
              type="tel"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: +22967000000"
            />
          </div>
          <button 
            className="form-button"
            onClick={handlePhoneSubmit}
          >
            Recevoir OTP
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="form-group">
            <label className="form-label">
              Code OTP
              <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              placeholder="Entrez le code reçu"
            />
          </div>
          <button 
            className="form-button"
            onClick={handleOtpSubmit}
          >
            Valider
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="form-group">
            <label className="form-label">
              Nom complet
              <span className="required">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom complet"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Région/Ville
              <span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">Sélectionner...</option>
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Taille de l'exploitation
              <span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
            >
              <option value="">Sélectionner...</option>
              {surfaces.map((surf) => (
                <option key={surf} value={surf}>
                  {surf}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="form-button"
            onClick={handleFinalSubmit}
          >
            S'inscrire
          </button>
        </div>
      )}

      {step === 4 && (
        <div className="success-message">
          <div>Inscription réussie !</div>
          <p>Vous allez être redirigé vers l'écran de choix du plan...</p>
        </div>
      )}
    </div>
  );
};

export default InscriptionConnexion;