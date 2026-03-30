import { countNeedMaterials } from "./countNeedMaterials";

export function calculateTotalMaterialCost(recipes, buyTax) {
  const list = Array.isArray(recipes) ? recipes : [recipes];

  return list.reduce((recipeAcc, recipe) => {
    const materials = countNeedMaterials(recipe) || [];

    const materialTotal = materials.reduce((matAcc, mat) => {
      const price = mat.buyPrice ?? 0;
      const finalPrice = buyTax ? price * 1.025 : price;
      return matAcc + finalPrice * (mat.totalNeed || 0);
    }, 0);

    const quantity = recipe.quantity || 1;
    const usageFee = recipe.usageFee || 0;
    const itemsValue = recipe.itemValue || 0;

    const feeUsage = Math.ceil(itemsValue * 0.1125 * usageFee / 100);
    const feeCraft = Math.ceil(feeUsage * quantity);

    return recipeAcc + materialTotal + feeCraft;
  }, 0);
}