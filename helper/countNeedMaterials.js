export function countNeedMaterials(recipe) {
  const { quantity = 1, returnRate = 0, craftMaterial = [] } = recipe || {};
  return craftMaterial.map((m) => {
    const r = m.uniqueName.includes("ARTEFACT") ? 0 : returnRate / 100;
    const totalNeed = m.count * quantity * (1 - r);
    return { ...m, totalNeed: Math.ceil(totalNeed) };
  });
}