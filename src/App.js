import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from './PrivateRoute'
import { AuthProvider } from "./context/AuthContext";
import Prediction from "./pages/Prediction";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import ChatbotPage from "./pages/ChatbotPage"
import Header from "./Components/Header";
import ProtectedRoute from "./pages/ProtectedRoute"
import Weather from "./pages/Weather"
const App = () => {
  return (
    <Router>
      
    <Header/>
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/prediction" element={<ProtectedRoute component={Prediction}/>}/>
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard}/>}/>
        <Route path="/analysis" element={<ProtectedRoute component={Analysis}/>}/>
        <Route path="/chatbot" element={<ProtectedRoute component={ChatbotPage}/>}/>
        <Route path="/weather" element={<ProtectedRoute component={Weather}/>}/>
      </Routes>
    
    </Router>
  );
};

export default App;
