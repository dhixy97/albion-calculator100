import { useRecipes } from "@/context/RecipeContext";
import { calculateTotalProfit } from "@/helper/calculateTotalProfit";

export default function TotalProfitDisplay() {
  const { recipes, premium, sellTax, buyTax } = useRecipes();
  const totalProfit = calculateTotalProfit(recipes, premium, sellTax, buyTax);

  // format ribuan pakai titik, tanpa desimal
  const formattedProfit = totalProfit.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (recipes.length === 0) return null;
  return (
    <div className="mt-3 text-white">
      <strong >Total Profit:</strong> <span className={`text-md ${formattedProfit > 0 ? "text-green-500" : "text-red-500"}`}>{formattedProfit} silver</span>
    </div>
  );
}
