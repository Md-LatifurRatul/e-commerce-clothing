import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const currency = "$";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const userToken =
    "eyJhbGciOiJIUzI1NiJ9.cnRsMTIzQGdtYWlsLmNvbWFiYzEyMw.FVYRH4LWs9KeBM9_hSjVwM5oIyLXtNCiAZNUijRSrVc";

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,12%)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={userToken} />} />
                <Route path="/list" element={<List token={userToken} />} />
                <Route path="/orders" element={<Orders token={userToken} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
