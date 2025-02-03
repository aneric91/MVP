// import { useState } from "react";
// import "../styles/AuthPage.css";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function AuthPage() {
//   const [isRegister, setIsRegister] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(isRegister ? "Register" : "Login", formData);
//   };

//   return (
//     <div className="auth-container">
//       <Card className="auth-card">
//         <h2 className="auth-title">
//           {isRegister ? "Sign Up" : "Login"}
//         </h2>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="auth-form">
//             {isRegister && (
//               <Input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="auth-input"
//               />
//             )}
//             <Input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//               className="auth-input"
//             />
//             <Input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="auth-input"
//             />
//             <Button type="submit" className="auth-button">
//               {isRegister ? "Sign Up" : "Login"}
//             </Button>
//           </form>
//           <p className="auth-toggle">
//             {isRegister ? "Already have an account?" : "Don't have an account?"} 
//             <button
//               onClick={() => setIsRegister(!isRegister)}
//               className="auth-link"
//             >
//               {isRegister ? "Login" : "Sign Up"}
//             </button>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// import { useState } from "react";
// import "../styles/AuthPage.css";

// export default function AuthPage() {
//   const [isRegister, setIsRegister] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(isRegister ? "Register" : "Login", formData);
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="auth-title">
//           {isRegister ? "Sign Up" : "Login"}
//         </h2>
//         <div className="auth-card-content">
//           <form onSubmit={handleSubmit} className="auth-form">
//             {isRegister && (
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="auth-input"
//               />
//             )}
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//               className="auth-input"
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="auth-input"
//             />
//             <button type="submit" className="auth-button">
//               {isRegister ? "Sign Up" : "Login"}
//             </button>
//           </form>
//           <p className="auth-toggle">
//             {isRegister ? "Already have an account?" : "Don't have an account?"}
//             <button
//               onClick={() => setIsRegister(!isRegister)}
//               className="auth-link"
//             >
//               {isRegister ? "Login" : "Sign Up"}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPage.css";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Vérification de base des champs obligatoires
    if (!formData.phone.trim() || !formData.password.trim() || (isRegister && !formData.name.trim())) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Choix de l'endpoint en fonction du mode
    const endpoint = isRegister 
      ? "http://localhost:5000/auth/register" 
      : "http://localhost:5000/auth/login";

    // Pour l'inscription, on renomme la clé "phone" en "phoneNumber" pour correspondre à votre backend
    const payload = isRegister 
      ? { phoneNumber: formData.phone, name: formData.name, password: formData.password }
      : { phoneNumber: formData.phone, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Operation failed");
      }
      
      // Stocker le token dans le localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      // Optionnel : stocker l'utilisateur
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      
      console.log(isRegister ? "Registered" : "Logged in", data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{isRegister ? "Sign Up" : "Login"}</h2>
        <div className="auth-card-content">
          <form onSubmit={handleSubmit} className="auth-form">
            {isRegister && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="auth-input"
              />
            )}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="auth-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="auth-input"
            />
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? (isRegister ? "Signing Up..." : "Logging In...") : (isRegister ? "Sign Up" : "Login")}
            </button>
          </form>
          <p className="auth-toggle">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <button onClick={() => setIsRegister(!isRegister)} className="auth-link">
              {isRegister ? "Login" : "Sign Up"}
            </button>
          </p>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
}
