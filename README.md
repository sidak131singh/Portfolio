# Sidak Singh Chahal — VS Code-Inspired Portfolio

An interactive developer portfolio that looks and behaves like a Visual Studio Code workspace. Visitors explore Sidak's profile through a file explorer, editor tabs, a working terminal, a command palette, a Copilot-style assistant, and a hidden Dino mini-game.

## Reference & originality note

The interaction concept is inspired by an existing VS Code-style portfolio (used with the owner's permission for educational purposes). This project is an **original implementation written from scratch** — no source code, personal text, images, or branding were copied. All content belongs to Sidak Singh Chahal, with its own cyan/violet visual identity.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (CSS-variable theming, 7 color themes: Sidak Dark, Light, Rosé Pine, Tokyo Night, Catppuccin, Nord, Gruvbox)
- Framer Motion (subtle, reduced-motion-aware animations)
- Zustand (IDE state: tabs, panels, theme)
- Lucide React (icons)
- Optional: Google Gemini via `@google/genai` for the assistant

## Features

- **IDE shell** — menu bar with working dropdowns, activity bar, collapsible explorer with colorful file-type icons, editor tabs (open/close/middle-click), status bar with dynamic language indicator and a theme picker
- **Retro pixel cursor** — outlined square with a white pixel center (precise-pointer devices only)
- **Typewriter hero line** — one-liners typed and deleted word by word on home.tsx
- **File explorer** — expandable folders, realistic file icons, keyboard/ARIA support, deep links via URL hash (e.g. `/#projects/product-browser`)
- **Terminal** (Ctrl/Cmd+J) — `help`, `whoami`, `projects`, `open <file>`, `tree`, `theme`, `dino`, and more, with command history
- **Command palette** (Ctrl/Cmd+Shift+P) and quick file open (Ctrl/Cmd+P) with fuzzy filtering
- **Search panel** — local search across files, projects, skills, experience, education, and achievements
- **Source control / extensions / profile / settings** panels
- **ASK SIDAK.AI** — deterministic local knowledge-base chatbot, optionally upgraded to Gemini when an API key is configured (with automatic local fallback)
- **Dino mini-game** — original "SC" pixel runner; score 50 unlocks bonus assistant questions
- **Responsive** — drawer navigation + bottom bar on mobile, full IDE on desktop
- **Accessible** — semantic HTML, focus rings, focus-trapped modals, `aria-*` states, `prefers-reduced-motion` support
- **SEO** — Open Graph/Twitter metadata, JSON-LD Person schema, robots.txt, sitemap.xml, SC favicon

## Folder structure

```
src/
  app/            layout, page, globals.css, robots, sitemap, api/chat
  components/
    ide/          MenuBar, ActivityBar, Explorer, EditorArea, EditorTabs,
                  Terminal, StatusBar, CommandPalette, MobileNavigation, panels
    portfolio/    HomeFile, AboutFile, ExperienceFile, ProjectFile, SkillsFile,
                  EducationFile, AchievementsFile, ContactFile, ResumeFile
    chatbot/      PortfolioAssistant, ChatMessage
    game/         DinoGame
    ui/           Tooltip, Modal, ExternalLink, LoadingScreen
  data/           portfolio.ts (all content), fileSystem.ts, chatbotKnowledge.ts
  hooks/          useKeyboardShortcuts, useLocalStorage
  store/          ideStore.ts (Zustand)
  types/          portfolio.ts
public/           resume.pdf (add yours), project-images/
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # production build
npm start        # serve the production build
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it at vercel.com → New Project (defaults work as-is).
3. Add `GEMINI_API_KEY` (and optionally `GEMINI_MODEL`) under Project → Settings → Environment Variables if you want the AI assistant.
4. After deploying, update the `siteUrl` constant in `src/app/layout.tsx`, `src/app/robots.ts`, and `src/app/sitemap.ts` with your real URL.

## How to update content

Everything lives in **`src/data/portfolio.ts`** — personal info, social links, education (CGPA/coursework), experience, projects, skills, achievements. Components never hard-code personal text.

- **Add a project:** append an object to the `projects` array. To give it its own editor file, also register it in `src/data/fileSystem.ts` and add its id to `projectIds` in `src/components/ide/EditorArea.tsx`.
- **Add the real resume:** place the PDF at `public/resume.pdf`. The resume tab previews it automatically; until then a polished placeholder is shown.
- **Change colors / themes:** edit the CSS variable blocks in `src/app/globals.css` (one block per theme) and the `themeOptions` list in `src/store/ideStore.ts`.
- **Update social links:** edit `socialLinks` in `src/data/portfolio.ts`.

## Optional AI chatbot

The assistant works fully offline using `src/data/chatbotKnowledge.ts`. To enable Gemini:

1. Copy `.env.example` to `.env.local`.
2. Set `GEMINI_API_KEY` (server-side only; never committed or exposed to the client).
3. Optionally set `GEMINI_MODEL` (`gemini-2.5-flash` default, `gemini-2.0-flash` also supported).

If the API call fails for any reason, the local knowledge base answers instead.

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| Ctrl/Cmd + B | Toggle Explorer |
| Ctrl/Cmd + J | Toggle Terminal |
| Ctrl/Cmd + P | Quick file open |
| Ctrl/Cmd + Shift + P | Command palette |
| Escape | Close overlays/menus |
| Arrows / Enter | Navigate and execute |

## Known TODOs

- `public/resume.pdf` — add the real resume file
- Employee Management System — GitHub/live URLs (`githubUrl`/`liveUrl` in `portfolio.ts`)
- Chatbot Flow Builder — live demo URL
- TechCarrot and Outlier AI — exact dates
- LiverGuard — verify the ~99.8% accuracy metric against the final report
- `siteUrl` — replace with the deployed URL in layout/robots/sitemap
