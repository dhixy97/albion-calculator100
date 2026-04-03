"use client";

import { useRecipes } from "@/context/RecipeContext";
import { useEffect, useState } from "react";

export default function PriceMaterials({ localReturnRate }) {
  const cities = [
    "Martlock",
    "Bridgewatch",
    "Lymhurst",
    "FortSterling",
    "Caerleon",
    "Black Market",
  ];

  const {
    selectedItem,
    addRecipe,
    cityBuyMats,
    setCityBuyMats,
    setSelectedItem,
    setRecipes,
    sellCity,
    setSellCity,
    clearAll,
    sellCityJournals,
    setSellCityJournals,
    buyCityJournals,
    setBuyCityJournals,
  } = useRecipes();

  const handleAddRecipe = () => {
    if (!selectedItem) return;
    const recipeData = {
      ...selectedItem,
      returnRate: parseFloat(localReturnRate) || 0,
      usageFee: 1000,
      quantity: 1,
      sellCity,
      cityBuyMats,
      buyCityJournals,
      sellCityJournals
    };

    addRecipe(recipeData);
    setSelectedItem(null);
  };  
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
      <h2 className="text-white text-sm">Price</h2>
      <div className="grid grid-cols-4 gap-3 mt-2">
        <div className="flex flex-col">
          <label className="text-white text-sm">Buy materials from</label>
          <select
            value={cityBuyMats}
            onChange={(e) => {
              const value = e.target.value;
              setCityBuyMats(value);
              setRecipes((prev) =>
                prev.map((r) => ({ ...r, cityBuyMats: value })),
              );
            }}
            className="bg-slate-700 text-gray-200 px-3 py-2 rounded-md border border-slate-600 outline-none"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-white text-sm">Sell item from</label>
          <select
            value={sellCity}
            onChange={(e) => {
              const value = e.target.value;
              setSellCity(value);
              setRecipes((prev) =>
                prev.map((r) => ({ ...r, sellCity: value })),
              );
            }}
            className="bg-slate-700 text-gray-200 px-3 py-2 rounded-md border border-slate-600 outline-none"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-white text-sm">Buy journals from</label>
          <select
            value={buyCityJournals}
            onChange={(e) => {
              const value = e.target.value;
              setBuyCityJournals(value);
              setRecipes((prev) =>
                prev.map((r) => ({ ...r, buyCityJournals: value })),
              );
            }}
            className="bg-slate-700 text-gray-200 px-3 py-2 rounded-md border border-slate-600 outline-none"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-white text-sm">Sell journals from</label>
          <select
            value={sellCityJournals}
            onChange={(e) => {
              const value = e.target.value;
              setSellCityJournals(value);
              setRecipes((prev) =>
                prev.map((r) => ({ ...r, sellCityJournals: value })),
              );
            }}
            className="bg-slate-700 text-gray-200 px-3 py-2 rounded-md border border-slate-600 outline-none"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-2 border-t">
        <div className="mt-2 flex gap-5">
          <button
            className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
            onClick={handleAddRecipe}
          >
            Add Recipes
          </button>
          <button
            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-900 transition cursor-pointer"
            onClick={() => clearAll()}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
