'use client';
import { useState } from 'react';

export default function Home() {
  const [decision, setDecision] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => setDecision(e.target.value);

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/process-decision/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await res.json();
      setResponse(data.factors);
    } catch (error) {
      console.error('Error:', error);
      setResponse('There was an error processing your decision.');
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-gray-50 to-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 shadow-md">
        Decision Engine
      </h1>
      <textarea
        className="p-4 border-2 border-gray-300 rounded-lg w-full max-w-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your decision question..."
        value={decision}
        onChange={handleInputChange}
      />
      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {response && (
        <p className="mt-8 text-xl font-medium text-gray-700 bg-white p-4 rounded-lg shadow">
          {response}
        </p>
      )}
    </div>
  );
}
