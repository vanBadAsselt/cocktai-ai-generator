import { motion } from "framer-motion";
import { Wine, Check } from "lucide-react";
import type { Recipe } from "@/lib/openai";

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

export function RecipeCard({ recipe, index }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-3xl p-8 space-y-6"
    >
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold text-white font-outfit text-shadow">
            {recipe.name}
          </h3>
          <Wine className="w-8 h-8 text-coral drop-shadow-lg" />
        </div>
        <p className="text-white/90 text-lg font-outfit">{recipe.description}</p>
      </div>

      {/* Glass Type */}
      <div className="inline-block px-4 py-2 bg-teal/20 rounded-full border border-teal/40">
        <span className="text-teal font-semibold font-outfit">
          {recipe.glassType}
        </span>
      </div>

      {/* Ingredients */}
      <div className="space-y-3">
        <h4 className="text-xl font-bold text-coral font-outfit">Ingredients</h4>
        <div className="space-y-2">
          {recipe.ingredients.map((ingredient, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + idx * 0.05 }}
              className="flex items-center gap-3 bg-white/10 rounded-lg p-3"
            >
              <Check className="w-5 h-5 text-teal flex-shrink-0" />
              <span className="text-white font-outfit">
                <span className="font-semibold">{ingredient.amount}</span> {ingredient.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="space-y-3">
        <h4 className="text-xl font-bold text-coral font-outfit">Instructions</h4>
        <ol className="space-y-2">
          {recipe.instructions.map((instruction, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + idx * 0.05 + 0.2 }}
              className="flex gap-3 text-white font-outfit"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal flex items-center justify-center text-sm font-bold">
                {idx + 1}
              </span>
              <span className="flex-1">{instruction}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Garnish */}
      {recipe.garnish && (
        <div className="pt-4 border-t border-white/20">
          <p className="text-white/90 font-outfit">
            <span className="font-semibold text-teal">Garnish:</span> {recipe.garnish}
          </p>
        </div>
      )}
    </motion.div>
  );
}
