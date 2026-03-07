"use client";
import SelectedItem from "../components-layout/SelectedItem";
import { useRecipes } from "@/context/RecipeContext";

export default function SelectedRecipes() {
  const { recipes, } = useRecipes();

  if (recipes.length === 0) return null;
  return (
    <div>
        {recipes.map((r, i) => (
        <SelectedItem key={i} recipes={r}/>
      ))}
    </div>
  );
}
