// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Signup.css";

// const SignupPage = () => {
//   const [phone, setPhone] = useState("");
//   const [name, setName] = useState("");
//   const [region, setRegion] = useState("");
//   const [surface, setSurface] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [step, setStep] = useState(1);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const regions = ["Cotonou", "Porto-Novo", "Parakou", "Abomey"];
//   const surfaces = ["1-2 ha", "3-4 ha", "5+ ha"];

//   const validatePhone = (phone) => {
//     const phoneRegex = /^\+?[0-9]{8,15}$/;
//     return phoneRegex.test(phone);
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async () => {
//     setError("");
//     if (!validatePhone(phone) || !name || !region || !surface || !email || !password) {
//       setError("Please fill in all the required fields with valid data.");
//       return;
//     }

//     if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     try {
//       const userData = { phone, name, region, surface, email, password };
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       console.log("User registered:", userData);

//       // Update authentication state
//       localStorage.setItem("isAuthenticated", "true");

//       setStep(2);

//       setTimeout(() => {
//         navigate("/plan-selection");
//       }, 2000);
//     } catch (error) {
//       setError("Error during registration");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-card">
//         <div className="logo-container">
//           <h1 className="app-title">AgriConnect</h1>
//           <p className="app-subtitle">Let's grow the future together</p>
//         </div>
        
//         <h2>Sign Up</h2>
//         {error && <div className="error-message">{error}</div>}
        
//         {step === 1 && (
//           <div className="form-container">
//             <div className="form-group">
//               <label>
//                 <i className="icon phone-icon"></i>
//                 Phone Number*
//               </label>
//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="Ex: +22967000000"
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <i className="icon user-icon"></i>
//                 Full Name*
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Your full name"
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <i className="icon email-icon"></i>
//                 Email*
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="example@email.com"
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <i className="icon lock-icon"></i>
//                 Password*
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Your password"
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 <i className="icon location-icon"></i>
//                 Region/City*
//               </label>
//               <select value={region} onChange={(e) => setRegion(e.target.value)}>
//                 <option value="">Select...</option>
//                 {regions.map((reg) => (
//                   <option key={reg} value={reg}>{reg}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label>
//                 <i className="icon field-icon"></i>
//                 Farm Size*
//               </label>
//               <select value={surface} onChange={(e) => setSurface(e.target.value)}>
//                 <option value="">Select...</option>
//                 {surfaces.map((surf) => (
//                   <option key={surf} value={surf}>{surf}</option>
//                 ))}
//               </select>
//             </div>

//             <button className="submit-button" onClick={handleSubmit}>
//               Sign Up
//             </button>

//             <div className="login-link">
//               Already a member? <a href="/login">Log in</a>
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="success-message">
//             <div className="success-icon">✅</div>
//             <h3>Registration Successful!</h3>
//             <p>You will be redirected to the login page</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SignupPage;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

const SignupPage = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [surface, setSurface] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();
  const regions = ["Cotonou", "Porto-Novo", "Parakou", "Abomey"];

  const validatePhone = (phone) => /^\+?[0-9]{8,15}$/.test(phone);

  const surfaces = [
    { label: "1-2 ha", value: 2 },
    { label: "3-4 ha", value: 4 },
    { label: "5+ ha", value: 5 }
  ];
  
  const handleSubmit = async () => {
    setError("");
    if (!validatePhone(phone) || !name || !region || !surface || !password) {
      setError("Please fill in all required fields correctly.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phone, name, region, farmSize: surface, password })
      });
      console.log({
        phoneNumber: phone,
        name,
        region,
        farmSize: surface,
        password
      });      
  
      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.message || "Registration failed");
  
      localStorage.setItem("token", data.token);
      setStep(2);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="logo-container">
          <h1 className="app-title">AgriConnect</h1>
          <p className="app-subtitle">Let's grow the future together</p>
        </div>
        
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}

        {step === 1 && (
          <div className="form-container">
            <div className="form-group">
              <label>Phone Number*</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ex: +22967000000" />
            </div>
            
            <div className="form-group">
              <label>Full Name*</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
            </div>
            
            <div className="form-group">
              <label>Password*</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
            </div>
            
            <div className="form-group">
              <label>Region/City*</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="">Select...</option>
                {regions.map((reg) => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
  <label>Farm Size*</label>
  <select value={surface} onChange={(e) => setSurface(Number(e.target.value))}>
    <option value="">Select...</option>
    {surfaces.map((surf) => (
      <option key={surf.value} value={surf.value}>
        {surf.label}
      </option>
    ))}
  </select>
</div>

            
            <button className="submit-button" onClick={handleSubmit} disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
            
            <div className="login-link">Already a member? <a href="/login">Log in</a></div>
          </div>
        )}

        {step === 2 && (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Registration Successful!</h3>
            <p>You will be redirected shortly...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
