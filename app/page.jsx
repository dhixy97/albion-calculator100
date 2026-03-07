"use client";

import { use, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import InputItem from "@/components/layout/inputItem";
import PriceMaterials from "@/components/layout/PriceMaterials";
import SelectedRecipes from "@/components/layout/SelectedRecipes";
import { RecipeProvider } from "@/context/RecipeContext";
import TotalProfitDisplay from "@/components/layout/TotalProfit";

export default function Home() {
  const [localReturnRate, setLocalReturnRate] = useState(24.8);

  const handleReturnRateChange = (e) => {
    const value = e.target.value.replace(",", ".");
    const num = parseFloat(value);
    setLocalReturnRate(!isNaN(num) ? num : "");
  };
  return (
    <div className="">
      <Navbar />
      <RecipeProvider>
        <main className="min-h-screen  mt-10">
          <div className="max-w-5xl mx-auto px-3 py-10">
            <InputItem
              localReturnRate={ localReturnRate }
              handleReturnRateChange={handleReturnRateChange}
            />
            <div className="mt-2">
              <PriceMaterials localReturnRate={localReturnRate}/>
            </div>
            <div className="mt-5 ">
              <div className="bg-neutral-900 rounded-xl p-6">
                <h2>Selected Recipes</h2>
                <SelectedRecipes />
                <TotalProfitDisplay/>
              </div>
            </div>
          </div>
        </main>
      </RecipeProvider>
    </div>
  );
}
