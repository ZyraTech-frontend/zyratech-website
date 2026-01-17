# Copilot instructions (ZyraTech website)

## Project context
- Vite + React (React Router v6) SPA; routes live in `src/App.jsx` and the app boots in `src/main.jsx`.
- Styling is TailwindCSS (plus some local CSS in `src/*.css`). Animations commonly use Framer Motion and `src/hooks/useScrollAnimation.js`.
- API calls should go through the Axios wrapper in `src/services/api.js` (uses `VITE_API_BASE_URL` and attaches auth token when present).

## Coding guidelines
- Prefer small, focused diffs; match existing patterns and Tailwind class style.
- For internal navigation, prefer React Router `Link`/`useNavigate` over `<a href>` to avoid full reloads.
- Keep page components presentational; move reusable data/logic into `src/data/*`, `src/services/*`, or `src/hooks/*`.

## Training section conventions
- Treat `src/data/trainingCourses.js` as the single source of truth for the training catalog (IDs, categories, titles, icon keys, etc.).
- UI lists should be driven by mapping (`.map`) over catalog selectors like `getTrainingCoursesByCategory()`.
- Training pages should use the training shell (`src/components/TrainingLayout.jsx`) for consistent navbar/footer.
- When adding new training pages/routes, ensure the main site footer doesn’t duplicate on `/training/*` (see footer logic in `src/App.jsx`).

## State management
- Redux Toolkit store is wired in `src/store/index.js`; only introduce slices when needed (avoid global state for purely local UI).

## Validation
- Use `npm run dev` for local iteration.
- Prefer `npm run build` to confirm the app compiles; note Vite requires Node 20.19+ or 22.12+.
- Linting exists (`npm run lint`), but do not “fix the whole repo” unless explicitly requested—limit to files you touch.
