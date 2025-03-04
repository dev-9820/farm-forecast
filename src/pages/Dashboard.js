import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null); // State to manage which card is expanded

  const commodities = [
    { name: "Paddy", icon: "🌾", details: "Paddy, grown in India", pastPrices: [1200, 1250, 1300, 1280, 1350] },
    { name: "Wheat", icon: "🌾", details: "Wheat, grown in India", pastPrices: [1100, 1150, 1120, 1170, 1200] },
    { name: "Barley", icon: "🌾", details: "Barley, grown in India", pastPrices: [900, 950, 920, 970, 1000] },
    { name: "Coconut", icon: "🥥", details: "Coconut, grown in India", pastPrices: [5000, 5100, 5200, 5150, 5300] },
    { name: "Soybean", icon: "🌱", details: "Soybean, grown in India", pastPrices: [3000, 3100, 3050, 3150, 3200] },
    { name: "Mustard Seeds", icon: "🌱", details: "Mustard Seeds, grown in India", pastPrices: [4000, 4100, 4050, 4150, 4200] },
    { name: "Sugarcane", icon: "🍬", details: "Sugarcane, grown in India", pastPrices: [2500, 2600, 2550, 2650, 2700] },
    { name: "Ragi", icon: "🌾", details: "Ragi, grown in India", pastPrices: [1500, 1550, 1520, 1570, 1600] },
    { name: "Moong", icon: "🌱", details: "Moong, grown in India", pastPrices: [7000, 7100, 7050, 7150, 7200] },
    { name: "Maize", icon: "🌽", details: "Maize, grown in India", pastPrices: [1800, 1850, 1820, 1870, 1900] },
    { name: "Sunflower", icon: "🌻", details: "Sunflower, grown in India", pastPrices: [4500, 4600, 4550, 4650, 4700] },
  ];

  const filteredCommodities = commodities.filter((commodity) =>
    commodity.name.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle expand state
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      {/* Top Section */}
      <div className="bg-green-900/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-green-900">Commodity Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <span className="text-lg font-semibold">Copra</span>
            <span className="text-green-600 font-bold">₹5814.0 (+2.89%)</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <span className="text-lg font-semibold">Barley</span>
            <span className="text-red-600 font-bold">₹1117.2 (-2.89%)</span>
          </motion.div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Top Gainers */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-green-900 mb-4">Top Gainers (Current Trends)</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Item Name</th>
                <th className="p-2 text-left">Price (per Qt.)</th>
                <th className="p-2 text-left">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Niger</td>
                <td className="p-2">₹4889.5</td>
                <td className="p-2 text-green-600 font-semibold">+6.72%</td>
              </tr>
              <tr>
                <td className="p-2">Sesamum</td>
                <td className="p-2">₹5934.6</td>
                <td className="p-2 text-green-600 font-semibold">+5.53%</td>
              </tr>
              <tr>
                <td className="p-2">Jute</td>
                <td className="p-2">₹3043.48</td>
                <td className="p-2 text-green-600 font-semibold">+5.21%</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Top Losers */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-green-900 mb-4">Top Losers (Current Trends)</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Item Name</th>
                <th className="p-2 text-left">Price (per Qt.)</th>
                <th className="p-2 text-left">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Copra</td>
                <td className="p-2">₹10822.2</td>
                <td className="p-2 text-red-600 font-semibold">-2.97%</td>
              </tr>
              <tr>
                <td className="p-2">Soybean</td>
                <td className="p-2">₹3143.8</td>
                <td className="p-2 text-red-600 font-semibold">-2.86%</td>
              </tr>
              <tr>
                <td className="p-2">Gram</td>
                <td className="p-2">₹3710.0</td>
                <td className="p-2 text-red-600 font-semibold">-2.36%</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6">
        <h2 className="text-3xl font-bold text-green-900 text-center mb-6">Explore by Commodity</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for a commodity..."
            className="w-full p-3 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCommodities.map((commodity, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl mb-4">{commodity.icon}</span>
                <span className="text-xl font-semibold text-green-900">{commodity.name}</span>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <p className="text-sm text-gray-600">{commodity.details}</p>
                     {/* Graph Section */}
<div className="mt-4 w-full h-40">
  <h3 className="font-semibold text-green-900 text-center mb-2">Year-wise Price Trend</h3>
  <ResponsiveContainer width="100%" height="100%" minWidth="100%" aspect={1}>
    <LineChart data={generateChartData(commodity.pastPrices)}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
</div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Function to generate year-wise data for the chart
const generateChartData = (pastPrices) => {
  const baseYear = 2019; // Example years from 2019 to 2023
  return pastPrices.map((price, index) => ({
    year: baseYear + index,
    price,
  }));
};

export default Dashboard;