# CocktAIl - Setup Instructions

## Prerequisites
- Node.js (v18 or higher)
- Google Gemini API Key (free tier available at [Google AI Studio](https://makersuite.google.com/app/apikey))

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

## Usage

### Virtual Bar (Manual Selection)
1. Click on ingredients you have available (Spirits, Mixers, Garnishes)
2. Selected ingredients will glow with a teal color
3. Click "Generate Cocktail" to get 3 AI-generated recipes

### Snap & Sip (Image Recognition)
1. Click "Upload Photo" in the Snap & Sip card
2. Select an image of your liquor cabinet or bottles
3. AI will identify the ingredients and auto-select them
4. Click "Generate Cocktail" to get recipes

## Features
- ✨ AI-powered recipe generation using Google Gemini
- 📸 Image recognition for ingredient identification
- 🎨 Premium Glassmorphism UI
- 📱 Mobile-responsive design
- 🎭 Smooth animations with Framer Motion

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the repository in Vercel
3. Add `VITE_GEMINI_API_KEY` as an environment variable in Vercel settings
4. Deploy!

## Troubleshooting

**"Failed to generate recipes"**
- Check that your Gemini API key is correct in `.env`
- Ensure you have selected at least one ingredient
- Check browser console for detailed error messages

**"Failed to identify ingredients"**
- Make sure the image clearly shows bottle labels
- Try a different image with better lighting
- The free tier has rate limits - wait a moment and try again
# CocktAIl Setup Guide

Welcome to **CocktAIl** - The AI-Powered Mixologist! 🍹

This guide will help you set up and run the application locally.

---

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **OpenAI API Key** (get one from [platform.openai.com](https://platform.openai.com))

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure OpenAI API Key

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then edit the `.env` file and add your OpenAI API key:

```env
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
VITE_OPENAI_MODEL=gpt-4o-mini
```

**Important:**
- Replace `sk-your-actual-api-key-here` with your actual OpenAI API key
- The `.env` file is gitignored and will not be committed to version control
- Never share your API key publicly!

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:8080](http://localhost:8080)

---

## Features

### ✨ Core Features

1. **Virtual Bar Inventory** - Select ingredients you have on hand
   - Spirits: Vodka, Gin, Rum, Tequila, Whiskey
   - Mixers: Coke, Soda Water, Tonic, Orange Juice, Lemon Juice
   - Garnishes: Lime, Mint, Sugar, Salt

2. **AI Recipe Generation** - Get 3 unique cocktail recipes based on your ingredients
   - Powered by OpenAI GPT-4o-mini
   - Creative and diverse recipe suggestions
   - Precise measurements and step-by-step instructions

3. **Vibe Selector** (Optional) - Set the mood for your cocktails
   - Cozy, Wild, Sophisticated, Tropical, Festive, Romantic

4. **Mocktail Mode** - Generate non-alcoholic versions
   - Toggle on/off with a single click
   - All recipes adapt to exclude alcohol

5. **Snap & Sip** 📸 - Upload a photo to identify ingredients
   - Uses OpenAI Vision API (GPT-4o-mini)
   - Automatically detects bottles and ingredients
   - Adds identified ingredients to your selection

---

## How to Use

### Method 1: Manual Selection

1. **Select Ingredients** - Click on the ingredient chips to select what you have
2. **Choose a Vibe** (Optional) - Select a mood/theme for your cocktails
3. **Enable Mocktail Mode** (Optional) - Toggle if you want non-alcoholic drinks
4. **Generate Cocktails** - Click the floating "Generate Cocktails" button
5. **View Your Recipes** - Scroll down to see 3 unique recipe cards

### Method 2: Snap & Sip

1. **Take a Photo** - Snap a clear photo of your liquor cabinet or bottles
2. **Upload** - Click "Upload Photo" in the Snap & Sip card
3. **Wait for AI** - The Vision API will identify your ingredients
4. **Review & Adjust** - Check the auto-selected ingredients and add/remove as needed
5. **Generate** - Click "Generate Cocktails" to get your recipes

---

## UI Improvements Made

### Contrast Fixes
- **Increased glass card opacity** from 0.1 to 0.15 for better background contrast
- **Enhanced backdrop blur** from 10px to 16px with saturation boost
- **Improved border visibility** with increased opacity (0.2 → 0.3)
- **Added text shadows** for all white text on gradient backgrounds
- **Better button states**: Unselected buttons now have `bg-white/20` instead of `bg-white/10`
- **Added borders** to unselected buttons for clearer visual hierarchy
- **Enhanced shadows** for better depth perception

### Visual Polish
- Drop shadows on icons for better visibility
- Inset highlights on glass cards for premium look
- Consistent text shadow utility class for readability
- Better color contrast between coral and teal accent colors

---

## Project Structure

```
cocktai-ai-generator/
├── src/
│   ├── components/
│   │   ├── RecipeCard.tsx          # Beautiful recipe display component
│   │   └── ui/                     # shadcn/ui component library
│   ├── lib/
│   │   ├── openai.ts               # OpenAI API utilities
│   │   └── utils.ts                # General utilities
│   ├── pages/
│   │   ├── Index.tsx               # Main app page
│   │   └── NotFound.tsx            # 404 page
│   ├── App.tsx                     # App root with providers
│   ├── index.css                   # Global styles & design tokens
│   └── main.tsx                    # Entry point
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore (includes .env)
├── package.json                    # Dependencies
├── requirements_final.md           # Full project requirements
├── SETUP.md                        # This file!
└── vite.config.ts                  # Vite configuration
```

---

## Available Scripts

```bash
# Development
npm run dev          # Start dev server on port 8080

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

---

## Technology Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + Custom Glassmorphism
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React Hooks + Zustand-ready
- **AI Integration**: OpenAI GPT-4o-mini (text + vision)
- **Icons**: Lucide React
- **Notifications**: Sonner (toast library)
- **Routing**: React Router v6

---

## API Usage & Costs

### OpenAI Models Used

1. **Recipe Generation**: `gpt-4o-mini` (configurable via `VITE_OPENAI_MODEL`)
   - Cost: ~$0.150 / 1M input tokens, ~$0.600 / 1M output tokens
   - Typical recipe generation: ~500 input + ~800 output tokens = **~$0.001 per generation**

2. **Vision (Snap & Sip)**: `gpt-4o-mini`
   - Cost: Same as above + image processing
   - Typical image analysis: ~$0.002-0.005 per image

**Estimated costs per user session**: $0.005-0.02 (depending on usage)

### Rate Limits

Free tier limits (as of 2024):
- **gpt-4o-mini**: 500 RPM, 200,000 TPM

Paid tier (Tier 1):
- **gpt-4o-mini**: 500 RPM, 2,000,000 TPM

---

## Troubleshooting

### "OpenAI API key not found"
- Make sure you've created a `.env` file
- Check that `VITE_OPENAI_API_KEY` is set correctly
- Restart the dev server after creating/editing `.env`

### "Failed to generate recipes"
- Verify your API key is valid at [platform.openai.com](https://platform.openai.com)
- Check your OpenAI account has credits/billing enabled
- Check browser console for detailed error messages

### "No ingredients identified" from Snap & Sip
- Ensure the photo is clear and well-lit
- Make sure bottle labels are visible
- Try a closer shot of the bottles
- The AI works best with clear, focused images

### Build/Import Errors
- Run `npm install` again to ensure all dependencies are installed
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v18+)

---

## Security Notes

⚠️ **Important**: This app uses `dangerouslyAllowBrowser: true` for the OpenAI client, which means API calls are made directly from the browser. This is **NOT recommended for production**.

### For Production Deployment:
1. Create a backend API endpoint to proxy OpenAI requests
2. Store the API key securely on the server (not in client code)
3. Implement rate limiting and user authentication
4. Remove `dangerouslyAllowBrowser: true` from the OpenAI client

Example backend structure:
```
POST /api/generate-recipes
POST /api/identify-ingredients
```

---

## Next Steps / Future Enhancements

- [ ] Save favorite recipes to localStorage
- [ ] Share cocktail menus via QR code
- [ ] User accounts and recipe history
- [ ] More ingredient categories (bitters, syrups, liqueurs)
- [ ] Ingredient substitution suggestions
- [ ] Cocktail difficulty ratings
- [ ] Print-friendly recipe cards
- [ ] Social sharing features

---

## Contributing

This is a hackathon project! Feel free to:
- Report bugs
- Suggest new features
- Improve the UI/UX
- Add more ingredient options

---

## License

MIT License - See LICENSE file for details

---

## Credits

**Team**: Ctrl+Alt+Delight
**Product**: CocktAIl - The AI-Powered Mixologist
**Powered by**: OpenAI GPT-4o-mini

---

Enjoy crafting delicious cocktails with AI! 🍸✨
