export function totalCostFood(recipe, buyTax) {
  if (!recipe?.craftMaterial) return 0;

  return recipe.craftMaterial.reduce((total, mat) => {
    const quantity = recipe.quantity || 0;
    const price = mat.buyPrice || 0;

    const totalMaterial = Math.ceil(mat.count * quantity);
    const materialCost = totalMaterial * price;

    const taxRate = buyTax ? 0.025 : 0;
    const finalCost = materialCost * (1 + taxRate);

    return total + finalCost;
  }, 0);
}