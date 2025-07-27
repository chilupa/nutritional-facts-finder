const USDA_API_KEY = process.env.USDA_API_KEY;
const USDA_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

function extractNutrients(nutrients) {
  const nutrientMap = {
    2047: "calories", // Energy
    1003: "protein", // Protein
    1005: "carbs", // Carbohydrate, by difference
    1004: "fat", // Total lipid (fat)
    1079: "fiber", // Fiber, total dietary
    1162: "vitaminC", // Vitamin C, total ascorbic acid
    1185: "vitaminK", // Vitamin K (phylloquinone)
    1109: "vitaminE", // Vitamin E
    1092: "potassium", // Potassium, K
    1087: "calcium", // Calcium, Ca
    1089: "iron", // Iron, Fe
    1090: "magnesium", // Magnesium, Mg
    1091: "phosphorus", // Phosphorus, P
    1093: "sodium", // Sodium, Na
    1098: "copper", // Copper, Cu
    1101: "manganese", // Manganese, Mn
    1165: "thiamin", // Thiamin
    1166: "riboflavin", // Riboflavin
    1177: "folate", // Folate, total
    1178: "vitaminB12", // Vitamin B-12
    1114: "vitaminD", // Vitamin D (D2 + D3)
  };

  const result = {};
  nutrients.forEach((nutrient) => {
    const key = nutrientMap[nutrient.nutrientId];
    if (key && nutrient.value !== undefined) {
      result[key] = Math.round((nutrient.value || 0) * 100) / 100;
    }
  });

  return result;
}

function generateHealthBenefits(nutrients, foodName) {
  const benefits = [];

  if (nutrients.protein > 15)
    benefits.push("High in protein for muscle health");
  if (nutrients.fiber > 3)
    benefits.push("Good source of fiber for digestive health");
  if (nutrients.vitaminC > 10)
    benefits.push("Rich in vitamin C for immune support");
  if (nutrients.potassium > 200)
    benefits.push("Contains potassium for heart health");
  if (nutrients.calcium > 100)
    benefits.push("Good source of calcium for bone health");
  if (nutrients.iron > 2) benefits.push("Contains iron for blood health");

  return benefits.length > 0
    ? benefits.join(". ") + "."
    : `${foodName} provides essential nutrients for overall health.`;
}

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: "Please provide a food item to search" });
  }

  try {
    const response = await fetch(
      `${USDA_API_URL}?api_key=${USDA_API_KEY}&query=${encodeURIComponent(
        query
      )}&pageSize=1&dataType=Foundation,SR%20Legacy`
    );

    if (!response.ok) {
      throw new Error("USDA API request failed");
    }

    const data = await response.json();

    if (!data.foods || data.foods.length === 0) {
      return res.status(404).json({
        error: `No nutrition data found for "${query}".`,
      });
    }

    const food = data.foods[0];

    const nutrients = extractNutrients(food.foodNutrients || []);

    const nutritionData = {
      name: food.description,
      category: food.foodCategory,
      calories: nutrients.calories || 0,
      protein: nutrients.protein || 0,
      carbs: nutrients.carbs || 0,
      fat: nutrients.fat || 0,
      fiber: nutrients.fiber || 0,
      vitamins: [
        nutrients.vitaminC ? `Vitamin C: ${nutrients.vitaminC}mg` : null,
        nutrients.vitaminK ? `Vitamin K: ${nutrients.vitaminK}mcg` : null,
        nutrients.vitaminE ? `Vitamin E: ${nutrients.vitaminE}mg` : null,
        nutrients.vitaminD ? `Vitamin D: ${nutrients.vitaminD}mcg` : null,
        nutrients.vitaminB12 ? `Vitamin B12: ${nutrients.vitaminB12}mcg` : null,
        nutrients.thiamin ? `Thiamin: ${nutrients.thiamin}mg` : null,
        nutrients.riboflavin ? `Riboflavin: ${nutrients.riboflavin}mg` : null,
        nutrients.folate ? `Folate: ${nutrients.folate}mcg` : null,
        nutrients.potassium ? `Potassium: ${nutrients.potassium}mg` : null,
        nutrients.calcium ? `Calcium: ${nutrients.calcium}mg` : null,
        nutrients.iron ? `Iron: ${nutrients.iron}mg` : null,
        nutrients.magnesium ? `Magnesium: ${nutrients.magnesium}mg` : null,
        nutrients.phosphorus ? `Phosphorus: ${nutrients.phosphorus}mg` : null,
        nutrients.sodium ? `Sodium: ${nutrients.sodium}mg` : null,
        nutrients.copper ? `Copper: ${nutrients.copper}mg` : null,
        nutrients.manganese ? `Manganese: ${nutrients.manganese}mg` : null,
      ].filter(Boolean),
      benefits: generateHealthBenefits(nutrients, food.description),
    };

    res.status(200).json(nutritionData);
  } catch (error) {
    console.error("API Error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch nutrition data. Please try again." });
  }
}
