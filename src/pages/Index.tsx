import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, Wine, Loader2 } from "lucide-react";
import { generateCocktailRecipes, identifyIngredientsFromImage, CocktailRecipe } from "@/services/gemini";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<CocktailRecipe[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const { toast } = useToast();

  const ingredients = {
    spirits: ["Vodka", "Gin", "Rum", "Tequila", "Whiskey"],
    mixers: ["Coke", "Soda Water", "Tonic", "Orange Juice", "Lemon Juice"],
    garnishes: ["Lime", "Mint", "Sugar", "Salt"],
  };

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleGenerateRecipes = async () => {
    if (selectedIngredients.length === 0) return;

    setIsGenerating(true);
    try {
      const response = await generateCocktailRecipes(selectedIngredients);
      setRecipes(response.recipes);
      toast({
        title: "Cocktails Generated! 🍹",
        description: `Created ${response.recipes.length} delicious recipes for you.`,
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: error instanceof Error ? error.message : "Failed to generate recipes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzingImage(true);
    try {
      const identifiedIngredients = await identifyIngredientsFromImage(file);
      setSelectedIngredients(identifiedIngredients);
      toast({
        title: "Ingredients Identified! 📸",
        description: `Found ${identifiedIngredients.length} ingredients in your photo.`,
      });
    } catch (error) {
      toast({
        title: "Oops!",
        description: error instanceof Error ? error.message : "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzingImage(false);
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
        <p className="text-xl md:text-2xl text-white/90 font-outfit">
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
                        : "bg-white/10 text-white hover:bg-white/20"
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
                        : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                  >
                    {mixer}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Garnishes */}
            <div>
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
                        : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                  >
                    {garnish}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Snap & Sip */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 animate-float"
          >
            {isAnalyzingImage ? (
              <>
                <Loader2 className="w-20 h-20 text-coral animate-spin" />
                <h2 className="text-3xl font-bold text-white font-outfit">
                  Analyzing Your Cabinet...
                </h2>
                <p className="text-white/80 text-lg font-outfit">
                  AI is identifying your ingredients
                </p>
              </>
            ) : (
              <>
                <Camera className="w-20 h-20 text-coral" />
                <h2 className="text-3xl font-bold text-white font-outfit">
                  Snap & Sip
                </h2>
                <p className="text-white/80 text-lg font-outfit">
                  Or snap a photo of your cabinet
                </p>
                <motion.label
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-card rounded-2xl px-8 py-4 cursor-pointer hover:bg-white/20 transition-all"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <span className="text-white font-semibold text-lg font-outfit">
                    Upload Photo
                  </span>
                </motion.label>
              </>
            )}
          </motion.div>
        </div>

        {/* Recipe Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {recipes.length === 0 ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card rounded-3xl p-8 text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-4 font-outfit">
                  Your Perfect Cocktail Will Appear Here
                </h3>
                <div className="h-64 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-teal/50 animate-pulse" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="recipes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid md:grid-cols-3 gap-6"
              >
                {recipes.map((recipe, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card rounded-3xl p-6 space-y-4"
                  >
                    <h3 className="text-2xl font-bold text-white font-outfit">
                      {recipe.name}
                    </h3>
                    <p className="text-coral font-semibold font-outfit">
                      {recipe.glassType}
                    </p>

                    <div>
                      <h4 className="text-white font-semibold mb-2 font-outfit">
                        Ingredients:
                      </h4>
                      <ul className="space-y-1 text-white/80 text-sm">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i} className="font-outfit">
                            {ing.amount} {ing.item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2 font-outfit">
                        Instructions:
                      </h4>
                      <ol className="space-y-1 text-white/80 text-sm list-decimal list-inside">
                        {recipe.instructions.map((step, i) => (
                          <li key={i} className="font-outfit">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {recipe.garnish && (
                      <p className="text-teal font-semibold text-sm font-outfit">
                        Garnish: {recipe.garnish}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
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
          disabled={selectedIngredients.length === 0 || isGenerating}
          onClick={handleGenerateRecipes}
          className="bg-teal hover:bg-teal/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transition-all animate-pulse-glow font-outfit flex items-center gap-3"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Cocktail"
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Index;

