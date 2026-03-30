export function countNeedMaterials(recipe) {
  const { quantity = 1, returnRate = 0, craftMaterial = [] } = recipe || {};

  const noReturnKeywords = ["ARTEFACT", "CAPE", "FACTION", "TOKEN", "CAPEITEM", "SKILLBOOK"];

  return craftMaterial.map((m) => {
    // 🔥 cek apakah material tidak kena return rate
    const isNoReturn = noReturnKeywords.some((key) =>
      m.uniqueName.includes(key)
    );

    // 🔥 jika quantity 1, langsung return count asli
    if (quantity === 1) {
      return { ...m, totalNeed: m.count };
    }

    const r = isNoReturn ? 0 : returnRate / 100;

    const totalNeed = m.count * quantity * (1 - r);

    return { ...m, totalNeed: Math.ceil(totalNeed) };
  });
}