import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming AuthContext provides the login method
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify'
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      await login(email,password)
      toast.success("Login Successful");
      navigate("/"); // Redirect to home page
    } catch (error) {
      toast.warning(error.response?.data?.message)
      
    }
  };

  return (
    <div
      className="min-h-screen transition-all duration-300 flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer stacked/>
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login Form</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 rounded hover:bg-orange-400"
          >
            Login
          </button>
        </form>
        {message && <p className="text-red-700 text-center pt-4">{message}</p>}
        <div className="text-center mt-4">
          Not a member?{" "}
          <a href="/signup" className="text-green-500 hover:text-orange-400">
            Sign up now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
