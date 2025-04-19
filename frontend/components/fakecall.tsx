"use client";
import React, { useState } from "react";
import axios from "axios";

const FakeCall = ({ onClose }: { onClose: () => void }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");

  const handleFakeCall = async () => {
    if (!phoneNumber.trim()) {
      setStatus("Please enter a valid phone number.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/fake-call", {
        userPhoneNumber: phoneNumber,
      });
      setStatus("✅ Fake call triggered successfully!");
    } catch (error) {
      setStatus("❌ Error triggering fake call.");
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-950 rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl text-white font-semibold text-center mb-4">Trigger Fake Call</h2>
        <input
          type="text"
          placeholder="Enter phone number"
          className="w-full p-2 border text-white border-white rounded-md mb-4"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          onClick={handleFakeCall}
          className="w-full p-2 bg-cyan-300 text-black rounded-md hover:bg-cyan-500"
        >
          Trigger Fake Call
        </button>
        {status && <p className="mt-4 text-center text-gray-700">{status}</p>}
        <button
          onClick={onClose}
          className="mt-4 w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FakeCall;
