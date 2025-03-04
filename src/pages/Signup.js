import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Tracks the current step of the signup process
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [message, setMessage] = useState("");

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    try {
      await axios.post("https://farm-forecast-backend.onrender.com/api/auth/send-otp", { email });
      setMessage("OTP sent to your email.");
      setStep(2); // Move to the OTP verification step
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      await axios.post("https://farm-forecast-backend.onrender.com/api/auth/verify-otp", { email, otp, password, role });
      setMessage("Signup successful!");
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to verify OTP.");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {step === 1 ? "Signup - Step 1" : "Signup - Step 2"}
        </h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
              required
            />
            <button
              onClick={handleSendOtp}
              className="bg-green-500 text-white py-2 rounded w-full hover:bg-orange-400"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            >
              <option value="farmer">Farmer</option>
              <option value="researcher">Researcher</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={handleVerifyOtp}
              className="bg-green-500 text-white py-2 rounded w-full hover:bg-orange-400"
            >
              Verify OTP & Signup
            </button>
          </>
        )}

        {message && <p className="text-red-700 text-center pt-4">{message}</p>}

        <div className="text-center mt-4">
          Already a member?{" "}
          <a href="/login" className="text-green-500 hover:text-orange-400">
            Log in now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
