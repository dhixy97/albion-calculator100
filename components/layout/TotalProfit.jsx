import { useRecipes } from "@/context/RecipeContext";
import { calculateTotalProfit } from "@/helper/calculateTotalProfit";
import { calculateTotalMaterialCost } from "@/helper/calculateMaterialCost";

export default function TotalProfitDisplay() {
  const { recipes, premium, sellTax, buyTax } = useRecipes();
  const totalProfit = calculateTotalProfit(recipes, premium, sellTax, buyTax);
  const totalMaterialCost = calculateTotalMaterialCost(recipes, buyTax);

  // format ribuan pakai titik, tanpa desimal
  const formattedProfit = totalProfit.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedCost = totalMaterialCost.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (recipes.length === 0) return null;
  return (
    <div className="flex flex-row justify-between">
      <div className="mt-3 text-white">
        <strong>Total Profit:</strong>{" "}
        <span
          className={`text-md ${formattedProfit > 0 ? "text-green-500" : "text-red-500"}`}
        >
          {formattedProfit} silver
        </span>
      </div>
      <div className="mt-3 text-white">
        <strong>Total Cost:</strong>{" "}
        <span
          className={`text-md text-white`}
        >
          {formattedCost} silver
        </span>
      </div>
    </div>
  );
}
