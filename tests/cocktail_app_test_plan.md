# CocktAIl — Test Plan

## Executive Summary

This document is a comprehensive test plan for the CocktAIl frontend application (the Hackathon MVP described in `requirements_final.md`). It targets the web UI built with React + Vite and focuses on functional, edge-case, UI, accessibility, performance, and mobile responsiveness tests. All scenarios assume a fresh browser state unless otherwise stated.

Test artifacts created:
- `tests/cocktail_app_test_plan.md` — this file (human-readable plan for manual and automated QA).

Assumptions
1. Test environment uses a desktop and mobile browser (Chrome/Chromium and WebKit based browsers). Mobile tests assume responsive layout and touch input.
2. The app runs locally via the standard dev server (Vite) or a deployed preview. If any API (AI) is not reachable, a mock or stub is available for deterministic behavior.
3. Start state for each scenario: fresh profile (no saved recipes), no ingredients selected, network available unless scenario specifies offline behavior.

How to use this plan
- Each scenario is independent and numbered.
- Follow steps precisely and record actual vs expected outcomes.
- For automated coverage, map scenarios to end-to-end tests (Cypress/Playwright) and unit tests (Vitest/Jest) as appropriate.

Priority legend
- P0: Critical (MVP must-have)
- P1: Important
- P2: Nice-to-have

## Page / App Areas to Test (Exploration checklist)
1. Virtual Bar / Ingredient selector UI (chips, search, quick-select) — presence and behavior
2. AI Recipe Generator flow (input -> generate -> 3 distinct recipes) — deterministic output when mocked
3. Make-it-Now toggle / filter — UI and result filtering
4. Vibe Selector (mood/theme input) — effect on generated recipes
5. Mocktail Mode toggle — non-alcoholic conversions
6. Recipe Card UI (name, ingredients, instructions, glass type, share/save) — visual and data correctness
7. Snap & Sip image upload (or mock) — image input, recognition, inventory population
8. Save / Load recipes — persistence
9. Mobile layout and touch interactions
10. Animations and micro-interactions (loading shimmer, shaker animation)
11. Error handling (AI errors, network failures, invalid images)
12. Accessibility (keyboard navigation, screen reader labels, color contrast)

---

## Test Scenarios

Each scenario includes: Title, Priority, Starting State (assume fresh), Steps, Expected Result, Success Criteria, Failure Conditions.

### 1. Adding Ingredients via Virtual Bar (Quick Add)
Priority: P0
Starting State: Fresh app load, no selected ingredients.

Steps:
1. Open the app.
2. Locate the `Virtual Bar` ingredient area.
3. Click a quick-select chip labeled "Vodka".
4. Click a quick-select chip labeled "Lime".
5. Use the search field to type "mint" and select a suggested "Mint" item.
6. Remove the "Lime" selection by clicking its chip's remove/X control.

Expected Results:
- Chips toggle visually when selected and show in the current-inventory list.
- After removal, the ingredient disappears from the selected list.
- Input search returns matching suggestions.

Success Criteria: Inventory accurately reflects selected/unselected ingredients.
Failure Conditions: Selection does not persist on the page, or UI shows duplicated chips.

---

### 2. Generate 3 Distinct Recipes (AI Generator Happy Path)
Priority: P0
Starting State: Ingredients selected: Vodka, Lime, Mint.

Steps:
1. Ensure `Make it Now` is ON (or leave default behavior if the generator respects inventory).
2. Click `Generate Recipes` (or equivalent CTA).
3. Wait for generation to complete.

Expected Results:
- Three distinct recipe cards appear, each with a unique name, ingredient list, and instructions.
- Each recipe uses only the selected ingredients + commonly available pantry items (if allowed) OR explicitly indicates if an extra ingredient is needed.
- UI shows a loading animation while generating.

Success Criteria: 3 recipe cards appear within reasonable latency (see performance scenario) and are actionable.
Failure Conditions: Fewer than 3 recipes, duplicates, hallucinated or unsafe ingredients.

