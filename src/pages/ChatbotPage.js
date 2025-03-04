import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoMdSend } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdMic, MdMicOff } from "react-icons/md";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const ChatbotPage = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [messages, setMessages] = useState([]); // Array to hold chat messages
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [listeningMode, setListeningMode] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyDmaAU3JOtYTyQO_j6Sd_eBrkn5TqlRCwQ");

  const handleGenerateResponse = async () => {
    if (!prompt.trim()) return;
    const userMessage = { type: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]); // Add user message to chat
    setLoading(true);
    setPrompt(""); // Clear input field

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
      const result = await model.generateContent(userMessage.text, { language: "english" });
      const resText = await result.response.text();
      const botMessage = { type: "bot", text: resText };
      setMessages((prev) => [...prev, botMessage]); // Add bot response to chat
    } catch (error) {
      const errorMessage = { type: "bot", text: "Something went wrong. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleMicToggle = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setListeningMode(false);
      setPrompt(transcript); // Set the captured speech as the prompt
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setListeningMode(true);
    }
  };

  const handleClear = () => {
    setMessages([]); // Clear all messages
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-6">
        {/* Chat Display Section */}
        <div className="flex flex-col space-y-4 p-4 bg-gray-100 rounded-lg max-h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`${
                  msg.type === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
                } py-2 px-4 rounded-lg max-w-sm`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <AiOutlineLoading3Quarters
                size={24}
                className="animate-spin text-blue-500"
              />
            </div>
          )}
        </div>

        {/* Chat Input Section */}
        <div className="flex items-center space-x-4">
          <textarea
            className="flex-1 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            value={listening ? transcript : prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={1}
            disabled={listening}
          />
          <button
            onClick={handleGenerateResponse}
            className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            <IoMdSend size={24} />
          </button>
          <button
            onClick={handleMicToggle}
            className={`flex items-center bg-red-500 space-x-2 $ {
              listeningMode ? "bg-black hover:bg-red-600" : "bg-black hover:bg-green-600"
            } text-white py-2 px-4 rounded-lg`}
          >
            {listeningMode ? <MdMicOff size={24} /> : <MdMic size={24} />}
          </button>
        </div>

        {/* Clear Button */}
        {messages.length > 0 && (
          <button
            onClick={handleClear}
            className="self-center bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
          >
            Clear Chat
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatbotPage;
