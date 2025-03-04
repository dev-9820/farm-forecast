import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const isUser = user;
  console.log(isUser)
  return (
    <header className="bg-green-500 flex justify-between items-center p-4 text-white">
      <div className="text-2xl font-bold">
        <span className="text-orange-400">Farm</span>Forecast
      </div>
      <nav>
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="hover:text-black">Home</Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-black">Dashboard</Link>
          </li>
          <li>
            <Link to="/prediction" className="hover:text-black">Prediction</Link>
          </li>
          <li>
            <Link to="/analysis" className="hover:text-black">Analysis</Link>
          </li>
          <li>
            <Link to="/weather" className="hover:text-black">Weather</Link>
          </li>
          <li>
            <Link to="/chatbot" className="hover:text-black">Chatbot</Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-4">
        {isUser ? (<> 
          <p className="text-2xl font-mono my-auto uppercase">{user.role}</p>
          <Link
          onClick={logout}
          to="/login"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition-all duration-300 hover:text-white"
        >
          Logout
        </Link>
         </>):
        ( <> 
        <Link
          to="/login"
          className="bg-white text-green-500 px-4 py-2 rounded hover:bg-orange-400 hover:text-white"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-orange-400 px-4 py-2 rounded hover:bg-green-500 hover:text-white"
        >
          Sign Up
        </Link>
         </>)}
      </div>
    </header>
  );
};

export default Header;