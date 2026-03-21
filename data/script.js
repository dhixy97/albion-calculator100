import fs from "fs";

const baseName = "Beef Stew";
const tier = 8;

const baseMaterials = [
  { uniqueName: "T8_PUMPKIN", localizedName: "PUMPKIN", amount: 36 },
  { uniqueName: "T8_BREAD", localizedName: "Bread", amount: 36 },
  { uniqueName: "T8_MEAT", localizedName: "Raw Beef", amount: 72 },
];

// fish sauce level 1–3
const sauceMap = {
  1: {
    uniqueName: "T1_FISHSAUCE_LEVEL1",
    localizedName: "Basic Fish Sauce",
    amount: 1,
  },
  2: {
    uniqueName: "T1_FISHSAUCE_LEVEL2",
    localizedName: "Fancy Fish Sauce",
    amount: 1,
  },
  3: {
    uniqueName: "T1_FISHSAUCE_LEVEL3",
    localizedName: "Special Fish Sauce",
    amount: 1,
  },
};

const result = [];

for (let i = 0; i <= 3; i++) {
  let materials = [...baseMaterials];

  if (i > 0) {
    materials.push(sauceMap[i]);
  }

  result.push({
    uniqueName: `T${tier}_MEAL_STEW${i === 0 ? "" : `@${i}`}`,
    localizedName: `${baseName} (T${tier}.${i})`,
    weight: 10,
    materials,
  });
}

fs.writeFileSync(
  "food-recipes.json",
  JSON.stringify(result, null, 2)
);

console.log("Beef Stew T8 recipes berhasil dibuat!");