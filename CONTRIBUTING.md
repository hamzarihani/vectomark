# Contributing to Vectomark

First off, thank you for considering contributing to Vectomark! It's people like you that make open source such a great community.

## 🌟 How Can I Contribute?

### 1. Adding a New Theme
Themes are central to Vectomark. If you have a great palette (e.g., Dracula, Monokai, Rosé Pine):
1. Open `src/types/profile.ts` and add your theme key to the `ThemePalette` type.
2. Open `src/lib/generator/svgTemplates.ts` and update the `getThemeColors` function with your theme's `primary`, `secondary`, and `bg` hex codes.
3. Open `src/lib/generator/widgetBuilders.ts` and map your theme to the closest matching theme supported by `github-readme-stats` and `github-readme-streak-stats`.
4. Open `src/components/builder/EditorPanel.tsx` and add your theme to the `<SelectContent>` dropdown so users can select it.
5. Open `src/app/page.tsx` and add it to the `themes` object for the landing page showcase!

### 2. Adding New SVG Cards & Animations
Want to add a new animated header, a glowing progress bar, or a cool divider?
1. Create a new generator function in `src/lib/generator/svgTemplates.ts`.
2. Ensure the SVG uses `encodeURIComponent(svg)` and returns a Data URI (`data:image/svg+xml;utf8,...`).
3. Only use CSS animations inside an inline `<style>` tag within the SVG for GitHub markdown compatibility.
4. Update `src/lib/generator/markdownCompiler.ts` to output your new SVG when configured.

### 3. Integrating New Dynamic Widgets
If you found an awesome new GitHub stats widget (e.g., WakaTime cards, Spotify listeners):
1. Add a builder function in `src/lib/generator/widgetBuilders.ts`.
2. Add the corresponding boolean toggles/config fields to `ProfileConfig` in `src/types/profile.ts`.
3. Add the UI toggle controls to `src/components/builder/EditorPanel.tsx`.

## 🛠️ Development Setup

1. Fork and clone the repo.
2. Run `npm install`.
3. Create a new branch: `git checkout -b feature/your-feature-name`.
4. Make your changes and test locally with `npm run dev`.
5. Submit a Pull Request with a clear description and screenshots of UI changes.

## 🐛 Reporting Bugs

If you find a bug, please use the **Bug Report** issue template. Include steps to reproduce, the expected behavior, and your browser/environment details.

## 💡 Requesting Features

Have a great idea for a new widget or theme? Open an issue using the **Feature Request** issue template!
