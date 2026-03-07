// updateItemValue.js
const fs = require("fs");
const path = require("path");

// 1️⃣ Load data JSON
const filePath = path.join(__dirname, "refined.json"); // ganti dengan path file kamu
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

// 2️⃣ Mapping itemValue berdasarkan tier.enchantment
const itemValues = {
  "2.0": 0,
  "3.0": 8,
  "4.0": 16,
  "4.1": 32,
  "4.2": 64,
  "4.3": 128,
  "4.4": 256,
  "5.0": 32,
  "5.1": 64,
  "5.2": 128,
  "5.3": 256,
  "5.4": 512,
  "6.0": 64,
  "6.1": 128,
  "6.2": 256,
  "6.3": 512,
  "6.4": 1024,
  "7.0": 128,
  "7.1": 256,
  "7.2": 512,
  "7.3": 1024,
  "7.4": 2048,
  "8.0": 256,
  "8.1": 512,
  "8.2": 1024,
  "8.3": 2048,
  "8.4": 4096
};

// 3️⃣ Tambahkan itemValue ke setiap item
const updatedData = data.map(item => {
  const key = `${item.tier}.${item.enchantment}`;
  return { ...item, itemValue: itemValues[key] || 0 };
});

// 4️⃣ Save hasil update ke file baru (atau timpa file lama)
const outputPath = path.join(__dirname, "refined_with_itemValue.json");
fs.writeFileSync(outputPath, JSON.stringify(updatedData, null, 2));

console.log("✅ ItemValue berhasil ditambahkan ke semua item!");