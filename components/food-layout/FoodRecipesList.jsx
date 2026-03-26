"use client";
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import { UseFoodrecipes } from "@/context/FoodContext";

export default function FoodRecipesList() {
  const { foodRecipes, setFoodRecipes, removeRecipes } = UseFoodrecipes();

  // 🔥 open per item
  const [openMap, setOpenMap] = useState({});

  if (!foodRecipes || foodRecipes.length === 0) return null;

  // 🔥 toggle per recipe
  const toggleOpen = (uniqueName) => {
    setOpenMap((prev) => ({
      ...prev,
      [uniqueName]: !prev[uniqueName],
    }));
  };

  // 🔥 update recipe
  const updateRecipe = (uniqueName, field, value) => {
    setFoodRecipes((prev) =>
      prev.map((r) =>
        r.uniqueName === uniqueName ? { ...r, [field]: value } : r,
      ),
    );
  };

  return (
    <div className="mt-2 w-full">
      {foodRecipes.map((recipe, index) => {
        const isOpen = openMap[recipe.uniqueName];

        return (
          <div
            key={recipe.uniqueName + index}
            className="bg-neutral-800 p-6 rounded-sm m-3 w-full"
          >
            <div className="flex flex-col gap-4">
              {/* TOP */}
              <div className="grid grid-cols-3 items-start gap-3">
                <div className="col-span-2 flex items-center gap-2 min-w-0">
                  <img
                    src={`https://render.albiononline.com/v1/item/${recipe.uniqueName}.png`}
                    alt={recipe.localizedNames}
                    className="w-10 h-10"
                  />
                  <span className="text-white text-sm truncate">
                    {recipe.localizedNames}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm text-gray-200">0 Silver</span>

                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleOpen(recipe.uniqueName)}
                      className="flex items-center bg-slate-700 px-2 py-1 rounded-md cursor-pointer"
                    >
                      <ChevronUp
                        size={18}
                        className={`transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => removeRecipes(recipe.uniqueName)}
                      className="bg-slate-700 border text-red-500 border-red-500 px-2 py-1 rounded-md hover:bg-slate-800"
                    >
                      x
                    </button>
                  </div>
                </div>

                {/* INPUT */}
                <div className="col-span-3 border-t pt-4">
                  <div className="grid grid-cols-4 gap-3">
                    <Input
                      label="Quantity"
                      value={recipe.quantity}
                      onChange={(val) =>
                        updateRecipe(recipe.uniqueName, "quantity", val)
                      }
                    />

                    <Input
                      label="Return Rate"
                      value={
                        recipe.returnRate !== undefined
                          ? (recipe.returnRate * 100).toFixed(1)
                          : ""
                      }
                      onChange={(val) =>
                        updateRecipe(
                          recipe.uniqueName,
                          "returnRate",
                          val === "" ? "" : Number(val) / 100,
                        )
                      }
                    />

                    <Input
                      label="Price"
                      value={recipe.sellPrice ?? 0}
                      onChange={(val) =>
                        updateRecipe(recipe.uniqueName, "price", val)
                      }
                    />

                    <Input
                      label="Usage Fee"
                      value={recipe.usageFee ?? 0}
                      onChange={(val) =>
                        updateRecipe(recipe.uniqueName, "usageFee", val)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* MATERIALS */}
              {isOpen && (
                <div>
                  <span className="text-white text-sm">Required Materials</span>

                  <div className="bg-neutral-900 p-3 rounded-sm mt-2 flex flex-col gap-3">
                    {recipe.craftMaterial?.map((mat, i) => (
                      <div
                        key={mat.uniqueName + i}
                        className="grid grid-cols-3 items-center gap-4"
                      >
                        {/* Item */}
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={`https://render.albiononline.com/v1/item/${mat.uniqueName}.png`}
                            alt={mat.localizedNames}
                            className="w-10 h-10"
                          />
                          <span className="text-white text-sm truncate">
                            {mat.localizedNames}
                          </span>
                        </div>

                        {/* Input Price */}
                        <input
                          value={mat.buyPrice ?? ""}
                          onChange={(e) => {
                            const value = e.target.value;

                            setFoodRecipes((prev) =>
                              prev.map((r) =>
                                r.uniqueName === recipe.uniqueName
                                  ? {
                                      ...r,
                                      craftMaterial: r.craftMaterial.map((m) =>
                                        m.uniqueName === mat.uniqueName
                                          ? {
                                              ...m,
                                              buyPrice:
                                                value === ""
                                                  ? ""
                                                  : Number(value),
                                            }
                                          : m,
                                      ),
                                    }
                                  : r,
                              ),
                            );
                          }}
                          type="number"
                          placeholder="Price..."
                          className="bg-slate-700 text-gray-200 px-3 h-10 rounded-md text-sm outline-none w-full text-center"
                        />

                        {/* Units */}
                        <div className="flex flex-col items-center">
                          <span className="text-white text-xs">Units</span>
                          <span className="text-white text-sm">
                            {mat.count * recipe.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TOTAL */}
              <div className="border-t pt-3">
                <span className="text-sm text-gray-200">
                  Total Cost: 0 Silver
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* 🔥 reusable input */
function Input({ label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-white text-sm mb-1">{label}</label>
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) => {
          const val = e.target.value;
          onChange(val === "" ? "" : Number(val));
        }}
        className="bg-slate-700 text-gray-200 px-3 h-10 rounded-md text-sm outline-none w-full text-center"
      />
    </div>
  );
}
