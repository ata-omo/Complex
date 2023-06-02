import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ViewCart from "./pages/ViewCart";
import Login from "./pages/Login";
import { DataProvider } from "./contexts/DataContext";
import SingleProductPage from "./pages/SingleProductPage";

function App() {

  return (
    
    <div className="App">
      <DataProvider>
      <Routes>
        <Route path="/login/*" element={<Login />} />
        <Route
          path="/"
          element={<Home />}
        />
        <Route 
          path="/products/:id"
          element={<SingleProductPage />}
        />
        <Route
          path="/viewcart"
          element={
            <ViewCart />
          }
        />
      </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
