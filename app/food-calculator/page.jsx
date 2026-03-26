"use client";
import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import InputFood from "@/components/food-layout/InputFood";
import FoodRecipesList from "@/components/food-layout/FoodRecipesList";
import { FoodProvider } from "@/context/FoodContext";

export default function FoodCalculator() {
  return (
    <div>
      <Navbar />
      <FoodProvider>
        <main className="min-h-screen  mt-10">
          <h2>COMING SOON</h2>
          {/* <div className="max-w-5xl mx-auto px-3 py-10">
            <InputFood />
            <div className="mt-2 ">
              <div className="bg-neutral-900 rounded-xl p-6">
                <h2>Selected Recipes</h2>
                <FoodRecipesList />
              </div>
            </div>
          </div> */}
        </main>
      </FoodProvider>
    </div>
  );
}
