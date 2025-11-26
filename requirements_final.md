# CocktAIl: Software Requirements Specification (SRS)
> **Team:** Ctrl+Alt+Delight  
> **Product:** CocktAIl - The AI-Powered Mixologist  
> **Version:** 1.0 (Hackathon Edition)

---

## 1. Executive Summary & Elevator Pitch

### The Hook
Home bartending is broken. You have a cabinet full of random bottles, a fridge with half a lime, and zero idea what to make. Existing apps are just static databases—clunky, uninspired, and disconnected from the reality of your kitchen.

### The Solution
**CocktAIl** is not just a recipe book; it’s your intelligent, creative, and charming sous-chef for drinks. By leveraging advanced Generative AI, CocktAIl creates bespoke recipes in real-time based on your inventory, your mood, or your party theme. It turns "I have nothing to drink" into "Let's try this new creation."

### Elevator Pitch
For the host who wants to impress without the stress, CocktAIl is an AI-powered assistant that instantly turns available ingredients into premium cocktail recipes. Unlike static recipe apps, CocktAIl uses computer vision and generative AI to craft unique, "delightful" drinking experiences tailored to the exact moment.

---

## 2. Target Audience & Personas

### Persona A: "The Panic Host" (Primary)
*   **Demographics:** 25-35, social, busy professional.
*   **Pain Point:** Throwing a gathering, guests are arriving in 20 minutes, has a random assortment of alcohol and mixers. Stressed about serving boring drinks.
*   **Goal:** Needs a "magic button" to tell them exactly what they can make *right now* that looks and tastes impressive.
*   **Quote:** *"I have vodka, half a bottle of peach schnapps, and some basil. Can I make anything that isn't terrible?"*

### Persona B: "The Mixology Nerd" (Secondary)
*   **Demographics:** 30-45, hobbyist, appreciates craft.
*   **Pain Point:** Bored with standard classics (Old Fashioned, Mojito). Wants to experiment with flavor pairings and avant-garde techniques but needs inspiration.
*   **Goal:** Wants to discover novel combinations and refine their technique.
*   **Quote:** *"I want to create a smoky, spicy cocktail using this mezcal, but I need a unique twist to surprise my friends."*

---

## 3. Core Features (The "Delight" Stack)

### Must-Haves (MVP - The Critical Path)
1.  **The "Virtual Bar" Inventory:** Users can select ingredients they have on hand (Liquor, Mixers, Garnishes).
    *   *Implementation:* Quick-select chips for top 20 common ingredients (Vodka, Gin, Lemon, etc.) for speed.
2.  **AI Recipe Generator:** The core engine. Generates a recipe (Name, Ingredients, Instructions) based *strictly* on the user's inventory.
    *   *Constraint:* Must generate 3 distinct options per request.
3.  **"Make it Now" Filter:** Toggle to show only recipes that can be made with *currently* selected ingredients (no shopping trips).
4.  **Recipe Card UI:** Beautiful, readable display of the generated recipe with glass type and step-by-step instructions.

### Should-Haves (High Value)
1.  **Vibe Selector:** Input a mood (e.g., "Cozy", "Wild", "Sophisticated") or Theme (e.g., "80s Disco", "Beach Party") to influence the AI's generation.
2.  **"Mocktail Mode":** A dedicated toggle to generate non-alcoholic versions of any drink.
3.  **Shareable "Menu":** Generate a QR code or link for a digital party menu that guests can view.

### The "Ctrl+Alt+Delight" Feature (The Wow Factor)
✨ **"Snap & Sip"** ✨
Don't type. Just snap. The user takes a photo of their open liquor cabinet or a cluster of bottles on the counter. CocktAIl uses **Gemini 1.5 Pro Vision** to identify the bottles and ingredients instantly, populating the inventory and suggesting a "Chef's Special" recipe immediately. It feels like magic.

---

## 4. Functional Requirements

### User Stories

| Requirement ID | Requirement Name | Requirement Description |
| :--- | :--- | :--- |
| **FR-01** | **Ingredient Input** | As a user, I want to input my available ingredients (via text or selection) so the system knows what I have. |
| **FR-02** | **Recipe Generation** | As a user, I want to generate a cocktail recipe based strictly on my inventory so I can make a drink immediately. |
| **FR-03** | **Snap & Sip** | As a user, I want to upload a photo of my bottles so the system can automatically identify my ingredients. |
| **FR-04** | **Vibe Selector** | As a user, I want to specify a "Vibe" (mood/theme) so the generated recipe matches the atmosphere. |
| **FR-05** | **Save Recipe** | As a user, I want to save a recipe I liked so I can access it later. |
| **FR-06** | **Mobile View** | As a user, I want to view the recipe clearly on my phone with large text and responsive layout. |

---

## 5. Non-Functional Requirements

### User Experience (UX) & UI
*   **Glassmorphism UI:** The interface should feel premium, using translucent, frosted-glass elements, vivid gradients, and smooth motion. It should look like a high-end bar menu.
*   **Mobile-First:** 90% of usage will be in the kitchen or at a party. Touch targets must be large; layout must be responsive.
*   **"Delight" Animations:** Micro-interactions (e.g., a shaker animation while the AI "thinks", liquid fill effects) to keep the user entertained during latency.
*   **Color Palette:**
    *   Primary: `#FF6B6B` (Coral)
    *   Secondary: `#4ECDC4` (Teal)
    *   Background: `#F7F7F7` (Light Gray)

### Performance & Reliability
*   **Latency:** AI Generation must complete within **< 3 seconds** to maintain flow.
*   **Accuracy:** The AI must not hallucinate dangerous combinations (e.g., bleach) or impossible ingredients. System prompt must include safety guardrails.

---

## 6. Technical Stack & Implementation Plan

We choose a stack that optimizes for **speed of development**, **visual fidelity**, and **AI integration**.

### The Stack
*   **Frontend:** **React** + **Vite** (Fastest build tool, great DX).
*   **Styling:** **Tailwind CSS** (Rapid styling) + **Framer Motion** (For the "Delight" animations).
*   **AI / Backend:** **Google Gemini API** (specifically `gemini-1.5-flash` for speed/cost or `pro` for complex reasoning).
    *   *Why Gemini?* Superior multimodal capabilities for "Snap & Sip" and large context window for understanding complex flavor profiles.
*   **State Management:** **Zustand** (Lightweight, perfect for hackathons).
*   **Deployment:** **Vercel** (Zero-config deployment).

### Feasibility: The 4-Hour Sprint Plan
To ensure we deliver a winning prototype within the hackathon timeframe:

1.  **Hour 1: Foundation.** Setup Vite/React, implement the "Virtual Bar" ingredient selector using pre-defined arrays.
2.  **Hour 2: Intelligence.** Connect to Gemini API. Refine the prompt engineering to ensure JSON output for structured recipe cards.
3.  **Hour 3: Delight.** Apply Glassmorphism styling with Tailwind. Implement the "Snap & Sip" vision integration (or mock it for the demo if time is tight).
4.  **Hour 4: Polish.** Mobile responsiveness testing and demo script rehearsal.

---

## 7. Success Metrics

How do we measure "Delight"?

1.  **The "Empty Fridge" Rate:** % of sessions where a user successfully generates a recipe with < 3 ingredients input. (Measures AI creativity).
2.  **Snap Accuracy:** % of ingredients correctly identified from user photos.
3.  **"Sips per Session":** Average number of recipes generated per user visit.
4.  **Wow Factor (Qualitative):** Judges' reaction to the "Snap & Sip" demo.

---
*Generated by Antigravity for Team Ctrl+Alt+Delight*
