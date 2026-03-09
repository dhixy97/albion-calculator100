"use client";

import { useState, useEffect, useRef } from "react";
import ImageIcon from "../icon/ImageIcon";
import refined from "@/data/refined.json";
import offhand from "@/data/offhand.json"
import clothItems from "@/data/clothItems.json"
import leatherItems from "@/data/leatherItems.json"
import { useRecipes } from "@/context/RecipeContext";

export default function InputItem({localReturnRate, handleReturnRateChange}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const {
        setRecipes,
        premium,
        setPremium,
        sellTax,
        setSellTax,
        buyTax,
        setBuyTax,
        selectedItem,
        setSelectedItem,
        returnRate,
        setReturnRate
  } = useRecipes()
  

  // Fungsi menutup item list saat klik di luar
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClikcOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClikcOutside);
    return () => document.removeEventListener("mousedown", handleClikcOutside);
  }, []);

  const allItems = [...refined,...offhand, ...clothItems, ...leatherItems]

  // Filter item list
  const filterItems = allItems.filter((item) =>
  item.localizedNames?.toLowerCase().includes(query.toLowerCase()),
);
  // fungsi ubah format penulisan pada return rate


  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 relative">
      <div className="flex gap-5 items-center">
        {/* Recipe */}
        <div className="flex flex-col gap-2 relative w-80">
          <label className="text-sm text-neutral-300">Recipe</label>

          <div className="flex items-center gap-3">
            {selectedItem ? (
              <img
                src={`https://render.albiononline.com/v1/item/${selectedItem.uniqueName}.png`}
                alt={selectedItem.uniqueName}
                className="w-15 h-15"
              />
            ) : (
              <ImageIcon />
            )}

            <input
              value={selectedItem ? selectedItem.localizedNames : query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedItem(null);
              }}
              onFocus={() => setIsOpen(true)}
              type="text"
              placeholder="Select recipes......"
              className="bg-slate-700 text-gray-200 px-3 h-10 rounded-md text-sm outline-none w-full"
            />
          </div>

          {/* Dropdown list item */}
          {isOpen && (
            <div
              className="absolute top-full mt-2 w-full bg-slate-800 border border-slate-600 rounded-md shadow-lg max-h-60 overflow-y-auto"
              ref={dropdownRef}
            >
              {filterItems.map((items) => (
                <div
                  key={items.uniqueName}
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedItem(items)
                  }}
                  className="px-4 py-2 hover:bg-slate-700 cursor-pointer flex items-center gap-3"
                >
                  <img
                    src={`https://render.albiononline.com/v1/item/${items.uniqueName}.png`}
                    alt=""
                    className="w-8 h-8"
                  />
                  {items.localizedNames}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Return Rate */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-neutral-300">Return Rate</label>

          <input
            type="number"
            value={localReturnRate}
            onChange={handleReturnRateChange}
            className="bg-slate-700 text-gray-200 px-3 h-10 rounded-md text-sm outline-none"
          />
        </div>

        {/* Toggle Premium */}
        <Toggle label="Premium" enabled={premium} setEnabled={setPremium} />

        {/* Toggle sell order */}
        <Toggle label="Sell order" enabled={sellTax} setEnabled={setSellTax} /> 

        {/* Toggle buy order */}
        <Toggle label="Buy order" enabled={buyTax} setEnabled={setBuyTax} />
      </div>
    </div>
  );
}

function Toggle({ label, enabled, setEnabled }) {
  return (
    <div className="flex flex-col">
      <label className="mb-5 text-gray-200 text-sm">{label}</label>
      <button
        onClick={() => setEnabled(prev => !prev)}
        className={`w-14 h-7 flex items-center rounded-full cursor-pointer p-1 transition ${
          enabled ? "bg-blue-600" : "bg-slate-600"
        }`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full transform transition ${
            enabled ? "translate-x-7" : ""
          }`}
        />
      </button>
    </div>
  );
}