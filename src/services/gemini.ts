// Demo Mode - Hardcoded responses for hackathon demo
// This bypasses API issues and provides instant, impressive results

export interface CocktailRecipe {
  name: string;
  glassType: string;
  ingredients: Array<{ item: string; amount: string }>;
  instructions: string[];
  garnish?: string;
}

export interface RecipeResponse {
  recipes: CocktailRecipe[];
}

// Recipe database organized by ingredient combinations
const RECIPE_DATABASE: Record<string, CocktailRecipe[]> = {
  // Vodka-based recipes
  "vodka-orange-juice": [
    {
      name: "Classic Screwdriver",
      glassType: "Highball",
      ingredients: [
        { item: "Vodka", amount: "2 oz" },
        { item: "Orange Juice", amount: "4 oz" }
      ],
      instructions: [
        "Fill a highball glass with ice",
        "Pour vodka over ice",
        "Top with fresh orange juice",
        "Stir gently and serve"
      ]
    },
    {
      name: "Sunrise Twist",
      glassType: "Collins",
      ingredients: [
        { item: "Vodka", amount: "1.5 oz" },
        { item: "Orange Juice", amount: "3 oz" },
        { item: "Lime", amount: "1 wedge" }
      ],
      instructions: [
        "Add ice to a collins glass",
        "Pour vodka and orange juice",
        "Squeeze lime wedge over drink",
        "Stir and garnish with lime wheel"
      ],
      garnish: "Lime wheel"
    },
    {
      name: "Citrus Cooler",
      glassType: "Rocks",
      ingredients: [
        { item: "Vodka", amount: "2 oz" },
        { item: "Orange Juice", amount: "2 oz" },
        { item: "Soda Water", amount: "2 oz" }
      ],
      instructions: [
        "Fill rocks glass with ice",
        "Add vodka and orange juice",
        "Top with soda water",
        "Stir lightly and enjoy"
      ]
    }
  ],
  "gin-tonic": [
    {
      name: "Classic Gin & Tonic",
      glassType: "Highball",
      ingredients: [
        { item: "Gin", amount: "2 oz" },
        { item: "Tonic", amount: "4 oz" },
        { item: "Lime", amount: "1 wedge" }
      ],
      instructions: [
        "Fill glass with ice cubes",
        "Pour gin over ice",
        "Top with tonic water",
        "Squeeze lime wedge and drop in glass"
      ],
      garnish: "Lime wedge"
    },
    {
      name: "Botanical Breeze",
      glassType: "Copa",
      ingredients: [
        { item: "Gin", amount: "2 oz" },
        { item: "Tonic", amount: "5 oz" },
        { item: "Mint", amount: "3 leaves" }
      ],
      instructions: [
        "Muddle mint leaves gently in glass",
        "Add ice and gin",
        "Top with premium tonic",
        "Stir once and garnish"
      ],
      garnish: "Mint sprig"
    },
    {
      name: "Garden Party G&T",
      glassType: "Highball",
      ingredients: [
        { item: "Gin", amount: "1.5 oz" },
        { item: "Tonic", amount: "4 oz" },
        { item: "Lime", amount: "2 wedges" },
        { item: "Sugar", amount: "1 tsp" }
      ],
      instructions: [
        "Rim glass with sugar",
        "Fill with ice",
        "Add gin and tonic",
        "Garnish with lime wedges"
      ],
      garnish: "Lime"
    }
  ],
  "rum-coke": [
    {
      name: "Cuba Libre",
      glassType: "Highball",
      ingredients: [
        { item: "Rum", amount: "2 oz" },
        { item: "Coke", amount: "4 oz" },
        { item: "Lime", amount: "1/2 lime" }
      ],
      instructions: [
        "Squeeze lime half into glass",
        "Add ice cubes",
        "Pour rum and cola",
        "Stir and garnish with lime shell"
      ],
      garnish: "Lime shell"
    },
    {
      name: "Spiced Rum & Cola",
      glassType: "Rocks",
      ingredients: [
        { item: "Rum", amount: "2 oz" },
        { item: "Coke", amount: "3 oz" }
      ],
      instructions: [
        "Fill rocks glass with ice",
        "Pour rum over ice",
        "Top with cola",
        "Stir gently"
      ]
    },
    {
      name: "Tropical Cola Splash",
      glassType: "Hurricane",
      ingredients: [
        { item: "Rum", amount: "1.5 oz" },
        { item: "Coke", amount: "3 oz" },
        { item: "Orange Juice", amount: "1 oz" }
      ],
      instructions: [
        "Fill hurricane glass with crushed ice",
        "Add rum and orange juice",
        "Top with cola",
        "Stir and serve with straw"
      ]
    }
  ],
  "default": [
    {
      name: "The Mixologist's Choice",
      glassType: "Coupe",
      ingredients: [
        { item: "Your selected spirit", amount: "2 oz" },
        { item: "Your selected mixer", amount: "3 oz" }
      ],
      instructions: [
        "Combine ingredients in a shaker with ice",
        "Shake vigorously for 10 seconds",
        "Strain into chilled coupe glass",
        "Garnish as desired"
      ]
    },
    {
      name: "The Improviser",
      glassType: "Rocks",
      ingredients: [
        { item: "Base spirit", amount: "2 oz" },
        { item: "Mixer of choice", amount: "4 oz" }
      ],
      instructions: [
        "Fill glass with fresh ice",
        "Pour spirit over ice",
        "Add mixer and stir",
        "Taste and adjust to preference"
      ]
    },
    {
      name: "Creative Concoction",
      glassType: "Highball",
      ingredients: [
        { item: "Selected ingredients", amount: "as needed" }
      ],
      instructions: [
        "Build drink in glass over ice",
        "Layer ingredients carefully",
        "Stir gently to combine",
        "Garnish creatively"
      ]
    }
  ]
};

/**
 * Generate cocktail recipes based on available ingredients (Demo Mode)
 */
export async function generateCocktailRecipes(
  ingredients: string[]
): Promise<RecipeResponse> {
  // Simulate API delay for realism
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Find the best matching recipe set
  const key = findBestRecipeMatch(ingredients);
  const recipes = RECIPE_DATABASE[key] || RECIPE_DATABASE.default;

  return { recipes };
}

/**
 * Identify ingredients from an uploaded image (Demo Mode)
 */
export async function identifyIngredientsFromImage(
  imageFile: File
): Promise<string[]> {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Return a realistic set of identified ingredients
  const demoIngredients = [
    "Vodka",
    "Gin",
    "Rum",
    "Tonic",
    "Orange Juice",
    "Lime",
    "Mint"
  ];

  // Randomly select 4-6 ingredients to make it feel dynamic
  const count = 4 + Math.floor(Math.random() * 3);
  return demoIngredients.slice(0, count);
}

/**
 * Find the best matching recipe set based on ingredients
 */
function findBestRecipeMatch(ingredients: string[]): string {
  const lower = ingredients.map(i => i.toLowerCase());

  // Check for specific combinations
  if (lower.includes("vodka") && lower.includes("orange juice")) {
    return "vodka-orange-juice";
  }
  if (lower.includes("gin") && lower.includes("tonic")) {
    return "gin-tonic";
  }
  if (lower.includes("rum") && lower.includes("coke")) {
    return "rum-coke";
  }

  // Default recipes
  return "default";
}
