import React from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-80 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input className="w-full mb-3 p-2 border rounded" placeholder="Email" />
        <input className="w-full mb-3 p-2 border rounded" type="password" placeholder="Password" />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