---

### 3. Make-it-Now Filter Behavior
Priority: P0
Starting State: Inventory: Vodka, Lime; Vibe: none.

Steps:
1. Toggle `Make it Now` ON.
2. Generate recipes.

Expected Results:
- All returned recipes are makeable with current inventory; no recipe requires unavailable ingredients.
- Any recipe that would have required extra ingredients is either absent or clearly flagged with an "extra ingredient" callout.

Success Criteria: No recipe expects unavailable items when toggle is ON.
Failure Conditions: Returned recipe includes unavailable items without notice.

---

### 4. Vibe Selector Influence
Priority: P1
Starting State: Inventory: Vodka, Lime, Mint.

Steps:
1. Select Vibe = "Cozy".
2. Generate recipes.
3. Record the stylistic/ingredient differences compared to Vibe = "Wild".

Expected Results:
- Generated recipes reflect the chosen vibe through naming, garnish, or technique suggestions (e.g., "smoky" notes or warmed spices for "Cozy").
- The results are still feasible with inventory.

Success Criteria: Vibe causes observable and reasonable variation in outputs.
Failure Conditions: Vibe selection has no perceivable effect.

---

### 5. Mocktail Mode
Priority: P1
Starting State: Inventory: Vodka, Lime, Mint.

Steps:
1. Toggle `Mocktail Mode` ON.
2. Select ingredients typically alcoholic (e.g., Gin) in inventory.
3. Generate recipes.

Expected Results:
- Generated recipes contain non-alcoholic substitutions and are labeled as mocktails.
- Instructions avoid alcoholic-specific techniques (or include non-alcoholic variants).

Success Criteria: All recipes are non-alcoholic and clearly labeled.
Failure Conditions: Alcoholic ingredients or measures present when mocktail mode is on.

---

### 6. Recipe Card — Readability & Actions
Priority: P0
Starting State: After generation of recipes.

Steps:
1. Inspect a recipe card.
2. Verify it lists: Name, Ingredient quantities, Glass type, Step-by-step instructions, Estimated time.
3. Click `Save` on a recipe.
4. Click `Share` (if available) and verify QR/link generation UI (mocked if necessary).

Expected Results:
- Card content matches expected structure and is legible on mobile and desktop.
- Save stores the recipe in local storage or user account (depending on implementation) and is retrievable.
- Share produces a QR or link preview ready to copy.

Success Criteria: Recipe card is complete; save/share function works.
Failure Conditions: Missing fields, broken save, or share UI.

---

### 7. Snap & Sip — Image Upload (Vision Integration)
Priority: P0 (demo-critical)
Starting State: Fresh app.

Steps:
1. Open `Snap & Sip` workflow.
2. Upload or drag an image containing bottle labels (use test images with known bottle labels).
3. Observe the recognized ingredient list and the auto-populated inventory.
4. Click `Chef's Special` recipe suggestion (if provided).

Expected Results:
- App extracts and lists recognized bottle names and maps them to inventory items.
- The `Chef's Special` uses identified ingredients.
- Recognizer gracefully handles unknown/partial labels and surfaces confidence or asks for user confirmation.

Success Criteria: At least 80% of common bottles in test images are correctly identified (for prototype, adjust to available model/mocks).
Failure Conditions: Misidentification that leads to unsafe/hazardous suggestions or no output with no helpful error message.

---

### 8. Save/Load Recipes Persistence
Priority: P1
Starting State: One recipe saved in session.

Steps:
1. Save a generated recipe.
2. Refresh the browser.
3. Open `Saved Recipes` view.

Expected Results:
- Saved recipe appears after refresh (if persist implemented) or session persists during navigation.
- Saved recipe details open correctly.

Success Criteria: Saved recipes are retrievable.
Failure Conditions: Saves are lost on refresh or navigation without warning.

---

### 9. Offline / API Failure Handling
Priority: P0
Starting State: App running, but AI API is unreachable (simulate by blocking network or mocking error response).

