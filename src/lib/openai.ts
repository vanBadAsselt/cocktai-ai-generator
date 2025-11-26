import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Note: In production, API calls should go through a backend
});

export interface Recipe {
  name: string;
  description: string;
  ingredients: Array<{
    name: string;
    amount: string;
  }>;
  instructions: string[];
  glassType: string;
  garnish?: string;
}

export interface RecipeGenerationOptions {
  ingredients: string[];
  vibe?: string;
  isMocktail?: boolean;
  count?: number;
}

/**
 * Generate cocktail recipes using OpenAI based on available ingredients
 */
export async function generateRecipes(
  options: RecipeGenerationOptions
): Promise<Recipe[]> {
  const { ingredients, vibe, isMocktail = false, count = 3 } = options;

  const systemPrompt = `You are an expert mixologist and cocktail recipe creator. Your task is to create ${count} unique and delicious ${isMocktail ? "mocktail (non-alcoholic)" : "cocktail"} recipes.

CRITICAL RULES:
1. The user's selected ingredients are the PRIMARY ingredients - each recipe MUST feature at least one of them prominently
2. You MAY also use common bar staples that any home bar would have: ice, water, simple syrup, club soda, bitters, citrus juice (lime/lemon)
3. If the user selected garnishes, incorporate them creatively
4. Each recipe must be COMPLETELY different from the others - vary the ratios, techniques, and presentations
5. Create REAL, BALANCED cocktails using proper mixology techniques
6. Be creative and upscale - these should be craft cocktails, not just mixing two things together
7. Include precise measurements and clear techniques
8. Never suggest dangerous combinations

IMPORTANT: Make quality drinks! If the user only selected 2-3 ingredients, enhance them with citrus, bitters, or simple syrup to create balanced, professional cocktails.

Return your response as a JSON object with a "recipes" array containing ${count} recipe objects.

EXACT FORMAT REQUIRED:
{
  "recipes": [
    {
      "name": "Creative cocktail name",
      "description": "Brief 1-2 sentence description of the drink and its flavor profile",
      "ingredients": [
        {"name": "Ingredient name", "amount": "2 oz"}
      ],
      "instructions": ["Step 1", "Step 2", "Step 3"],
      "glassType": "Type of glass (e.g., 'Highball', 'Martini', 'Rocks')",
      "garnish": "Optional garnish suggestion"
    }
  ]
}`;

  const userPrompt = `Create ${count} ${isMocktail ? "mocktail (non-alcoholic)" : "cocktail"} recipes featuring these ingredients as the PRIMARY components:
${ingredients.join(", ")}

${vibe ? `The drinks should match this vibe/theme: ${vibe}` : ""}

Remember: Feature my ingredients prominently! You can add bar staples (citrus, simple syrup, bitters, soda) to create balanced, professional cocktails. Make these drinks exciting and delicious!`;

  try {
    const completion = await openai.chat.completions.create({
      model: import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.9, // Higher temperature for more creativity
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    const response = JSON.parse(content);

    // Handle both array and object with recipes/cocktails array
    const recipes = Array.isArray(response)
      ? response
      : (response.recipes || response.cocktails);

    if (!recipes || !Array.isArray(recipes)) {
      throw new Error("Invalid response format from OpenAI");
    }

    return recipes;
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to generate recipes"
    );
  }
}

/**
 * Identify ingredients from an image using OpenAI Vision API
 */
export async function identifyIngredientsFromImage(
  imageDataUrl: string
): Promise<string[]> {
  const systemPrompt = `You are an expert at identifying bottles, ingredients, and bar supplies from photos.

Your task is to identify ALL visible bottles, ingredients, and bar items in the image.

IMPORTANT:
1. Look for bottle labels, logos, and text
2. Identify spirits (vodka, gin, rum, tequila, whiskey, etc.)
3. Identify mixers (sodas, juices, tonic water, etc.)
4. Identify garnishes (limes, lemons, mint, etc.)
5. Be specific about brands when visible
6. If you can't read a label clearly, make your best guess based on bottle shape/color

Return your response as a JSON object with this structure:
{
  "ingredients": ["ingredient1", "ingredient2", "ingredient3"]
}

List each identifiable ingredient separately. For example, if you see a bottle of vodka and a lime, return:
{"ingredients": ["Vodka", "Lime"]}`;

  const userPrompt = `Please identify all bottles, ingredients, and bar supplies visible in this image. Be thorough!`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Vision model
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            { type: "text", text: userPrompt },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl,
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 500,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("No response from OpenAI Vision");
    }

    const response = JSON.parse(content);

    if (!response.ingredients || !Array.isArray(response.ingredients)) {
      throw new Error("Invalid response format from OpenAI Vision");
    }

    return response.ingredients;
  } catch (error) {
    console.error("Error identifying ingredients:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to identify ingredients from image"
    );
  }
}

/**
 * Convert a File object to a base64 data URL
 */
export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to data URL"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
