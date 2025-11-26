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
