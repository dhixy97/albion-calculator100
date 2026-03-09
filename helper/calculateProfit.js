import { countNeedMaterials } from "./countNeedMaterials";

export function calculateProfit(recipe, premium, sellTax, buyTax) {
  const materials = countNeedMaterials(recipe);

  const materialCost = materials.reduce((total, m) => {
    const price = m.buyPrice || 0;
    const finalPrice = buyTax ? price * 1.025 : price;

    return total + finalPrice * m.totalNeed;
  }, 0);

  const quantity = recipe.quantity || 1;
  const sellPrice = recipe.sellPrice || 0;
  const usageFee = recipe.usageFee || 0;
  const itemsValue = recipe.itemValue || 0

  // total harga jual
  const totalSellPrice = sellPrice * quantity;

  // tentukan tax rate
  let sellFeeRate = 0;

  if (sellTax) {
    sellFeeRate = premium ? 0.065 : 0.105;
  }

  const sellFee = totalSellPrice * sellFeeRate;
  const feeUsage = Math.ceil(itemsValue * 0.1125 * usageFee / 100)
  const feeCraft = Math.ceil(feeUsage * quantity)

  const profit = totalSellPrice - materialCost - feeCraft - sellFee;

  return {
    materialCost,
    sellFee,
    totalSellPrice,
    profit,
  };
}
