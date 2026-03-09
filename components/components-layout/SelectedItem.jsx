"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useRecipes } from "@/context/RecipeContext";
import { countNeedMaterials } from "@/helper/countNeedMaterials";
import { calculateProfit } from "@/helper/calculateProfit";

export default function SelectedItem({ recipes }) {
  const [open, setOpen] = useState(true);
  const {
    removeRecipe,
    setRecipes,
    cityBuyMats,
    sellCity,
    sellTax,
    buyTax,
    premium,
  } = useRecipes();
  const [buyPriceMats, setBuyPriceMats] = useState(0);
  const [sellPriceItem, setSellPriceItem] = useState(0);
  const needMaterials = countNeedMaterials(recipes ?? { craftMaterial: [] });
  
 useEffect(() => {
  async function fetchBuyPrice() {
    if (!recipes?.craftMaterial) return; // <- pastikan ada craftMaterial

    const updatedMaterials = await Promise.all(
      recipes.craftMaterial.map(async (mat) => {
        const res = await fetch(
          `https://east.albion-online-data.com/api/v2/stats/prices/${mat.uniqueName}.json?locations=${cityBuyMats}`
        );
        const data = await res.json();
        return { ...mat, buyPrice: data[0]?.buy_price_max || 0 };
      })
    );

    setRecipes((prev) =>
      prev.map((r) =>
        r.uniqueName === recipes.uniqueName
          ? { ...r, craftMaterial: updatedMaterials }
          : r
      )
    );
  }
  fetchBuyPrice();
}, [recipes.uniqueName, cityBuyMats, setRecipes]);

  useEffect(() => {
    async function fetchSellPrice() {
      if (!recipes?.uniqueName) return;

      try {
        const res = await fetch(
          `https://east.albion-online-data.com/api/v2/stats/prices/${recipes.uniqueName}.json?locations=${recipes.sellCity}`,
        );

        const data = await res.json();

        const sellPrice = data[0]?.sell_price_min || 0;

        setSellPriceItem(sellPrice);

        setRecipes((prev) =>
          prev.map((r) =>
            r.uniqueName === recipes.uniqueName ? { ...r, sellPrice } : r,
          ),
        );
      } catch (err) {
        console.error("gagal ambil data", err);
      }
    }

    fetchSellPrice();
  }, [recipes.uniqueName, sellCity]);

  const { materialCost, sellFee, profit } = calculateProfit(
    recipes,
    premium,
    sellTax,
    buyTax,
  );

  return (
    <div className="mt-2 w-full">
      <div className="bg-neutral-800 border-l-4 border-l-amber-300 p-6 rounded-sm border-y-2 border-y-gray-600 mt-3">
        {/* HEADER */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 items-center">
            {/* Recipe Item */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={`https://render.albiononline.com/v1/item/${recipes.uniqueName}.png`}
                  alt={recipes.uniqueName}
                  className="w-10 h-10"
                />
                <span className="text-white text-sm truncate">
                  {recipes.localizedNames}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex justify-between items-center gap-2">
              <span
                className={`text-sm ${profit > 0 ? "text-green-500" : "text-red-500"}`}
              >
                {Math.round(profit).toLocaleString()}Silver
              </span>

              <div className="flex gap-1">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center bg-slate-700 px-2 py-1 rounded cursor-pointer"
                >
                  <ChevronUp
                    size={18}
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>

                <button
                  onClick={() => removeRecipe(recipes.uniqueName)}
                  className="flex items-center bg-slate-700 border text-red-500 border-red-500 px-2 py-1 rounded cursor-pointer"
                >
                  x
                </button>
              </div>
            </div>
          </div>

          {/* INPUT SECTION */}
          <div className="border-t pt-3">
            <div className="grid grid-cols-5 gap-3 items-center">
              <div className="flex flex-col">
                <label className="text-white text-sm">Quantity</label>
                <input
                  type="number"
                  value={recipes.quantity}
                  onChange={(e) =>
                    setRecipes((prev) =>
                      prev.map((r) =>
                        r.uniqueName === recipes.uniqueName
                          ? { ...r, quantity: parseInt(e.target.value) || 0 } // gunakan e.target.value
                          : r,
                      ),
                    )
                  }
                  className="bg-slate-700 text-gray-200 px-3 h-10 rounded-md text-sm outline-none w-full text-center"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-white text-sm">Return Rate</label>
                <input
                  type="number"
                  value={recipes.returnRate}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    setRecipes((prev) =>
                      prev.map((r) =>
                        r.uniqueName === recipes.uniqueName
                          ? { ...r, returnRate: value }
                          : r,
                      ),
                    );
                  }}
                  className="bg-slate-700 text-gray-200 px-3 h-10 rounded-md text-sm outline-none w-full text-center"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-white text-sm">Price</label>
                <input
                  type="number"
                  value={recipes.sellPrice ?? 0}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;

                    setRecipes((prev) =>
                      prev.map((r) =>
                        r.uniqueName === recipes.uniqueName
                          ? { ...r, sellPrice: value }
                          : r,
                      ),
                    );
                  }}
                  className="bg-slate-700 text-gray-200 px-3 h-10 rounded-md text-sm outline-none w-full text-center"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-white text-sm">Usage Fee</label>
                <input
                  value={recipes.usageFee}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    setRecipes((prev) =>
                      prev.map((r) =>
                        r.uniqueName === recipes.uniqueName
                          ? { ...r, usageFee: value }
                          : r,
                      ),
                    );
                  }}
                  type="number"
                  className="bg-slate-700 text-gray-200 px-3 h-10 rounded-md text-sm outline-none w-full text-center"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-white text-sm">Weight</label>
                <span className="text-white text-sm">
                  {Math.round(recipes.weight * recipes.quantity) || 0}kg
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MATERIALS */}
        {open && (
          <div className="mt-4">
            <span className="text-white text-sm">Required Materials</span>
            {needMaterials.map((r, i) => (
              <div
                className="bg-neutral-900 border-l-4 border-l-amber-300 p-2 rounded-sm border-y-2 border-y-gray-600 mt-2"
                key={i}
              >
                <div className="flex items-center gap-4 mt-2">
                  {/* Item name */}
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <img
                      src={`https://render.albiononline.com/v1/item/${r.uniqueName}.png`}
                      alt={r.localizedNames}
                      className="w-10 h-10"
                    />

                    <span className="text-white text-sm truncate">
                      {r.localizedNames}
                    </span>
                  </div>

                  {/* Input price */}
                  <input
                    type="number"
                    value={r.buyPrice ?? 0}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setRecipes((prev) =>
                        prev.map((r2) =>
                          r2.uniqueName === recipes.uniqueName
                            ? {
                                ...r2,
                                craftMaterial: r2.craftMaterial.map((m) =>
                                  m.uniqueName === r.uniqueName
                                    ? { ...m, buyPrice: value }
                                    : m,
                                ),
                              }
                            : r2,
                        ),
                      );
                    }}
                    placeholder="Price materials..."
                    className="bg-slate-700 text-gray-200 px-3 h-10 rounded-md text-sm outline-none text-center w-40"
                  />

                  <div className="flex flex-col items-center">
                    <span className="text-white text-sm truncate">
                      {r.totalNeed}units
                    </span>
                    <span className="text-white text-sm truncate">
                      {Math.round(r.weight * recipes.quantity * 100) / 100}kg
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
