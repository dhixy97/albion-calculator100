import { countNeedMaterials } from "./countNeedMaterials";

export function calculateTotalMaterialCost(recipes, buyTax) {
  return recipes.reduce((recipeAcc, recipe) => {
    const materials = countNeedMaterials(recipe); // totalNeed sudah dihitung
    const materialTotal = materials.reduce((matAcc, mat) => {
      const price = mat.buyPrice ?? 0; // pakai harga user/API
      const finalPrice = buyTax ? price * 1.025 : price; // tambahkan buyTax
      return matAcc + finalPrice * mat.totalNeed;
    }, 0);

    const usageFee = recipe.usageFee || 0;
    const itemsValue = recipe.itemValue || 0;
    const feeUsage = Math.ceil(itemsValue * 0.1125 * usageFee / 100)

    return recipeAcc + materialTotal + feeUsage;
  }, 0);
}
