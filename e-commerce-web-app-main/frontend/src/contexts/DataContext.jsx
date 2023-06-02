import React from "react";
import {useState, useEffect, createContext} from 'react';
import data from "../data/data.json";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [numCartItems, setNumCartItems] = useState(0);

  useEffect(() => {
    setCartItems(data.cartItems || []);
  }, []);

  useEffect(() => {
    let totalNumCartItems = 0;
    for (let idx in cartItems) {
      totalNumCartItems += cartItems[idx].count;
    }
    setNumCartItems(totalNumCartItems);
  }, [cartItems]);

  const handleAddToCart = (item, value) => {
    let alreadyPresent = false;
    let newCartItems = [];

    for (let idx in cartItems) {
      if (cartItems[idx].id === item.id) {
        alreadyPresent = true;
        const { count } = cartItems[idx];
        if (count + value > 0) {
          newCartItems.push({ ...cartItems[idx], count: count + value });
        }
        setNumCartItems(numCartItems + Math.max(cartItems[idx].count, 0));
      } else {
        newCartItems.push(cartItems[idx]);
      }
    }

    if (alreadyPresent === false) {
      let newItem = { ...item, count: value };
      setNumCartItems(numCartItems + value);
      newCartItems.push(newItem);
    }

    setCartItems(newCartItems);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        isLoggedIn, setIsLoggedIn,
        cartItems, setCartItems, numCartItems, setNumCartItems, handleAddToCart,
      }}
    > 
      {children}
    </ DataContext.Provider>
  );
};

export default DataContext;
