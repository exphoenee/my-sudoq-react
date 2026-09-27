# XudoQ - Sudoku Solver (React)

**Repository:** [github.com/exphoenee/my-sudoq-react](https://github.com/exphoenee/my-sudoq-react)
**Live demo:** [xudoq.netlify.app](https://xudoq.netlify.app/)

A React + TypeScript front end for solving and generating Sudoku puzzles,
built with Vite. All puzzle solving and generation is delegated to the
[SudokuSolver-API](https://github.com/exphoenee/SudokuSolver-API) - this app
holds no sudoku logic of its own, only UI state and an API client.

## Architecture

```
src/
├── api/
│   ├── httpClient.ts      # axios instance, base URL from VITE_SUDOKU_API_URL
│   └── sudokuApi.ts       # solve()/generate() calls against the API
├── hooks/
│   └── useSudokuSolver.ts # board state, persistence, loading/message state
├── Utils/
│   ├── boardTransform.ts  # 2D board <-> API's comma-separated string
│   └── MessageTypes.ts    # alert variant constants
├── Components/
│   ├── SudokuSolver/      # board UI + control panel
│   ├── FadeIn/            # page-enter fade/slide animation wrapper
│   └── ErrorBoundary/     # catches render errors, shows a fallback message
├── App.tsx                # renders SudokuSolver
└── vite-env.d.ts          # Vite's client types + import.meta.env typing
```

## Configuration

The app talks to the API at the URL configured via `VITE_SUDOKU_API_URL`
(see `.env.example`, Vite only exposes client-side env vars prefixed with
`VITE_`). If unset, it falls back to the public demo deployment at
`https://sudoku-solver-api.fly.dev`.

```bash
cp .env.example .env
```

## Quick start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build    # type-checks (tsc --noEmit) then builds with Vite into dist/
npm run preview  # serves the production build locally
```

## Tests

```bash
npm test
```

Runs the suite once with [Vitest](https://vitest.dev/). Covers the board
<-> API string transforms, the API client's error-message handling (network
failure vs. API-reported error vs. fallback), the `useSudokuSolver` state
hook (including localStorage persistence), and a component smoke test for
the board (typing keeps focus, Reset clears cells).

## Tech Stack

- React 18 + TypeScript
- [Vite](https://vitejs.dev/) (dev server + build)
- [Vitest](https://vitest.dev/) + Testing Library (tests)
- react-bootstrap, framer-motion, axios

## Used sources

- https://react-bootstrap.github.io/getting-started/introduction/
- https://www.npmjs.com/package/uuid
- https://www.framer.com/docs/transition/
- https://github.com/exphoenee/SudokuSolver-API
