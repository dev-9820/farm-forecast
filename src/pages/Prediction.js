import React, { useState } from "react";
import axios from "axios";

const Prediction = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");
  const [commodity, setCommodity] = useState("");
  const [variety, setVariety] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
 
  const [response, setResponse] = useState(null);

  const states = ["Gujarat", "Haryana", "Himachal Pradesh", "Kerala", "Nagaland", "Andhra Pradesh"];
  const districts = {
    Gujarat: ["Amreli"],
    Haryana: ["Gurgaon"],
    "Himachal Pradesh": ["Kangra"],
    Kerala: ["Alappuzha"],
    Nagaland: ["Kohima"],
    "Andhra Pradesh":["Chittor", "Guntur"],
  };
  const markets = ["Damnagar", "Gurgaon", "Palampur", "Harippad", "Jalukie","Palamaner","Tenali"];
  const commodities = ["Bhindi", "Brinjal", "Cabbage", "Cauliflower", "Coriander", "Ginger", "Green Chilly", "Guar", "Lemon", "Carrot"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format the arrival date
    const formattedDate = arrivalDate.split("-").reverse().join("-"); // Manually format as dd-mm-yyyy

    const data = {
      State: state,
      District: district,
      Market: market,
      Commodity: commodity,
      Arrival_Date: formattedDate,
    };

    console.log("Sending data:", data);

    try {
      const res = await axios.post("https://a300-35-204-159-198.ngrok-free.app/predict", data);
      setResponse(res.data); // Axios automatically parses the JSON
      console.log("Received data:", res.data);
    } catch (error) {
      console.error("Error posting data:", error);
      setResponse({ error: error.message });
    }
  };

  return (
    <div>
      <div
        className="min-h-screen flex flex-col justify-center items-center text-black"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/212324/pexels-photo-212324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" justify-center flex flex-col items-center">
          <h1 className="text-5xl  font-bold text-black mb-6">
            AI-Driven Predictions
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex-col flex gap-5 bg-white p-8 rounded-lg shadow-xl w-full sm:w-96"
          >
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="" disabled>Select State</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
              disabled={!state}
            >
              <option value="" disabled>Select District</option>
              {state &&
                districts[state].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
            </select>

            <select
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="" disabled>Select Market</option>
              {markets.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <select
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <option value="" disabled>Select Commodity</option>
              {commodities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>


            <input
              type="date"
              placeholder="Arrival Date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300"
            />
        

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Get Prediction
            </button>
          </form>
          {/* Prediction Response */}
          {response && (
            <div className="justify-center mt-8">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Prediction Result</h2>
                <div className="space-y-4">
                  {response.error ? (
                    <p>
                      <strong>Error:</strong> {response.error}
                    </p>
                  ) : (
                    <>
                    <p>
                      <strong>Min Price:</strong> ₹ {response.Min_Price}
                      
                    </p>
                    <p>
                    <strong>Max Price:</strong> ₹ {response.Max_Price}
                    
                  </p>
                  <p>
                  <strong>Predicted Price:</strong> ₹ {response.Modal_Price}
                  
                </p>
                </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
