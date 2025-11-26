import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Sparkles, Wine, Loader2 } from "lucide-react";
import { generateRecipes, identifyIngredientsFromImage, fileToDataUrl, type Recipe } from "@/lib/openai";
import { RecipeCard } from "@/components/RecipeCard";
import { toast } from "sonner";

const Index = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [vibe, setVibe] = useState<string>("");
  const [isMocktail, setIsMocktail] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isIdentifying, setIsIdentifying] = useState(false);

  const ingredients = {
    spirits: ["Vodka", "Gin", "Rum", "Tequila", "Whiskey"],
    mixers: ["Coke", "Soda Water", "Tonic", "Orange Juice", "Lemon Juice"],
    garnishes: ["Lime", "Mint", "Sugar", "Salt"],
  };

  const vibes = ["Cozy", "Wild", "Sophisticated", "Tropical", "Festive", "Romantic"];

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleGenerateRecipes = async () => {
    if (selectedIngredients.length === 0) {
      toast.error("Please select at least one ingredient!");
      return;
    }

    setIsGenerating(true);
    setRecipes([]);

    try {
      const generatedRecipes = await generateRecipes({
        ingredients: selectedIngredients,
        vibe: vibe || undefined,
        isMocktail,
        count: 3,
      });

      setRecipes(generatedRecipes);
      toast.success(`Generated ${generatedRecipes.length} delicious recipes!`);

      // Scroll to recipes
      setTimeout(() => {
        document.getElementById("recipes-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate recipes"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setIsIdentifying(true);

    try {
      const dataUrl = await fileToDataUrl(file);
      const identifiedIngredients = await identifyIngredientsFromImage(dataUrl);

      if (identifiedIngredients.length === 0) {
        toast.warning("No ingredients identified. Try a clearer photo!");
        return;
      }

      // Add identified ingredients to selection
      setSelectedIngredients((prev) => {
        const newIngredients = identifiedIngredients.filter(
          (ing) => !prev.includes(ing)
        );
        return [...prev, ...newIngredients];
      });

      toast.success(
        `Identified ${identifiedIngredients.length} ingredients: ${identifiedIngredients.join(", ")}`
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to identify ingredients from image"
      );
    } finally {
      setIsIdentifying(false);
      // Reset the input so the same file can be uploaded again
      event.target.value = "";
    }
  };

  return (
    <div className="min-h-screen animated-gradient overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-12 pb-8 text-center px-4"
      >
        <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-2 font-outfit">
          CocktAIl
        </h1>
        <p className="text-xl md:text-2xl text-white font-outfit text-shadow">
          The AI-Powered Mixologist
        </p>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-32">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Virtual Bar - Ingredient Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2 font-outfit">
              <Wine className="w-8 h-8 text-teal" />
              What do you have?
            </h2>

            {/* Spirits */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-coral mb-3 font-outfit">
                Spirits
              </h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.spirits.map((spirit) => (
                  <motion.button
                    key={spirit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleIngredient(spirit)}
                    className={`px-4 py-2 rounded-full font-medium transition-all font-outfit ${selectedIngredients.includes(spirit)
                        ? "bg-teal text-white shadow-lg shadow-teal/50"
                        : "bg-white/20 text-white hover:bg-white/30 border border-white/40"
                    }`}
                  >
                    {spirit}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mixers */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-coral mb-3 font-outfit">
                Mixers
              </h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.mixers.map((mixer) => (
                  <motion.button
                    key={mixer}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleIngredient(mixer)}
                    className={`px-4 py-2 rounded-full font-medium transition-all font-outfit ${selectedIngredients.includes(mixer)
                        ? "bg-teal text-white shadow-lg shadow-teal/50"
                        : "bg-white/20 text-white hover:bg-white/30 border border-white/40"
                    }`}
                  >
                    {mixer}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Garnishes */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-coral mb-3 font-outfit">
                Garnishes
              </h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.garnishes.map((garnish) => (
                  <motion.button
                    key={garnish}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleIngredient(garnish)}
                    className={`px-4 py-2 rounded-full font-medium transition-all font-outfit ${selectedIngredients.includes(garnish)
                        ? "bg-teal text-white shadow-lg shadow-teal/50"
                        : "bg-white/20 text-white hover:bg-white/30 border border-white/40"
                    }`}
                  >
                    {garnish}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Vibe Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-coral mb-3 font-outfit">
                Vibe (Optional)
              </h3>
              <div className="flex flex-wrap gap-2">
                {vibes.map((vibeOption) => (
                  <motion.button
                    key={vibeOption}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVibe(vibe === vibeOption ? "" : vibeOption)}
                    className={`px-4 py-2 rounded-full font-medium transition-all font-outfit ${
                      vibe === vibeOption
                        ? "bg-coral text-white shadow-lg shadow-coral/50"
                        : "bg-white/20 text-white hover:bg-white/30 border border-white/40"
                    }`}
                  >
                    {vibeOption}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mocktail Mode */}
            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMocktail(!isMocktail)}
                className={`w-full px-6 py-4 rounded-2xl font-medium transition-all font-outfit text-lg ${
                  isMocktail
                    ? "bg-coral text-white shadow-lg shadow-coral/50"
                    : "bg-white/20 text-white hover:bg-white/30 border border-white/40"
                }`}
              >
                {isMocktail ? "✓ Mocktail Mode (Non-Alcoholic)" : "Mocktail Mode"}
              </motion.button>
            </div>
          </motion.div>

          {/* Snap & Sip */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 animate-float"
          >
            {isIdentifying ? (
              <Loader2 className="w-20 h-20 text-coral drop-shadow-lg animate-spin" />
            ) : (
              <Camera className="w-20 h-20 text-coral drop-shadow-lg" />
            )}
            <h2 className="text-3xl font-bold text-white font-outfit text-shadow">
              Snap & Sip
            </h2>
            <p className="text-white text-lg font-outfit text-shadow">
              {isIdentifying
                ? "Identifying ingredients..."
                : "Or snap a photo of your cabinet"}
            </p>
            <motion.label
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`glass-card rounded-2xl px-8 py-4 cursor-pointer hover:bg-white/20 transition-all ${
                isIdentifying ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isIdentifying}
              />
              <span className="text-white font-semibold text-lg font-outfit">
                {isIdentifying ? "Processing..." : "Upload Photo"}
              </span>
            </motion.label>
          </motion.div>
        </div>

        {/* Recipe Display */}
        <div id="recipes-section" className="mt-12 max-w-6xl mx-auto">
          {isGenerating ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-3xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4 font-outfit">
                Crafting Your Perfect Cocktails...
              </h3>
              <div className="h-64 flex items-center justify-center">
                <Loader2 className="w-16 h-16 text-teal animate-spin" />
              </div>
            </motion.div>
          ) : recipes.length > 0 ? (
            <div className="space-y-8">
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white text-center mb-8 font-outfit text-shadow"
              >
                Your Cocktail Menu
              </motion.h3>
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card rounded-3xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4 font-outfit text-shadow">
                Your Perfect Cocktail Will Appear Here
              </h3>
              <div className="h-64 flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-teal/50 animate-pulse" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Floating Generate Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerateRecipes}
          disabled={selectedIngredients.length === 0 || isGenerating}
          className="bg-teal hover:bg-teal/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transition-all animate-pulse-glow font-outfit flex items-center gap-3"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              Generate Cocktails
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Index;

