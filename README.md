# 🍸 CocktAIl - The AI-Powered Mixologist

> **Team:** Ctrl+Alt+Delight
> **Tagline:** Your intelligent, creative bartender that turns available ingredients into premium cocktail recipes

An AI-powered cocktail recipe generator that creates unique, personalized drink recipes based on your available ingredients. No more boring drinks - let AI be your mixologist!

---

## ✨ Features

- 🍹 **AI Recipe Generation** - Get 3 unique cocktail recipes powered by OpenAI
- 📸 **Snap & Sip** - Upload photos to automatically identify bottles and ingredients
- 🎭 **Vibe Selector** - Set the mood: Cozy, Wild, Sophisticated, Tropical, Festive, or Romantic
- 🥤 **Mocktail Mode** - Toggle for non-alcoholic versions of any recipe
- 🎨 **Beautiful Glassmorphism UI** - Premium frosted-glass design with smooth animations
- 📱 **Mobile-First** - Fully responsive design optimized for kitchen/party use

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- OpenAI API Key ([Get one here](https://platform.openai.com/api-keys))

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure OpenAI:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your API key:
   ```env
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **Start the dev server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Visit [http://localhost:8080](http://localhost:8080)

📖 For detailed setup instructions, see [SETUP.md](SETUP.md)

---

## 🎯 How to Use

1. **Select your ingredients** - Click chips to choose spirits, mixers, and garnishes
2. **Choose a vibe** (optional) - Select a mood like "Tropical" or "Sophisticated"
3. **Toggle Mocktail Mode** if you want non-alcoholic drinks
4. **Generate Cocktails** - Click the button and get 3 unique recipes!

Or use **Snap & Sip** 📸 to upload a photo of your bar and let AI identify ingredients!

---

## 🛠 Tech Stack

- **React 18** + **TypeScript** - Modern, type-safe frontend
- **Vite 5** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling with custom glassmorphism
- **Framer Motion** - Smooth, delightful animations
- **shadcn/ui** - Beautiful, accessible UI components
- **OpenAI GPT-4o-mini** - AI recipe generation and vision
- **React Router** - Client-side routing
- **Sonner** - Toast notifications

---

## 📁 Project Structure

```
cocktai-ai-generator/
├── src/
│   ├── components/
│   │   ├── RecipeCard.tsx       # Recipe display component
│   │   └── ui/                  # shadcn/ui components
│   ├── lib/
│   │   ├── openai.ts            # OpenAI API utilities
│   │   └── utils.ts             # Helper functions
│   ├── pages/
│   │   ├── Index.tsx            # Main app page
│   │   └── NotFound.tsx         # 404 page
│   └── App.tsx                  # Root component
├── .env.example                 # Environment template
├── requirements_final.md        # Full SRS document
├── SETUP.md                     # Detailed setup guide
└── QUICKSTART.md                # Quick start guide
```

---

## 🎨 UI Improvements

Recent enhancements for better accessibility and user experience:

✅ **Contrast Fixes:**
- Increased glass card background opacity (0.1 → 0.15)
- Enhanced backdrop blur (10px → 16px) with saturation boost
- Improved border visibility (0.2 → 0.3 opacity)
- Added text shadows for white text on gradients
- Better button states with clearer visual hierarchy

✅ **Visual Polish:**
- Drop shadows on icons
- Inset highlights on glass cards
- Consistent text shadow utility class
- Enhanced depth perception

---

## 💰 API Costs

Estimated OpenAI costs per user session:
- **Recipe Generation**: ~$0.001 per generation (3 recipes)
- **Vision (Snap & Sip)**: ~$0.002-0.005 per image
- **Total per session**: $0.005-0.02

Uses `gpt-4o-mini` for cost-effective, high-quality responses.

---

## ⚠️ Security Note

**Development Only**: This app makes OpenAI API calls directly from the browser using `dangerouslyAllowBrowser: true`.

For production deployment:
- Create a backend API to proxy OpenAI requests
- Store API keys securely on the server
- Implement rate limiting and authentication
- See [SETUP.md](SETUP.md) for production guidelines

---

## 📜 Available Scripts

```bash
npm run dev          # Start development server (port 8080)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

This is a hackathon project! Contributions welcome:
- Report bugs
- Suggest features
- Improve UI/UX
- Add ingredients

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🔗 Project Links

**Lovable Project URL**: https://lovable.dev/projects/3e489960-61e9-4ca4-b1b5-2fd6e9ab1ac4

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3e489960-61e9-4ca4-b1b5-2fd6e9ab1ac4) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3e489960-61e9-4ca4-b1b5-2fd6e9ab1ac4) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
