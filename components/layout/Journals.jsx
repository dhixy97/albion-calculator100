import { useRecipes } from "@/context/RecipeContext";
import { getJournal } from "@/helper/getJournal";
import { useState, useEffect } from "react";

export default function Journals() {
  const {
    recipes,
    sellCityJournals,
    setCityJournals,
    buyCityJournals,
    setBuyCityJournals,
  } = useRecipes();
  const journals = getJournal(recipes);

  const [prices, setPrices] = useState({});

  if (!journals || journals.length === 0) {
    return null;
  }

  const handleChange = (uniqueName, field, value) => {
    setPrices((prev) => ({
      ...prev,
      [uniqueName]: {
        ...prev[uniqueName],
        [field]: Number(value),
      },
    }));
  };

  return (
    <div className="bg-neutral-900 rounded-xl p-5 mt-2">
      <h2>Journals</h2>

      <div className="mt-2 w-full space-y-2">
        {journals.map((j) => {
          const data = prices[j.journal.uniqueName] || {};
          const sell = data.sellPrice || 0;
          const buy = data.buyPrice || 0;

          const effectiveUnits = Math.max(j.units - 1, 0);
          const profit = (sell - buy) * effectiveUnits;
          const formatProfit = profit.toLocaleString("id-ID", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });

          return (
            <div
              key={j.journal.uniqueName}
              className="bg-neutral-800 p-3 rounded-md"
            >
              <div className="flex justify-between items-center">
                {/* LEFT */}
                <div className="flex items-center gap-2">
                  <img
                    src={`https://render.albiononline.com/v1/item/${j.journal.uniqueName}.png`}
                    className="h-16 w-16"
                  />
                  <span>{j.journal.localizedNames}</span>
                </div>

                {/* INPUT */}
                <div className="flex gap-2">
                  <input
                    placeholder="Buy Price"
                    value={data.buyPrice || ""}
                    onChange={(e) =>
                      handleChange(
                        j.journal.uniqueName,
                        "buyPrice",
                        e.target.value,
                      )
                    }
                    type="number"
                    className="bg-slate-700 px-3 h-10 rounded-md text-sm text-center w-24"
                  />

                  <input
                    placeholder="Sell Price"
                    value={data.sellPrice || ""}
                    onChange={(e) =>
                      handleChange(
                        j.journal.uniqueName,
                        "sellPrice",
                        e.target.value,
                      )
                    }
                    type="number"
                    className="bg-slate-700 px-3 h-10 rounded-md text-sm text-center w-24"
                  />
                </div>

                {/* INFO */}
                <div className="flex flex-col text-right">
                  <span>Total: {effectiveUnits} units</span>
                  <span>Fame: {j.fame}</span>
                </div>
              </div>

              {/* TOTAL PROFIT */}
              <div className="mt-2 text-lg font-semibold">
                <span className={`text-sm `}>
                  Total Profit:{" "}
                  <span
                    className={`text-sm ${
                      profit > 0
                        ? "text-green-500"
                        : profit < 0
                          ? "text-red-500"
                          : "text-white"
                    }`}
                  >
                    {formatProfit} Silver
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
