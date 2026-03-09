import { countNeedMaterials } from "./countNeedMaterials";

export function calculateTotalMaterialCost(recipes, buyTax) {
  return recipes.reduce((recipeAcc, recipe) => {
    const materials = countNeedMaterials(recipe); // totalNeed sudah dihitung
    const materialTotal = materials.reduce((matAcc, mat) => {
      const price = mat.buyPrice ?? 0; // pakai harga user/API
      const finalPrice = buyTax ? price * 1.025 : price; // tambahkan buyTax
      return matAcc + finalPrice * mat.totalNeed;
    }, 0);

    return recipeAcc + materialTotal;
  }, 0);
}