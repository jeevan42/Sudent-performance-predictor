import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-80 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input className="w-full mb-3 p-2 border rounded" placeholder="Name" />
        <input className="w-full mb-3 p-2 border rounded" placeholder="Email" />
        <input className="w-full mb-3 p-2 border rounded" type="password" placeholder="Password" />
        <button className="w-full bg-green-500 text-white p-2 rounded">Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;
