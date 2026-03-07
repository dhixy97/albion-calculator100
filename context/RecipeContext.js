// context/RecipeContext.js
"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  // state utama
  const [recipes, setRecipes] = useState([]);
  const [premium, setPremium] = useState(true);
  const [sellTax, setSellTax] = useState(true);
  const [buyTax, setBuyTax] = useState(false);
  const [returnRate, setReturnRate] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [cityBuyMats, setCityBuyMats] = useState("Martlock");
  const [sellCity, setSellCity] = useState("Lymhurst");

  // -----------------------------
  // Load cookies saat mount
  // -----------------------------
  useEffect(() => {
    const cookieItem = Cookies.get("selectedItem");
    if (cookieItem) setSelectedItem(JSON.parse(cookieItem));

    const cookieRecipes = Cookies.get("recipes");
    if (cookieRecipes) setRecipes(JSON.parse(cookieRecipes));
  }, []);

  // -----------------------------
  // wrapper untuk setSelectedItem + cookie
  // -----------------------------
  const setSelectedItemHandler = (item) => {
    setSelectedItem(item);
    if (item) {
      Cookies.set("selectedItem", JSON.stringify(item), { expires: 7 });
    } else {
      Cookies.remove("selectedItem");
    }
  };

  // -----------------------------
  // Add recipe + update cookie
  // -----------------------------
  const addRecipe = (newRecipe) => {
    setRecipes((prev) => {
      const existingIndex = prev.findIndex(
        (r) => r.uniqueName === newRecipe.uniqueName
      );
      let updated;
      if (existingIndex !== -1) {
        updated = [...prev];
        updated[existingIndex].quantity += newRecipe.quantity;
      } else {
        updated = [...prev, newRecipe];
      }

      Cookies.set("recipes", JSON.stringify(updated), { expires: 7 });
      return updated;
    });
  };

  // -----------------------------
  // Remove recipe + update cookie
  // -----------------------------
  const removeRecipe = (uniqueName) => {
    setRecipes((prev) => {
      const updated = prev.filter((r) => r.uniqueName !== uniqueName);
      Cookies.set("recipes", JSON.stringify(updated), { expires: 7 });
      return updated;
    });
  };

  // -----------------------------
  // Clear all recipes + reset selectedItem + hapus cookies
  // -----------------------------
  const clearAll = () => {
    setRecipes([]);
    setSelectedItemHandler(null);
    Cookies.remove("recipes");
  };

  // -----------------------------
  // Provider value
  // -----------------------------
  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        addRecipe,
        removeRecipe,
        clearAll,

        premium,
        setPremium,
        sellTax,
        setSellTax,
        buyTax,
        setBuyTax,
        returnRate,
        setReturnRate,

        selectedItem,
        setSelectedItem: setSelectedItemHandler,

        cityBuyMats,
        setCityBuyMats,
        sellCity,
        setSellCity,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

// Hook untuk pakai context
export function useRecipes() {
  return useContext(RecipeContext);
}