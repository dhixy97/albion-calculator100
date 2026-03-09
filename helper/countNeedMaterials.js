export function countNeedMaterials(recipe) {
  const { quantity = 1, returnRate = 0, craftMaterial = [] } = recipe || {};

  return craftMaterial.map((m) => {
    // jika quantity hanya 1, gunakan count asli
    if (quantity === 1) {
      return { ...m, totalNeed: m.count };
    }

    const r = m.uniqueName.includes("ARTEFACT") ? 0 : returnRate / 100;
    const totalNeed = m.count * quantity * (1 - r);

    return { ...m, totalNeed: Math.ceil(totalNeed) };
  });
}