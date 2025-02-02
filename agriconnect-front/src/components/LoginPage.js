import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!phone || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const loginData = { phone, password };
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Login attempt:", loginData);
      navigate("/dashboard");
    } catch (error) {
      setError("Error during login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <h1 className="app-title">AgriConnect</h1>
          <p className="app-subtitle">Let's grow the future together</p>
        </div>

        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-container">
          <div className="form-group">
            <label>
              <i className="icon phone-icon"></i>
              Phone Number*
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: +22967000000"
            />
          </div>

          <div className="form-group">
            <label>
              <i className="icon lock-icon"></i>
              Password*
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </div>

          <button className="submit-button" onClick={handleLogin}>
            Log in
          </button>

          <div className="signup-link">
            Not a member yet? <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
