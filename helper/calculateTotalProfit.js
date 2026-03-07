import { calculateProfit } from "@/helper/calculateProfit";

export function calculateTotalProfit(recipes, premium, sellTax, buyTax) {
  let totalProfit = 0;

  recipes.forEach((recipe) => {
    const { profit } = calculateProfit(recipe, premium, sellTax, buyTax);
    totalProfit += profit;
  });

  return totalProfit;
}