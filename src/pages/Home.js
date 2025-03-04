import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <div>
      <ToastContainer/>
      {/* Top Banner */}
      <div
        className="min-h-screen flex flex-col justify-center items-center  text-white"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/4066835/pexels-photo-4066835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          
        }}
      >
        <div className="-translate-y-32 justify-center flex flex-col items-center">
        <h1 className="text-5xl text font-bold mb-6">AI-Driven Predictions</h1>
        <div className="flex gap-4">
          <Link to="/dashboard">
          <button className="hover:bg-green-500 font-semibold px-6 py-2 rounded text-black hover:text-white hover:border-white border-black border-2 transition-all duration-300 hover:scale-105">
            Explore
          </button>
          </Link>
         
          <Link to="/dashboard">
          <button className="hover:bg-orange-400 px-6 py-2 font-semibold rounded text-black hover:text-white hover:border-white hover:scale-105 border-black border-2 transition-all duration-300">
            Contact
          </button>
          </Link>
        </div>
        </div>
      </div>

      {/* Information Sections */}
      <div className="grid grid-cols-1 mb-40 -translate-y-64 md:grid-cols-2 gap-6 p-6 h-64">
        {/* Section 1 */}
        <div
          className="flex flex-col justify-center items-start p-6 text-white"
          style={{
            backgroundColor: "#4CAF50",
            backgroundImage: "url('https://images.pexels.com/photos/12656534/pexels-photo-12656534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="text-6xl font-black p-24 text-white">
            Harnessing the power of AI to bring stability to agricultural
            markets and empower every stakeholder.
          </p>
        </div>
        {/* Section 2 */}
        <div
          className="flex flex-col justify-center items-start p-6 text-white"
          style={{
            backgroundColor: "#FF9800",
            backgroundImage: "url('https://images.pexels.com/photos/7667878/pexels-photo-7667878.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="text-6xl p-24 font-black">
            In a world of uncertainty, Farm Forecast offers clarity through
            accurate predictions and informed decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
