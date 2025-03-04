import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaTemperatureHigh, FaWind, FaTint, FaEye, FaSun, FaCloudRain, FaCloud, FaCompass } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "bb99cec77db34a6db1f74924250403"; // Replace with your WeatherAPI Key

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      setWeather(data);
    } catch (error) {
      alert("City not found. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white transition-all"
      style={{
        backgroundImage: weather
          ? weather.current.is_day
            ? "url('https://source.unsplash.com/1600x900/?sunny,sky')"
            : "url('https://source.unsplash.com/1600x900/?night,stars')"
          : "url('https://source.unsplash.com/1600x900/?nature,sky')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold mb-6 bg-green-900/50 px-6 py-2 rounded-lg shadow-lg backdrop-blur-sm"
      >
        Weather Forecast
      </motion.h1>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex items-center space-x-4 bg-green-900/30 backdrop-blur-md p-3 rounded-lg shadow-lg"
      >
        <input
          type="text"
          placeholder="Enter city name..."
          className="px-4 py-2 text-black rounded-lg outline-none w-64 bg-white/90"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={fetchWeather}
          className="bg-green-600 hover:bg-green-700 p-3 rounded-lg transition"
        >
          <FaSearch className="text-white text-xl" />
        </motion.button>
      </motion.div>

      {/* Weather Info */}
      <AnimatePresence>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-lg"
          >
            Fetching weather...
          </motion.div>
        ) : weather ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-6 bg-green-900/30 backdrop-blur-md p-6 rounded-lg shadow-lg flex flex-col items-center w-96"
          >
            {/* City & Condition */}
            <h2 className="text-3xl font-bold">{weather.location.name}, {weather.location.country}</h2>
            <p className="text-lg">{weather.current.condition.text.toUpperCase()}</p>
            <img src={weather.current.condition.icon} alt="weather icon" className="w-20 h-20" />

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <WeatherDetail icon={<FaTemperatureHigh />} label="Temperature" value={`${weather.current.temp_c}°C`} />
              <WeatherDetail icon={<FaWind />} label="Wind Speed" value={`${weather.current.wind_kph} km/h`} />
              <WeatherDetail icon={<FaCompass />} label="Wind Direction" value={`${weather.current.wind_dir}`} />
              <WeatherDetail icon={<FaEye />} label="Visibility" value={`${weather.current.vis_km} km`} />
              <WeatherDetail icon={<FaTint />} label="Humidity" value={`${weather.current.humidity}%`} />
              <WeatherDetail icon={<FaSun />} label="UV Index" value={`${weather.current.uv}`} />
              <WeatherDetail icon={<FaCloudRain />} label="Precipitation" value={`${weather.current.precip_mm} mm`} />
              <WeatherDetail icon={<FaCloud />} label="Pressure" value={`${weather.current.pressure_mb} mb`} />
            </div>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-lg"
          >
            Enter a city to get the weather forecast.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// Weather Detail Card Component
const WeatherDetail = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center space-x-2 bg-green-900/20 backdrop-blur-md p-3 rounded-lg shadow-md w-40"
  >
    <div className="text-2xl">{icon}</div>
    <div>
      <p className="text-sm">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </motion.div>
);

export default Weather;