Steps:
1. Simulate network/API failure for the recipe generation endpoint.
2. Click `Generate`.

Expected Results:
- App shows a clear, user-friendly error message and offers retry or a reduced offline fallback (example: cached recipes or static suggestions).
- No sensitive crash or frozen UI.

Success Criteria: App recovers gracefully and provides guidance.
Failure Conditions: App crashes, shows raw error messages or stack traces.

---

### 10. Accessibility (A11y) Basic Checks
Priority: P1
Starting State: Fresh app.

Steps:
1. Attempt to navigate all primary UI controls via keyboard (Tab/Shift+Tab, Enter/Space, arrow keys for lists).
2. Use a screen-reader (NVDA/VoiceOver) to read recipe cards and buttons.
3. Run automated contrast checks (tools) against color palette.

Expected Results:
- Focus order is logical and visible.
- All interactive elements have accessible names/labels.
- Contrast ratio meets WCAG AA where feasible.

Success Criteria: Keyboard-only navigation completes primary flows; screen reader reads critical information.
Failure Conditions: Missing labels, unreachable controls via keyboard, low contrast.

---

### 11. Mobile Responsiveness and Touch Targets
Priority: P0
Starting State: Fresh app on a mobile viewport.

Steps:
1. Open the app on a mobile device or emulator with common screen widths.
2. Verify touch targets are at least 44px and UI remains readable.
3. Run Generate and interact with recipe cards.

Expected Results:
- Layout adapts, fonts are legible, and buttons large enough to tap.
- No horizontal scrolling required.

Success Criteria: Full primary flows complete on mobile.
Failure Conditions: Overlapping elements, truncated text, or un-tappable controls.

---

### 12. Animations & Delightful Micro-interactions
Priority: P2
Starting State: Any.

Steps:
1. Trigger the AI generation and observe the loading animation (shaker or liquid fill).
2. Note animation smoothness and that animations can be skipped or disabled.

Expected Results:
- Animations improve perceived latency and do not block accessibility.

Success Criteria: Animations are smooth and not janky on targeted devices.
Failure Conditions: Janky animations cause UI unresponsiveness.

---

### 13. Security & Safety Guards
Priority: P0
Starting State: Any.

Steps:
1. Try to input malicious or unsafe ingredient names (e.g., "bleach") via search or image recognition.
2. Attempt to trick the generator with unusual prompts.

Expected Results:
- System rejects or safely handles unsafe items and prints a safe, helpful message.
- Prompt engineering prevents hallucinations that suggest dangerous chemicals or instructions.

Success Criteria: No unsafe suggestions; clear messaging.
Failure Conditions: Unsafe or hazardous instructions appear.

---

## Test Data & Images
- Provide a set of test images containing common bottle labels for Snap & Sip (e.g., vodka, gin, rum, triple sec, tonic). Keep a mix of well-lit and partially obscured images.
- Provide sample inventories: minimal (2 items), typical (5 items), and large (20 items).

## Recommended Automation Mapping
- E2E: Playwright or Cypress to cover scenarios 1-9, 11.
- Unit: Vitest for component-level tests (ingredient selector, recipe card rendering).
- Visual regression: Percy or Playwright snapshots for recipe card and virtual bar states.

## Reporting Template
For each test run, capture:
1. Scenario ID and steps executed
2. Environment (browser/version, OS)
3. Time to generate (latency)
4. Actual vs expected
5. Pass/Fail and notes
6. Screenshots for failures

## Next Steps
1. Turn high-priority scenarios (P0) into Playwright automated scripts.
2. Add mocked AI responses for determinism in CI.
3. Prepare a small dataset of labeled bottle images for Snap & Sip validation.

---

## Appendix: Quick Smoke Test Checklist (Run before demos)
1. Start app with `npm run dev` (or repo script).
2. Open app at `http://localhost:5173` (or configured port).
3. Quick add ingredients and generate — verify 3 recipes.
4. Test Snap & Sip with one test image.
5. Save a recipe and refresh.


*Generated by QA planner*