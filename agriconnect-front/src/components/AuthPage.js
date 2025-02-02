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

import { useState } from "react";
import "../styles/AuthPage.css";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isRegister ? "Register" : "Login", formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {isRegister ? "Sign Up" : "Login"}
        </h2>
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
            <button type="submit" className="auth-button">
              {isRegister ? "Sign Up" : "Login"}
            </button>
          </form>
          <p className="auth-toggle">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="auth-link"
            >
              {isRegister ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
