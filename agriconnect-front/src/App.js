// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import PlanSelection from "./components/PlanSelection";
// import PaymentPage from "./components/PaymentPage";
// import ConfirmationPage from "./components/ConfirmationPage";
// import DeliveryAddressForm from "./components/DeliveryAddressForm";
// import DeliveryRequest from "./components/DeliveryRequest";
// import SignupPage from "./components/SignupPage";
// import LoginPage from "./components/LoginPage";
// import ProfilePage from "./components/ProfilPage"; // Importer la page Profile
// import "./App.css";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const authStatus = localStorage.getItem("isAuthenticated") === "true";
//     setIsAuthenticated(authStatus);
//   }, []); 
  
//   const handleAuthSuccess = () => {
//     localStorage.setItem("isAuthenticated", "true");
//     setIsAuthenticated(true);
//   };

//   const ProtectedRoute = ({ children }) => {
//     return isAuthenticated ? children : <Navigate to="/login" replace />;
//   };

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Routes>
//           <Route 
//             path="/" 
//             element={isAuthenticated ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />}
//           />

//           <Route 
//             path="/login" 
//             element={isAuthenticated ? <Navigate to="/profile" replace /> : <LoginPage onAuthSuccess={handleAuthSuccess} />}
//           />

//           <Route 
//             path="/signup" 
//             element={isAuthenticated ? <Navigate to="/profile" replace /> : <SignupPage onAuthSuccess={handleAuthSuccess} />}
//           />

//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <ProfilePage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/plan-selection"
//             element={
//               <ProtectedRoute>
//                 <PlanSelection />
//               </ProtectedRoute>
//             }
//           />
          
//           <Route
//             path="/payment"
//             element={
//               <ProtectedRoute>
//                 <PaymentPage />
//               </ProtectedRoute>
//             }
//           />
          
//           <Route
//             path="/confirmation"
//             element={
//               <ProtectedRoute>
//                 <ConfirmationPage />
//               </ProtectedRoute>
//             }
//           />
          
//           <Route
//             path="/delivery-address"
//             element={
//               <ProtectedRoute>
//                 <DeliveryAddressForm />
//               </ProtectedRoute>
//             }
//           />
          
//           <Route
//             path="/delivery-request"
//             element={
//               <ProtectedRoute>
//                 <DeliveryRequest />
//               </ProtectedRoute>
//             }
//           />

//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";
import PlanSelection from "./components/PlanSelection";
import PaymentPage from "./components/PaymentPage";
import ConfirmationPage from "./components/ConfirmationPage";
import DeliveryAddressForm from "./components/DeliveryAddressForm";
import DeliveryRequest from "./components/DeliveryRequest";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilPage";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Navigate to="/profile" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/plan-selection"
              element={
                <ProtectedRoute>
                  <PlanSelection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirmation"
              element={
                <ProtectedRoute>
                  <ConfirmationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/delivery-address"
              element={
                <ProtectedRoute>
                  <DeliveryAddressForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/delivery-request"
              element={
                <ProtectedRoute>
                  <DeliveryRequest />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
