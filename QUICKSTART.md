# CocktAIl - Quick Start 🚀

Get your AI-powered cocktail generator running in 3 minutes!

## Step 1: Create `.env` file

```bash
cp .env.example .env
```

## Step 2: Add your OpenAI API Key

Edit the `.env` file and add your API key:

```env
VITE_OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

Get your API key from: https://platform.openai.com/api-keys

## Step 3: Start the app

```bash
npm run dev
```

Open http://localhost:8080 in your browser!

---

## ✨ What's New

### UI Improvements
- ✅ **Better contrast** - All text is now easily readable
- ✅ **Improved button states** - Clear visual feedback on selection
- ✅ **Enhanced glassmorphism** - More beautiful card effects
- ✅ **Text shadows** - Better readability on gradient backgrounds

### New Features Implemented
- ✅ **AI Recipe Generation** - Get 3 unique cocktails powered by OpenAI
- ✅ **Vibe Selector** - Choose a mood (Cozy, Wild, Sophisticated, etc.)
- ✅ **Mocktail Mode** - Toggle for non-alcoholic recipes
- ✅ **Snap & Sip** - Upload photos to identify ingredients with AI Vision
- ✅ **Beautiful Recipe Cards** - Gorgeous display with step-by-step instructions

---

## 🎯 How to Use

1. **Select ingredients** you have (click the chips)
2. **Choose a vibe** (optional) like "Tropical" or "Sophisticated"
3. **Toggle Mocktail Mode** if you want non-alcoholic drinks
4. **Click "Generate Cocktails"**
5. **Enjoy 3 unique AI-generated recipes!**

Or use **Snap & Sip** to upload a photo of your bar!

---

## 💡 Tips

- The AI works best with at least 3-4 ingredients
- Try different vibe combinations for creative recipes
- Snap & Sip works great with clear, well-lit photos
- Each generation creates completely new recipes!

---

## ⚠️ Important

This app makes OpenAI API calls directly from the browser. For production:
- Set up a backend proxy
- Keep API keys on the server
- Implement rate limiting

See [SETUP.md](SETUP.md) for full details.

---

**Ready to mix? Let's go!** 🍸✨
