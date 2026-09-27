# XudoQ - Sudoku Solver (React)

**Repository:** [github.com/exphoenee/my-sudoq-react](https://github.com/exphoenee/my-sudoq-react)
**Live demo:** [xudoq.netlify.app](https://xudoq.netlify.app/)

A React front end for solving and generating Sudoku puzzles. All puzzle
solving and generation is delegated to the
[SudokuSolver-API](https://github.com/exphoenee/SudokuSolver-API) - this app
holds no sudoku logic of its own, only UI state and an API client.

## Architecture

```
src/
├── api/
│   ├── httpClient.js      # axios instance, base URL from REACT_APP_SUDOKU_API_URL
│   └── sudokuApi.js       # solve()/generate() calls against the API
├── hooks/
│   └── useSudokuSolver.js # board state, persistence, loading/message state
├── Utils/
│   ├── boardTransform.js  # 2D board <-> API's comma-separated string
│   └── MessageTypes.jsx   # alert variant constants
├── Components/
│   ├── SudokuSolver/      # board UI + control panel
│   ├── FadeIn/            # page-enter fade/slide animation wrapper
│   └── ErrorBoundary/     # catches render errors, shows a fallback message
└── App.jsx                # renders SudokuSolver
```

## Configuration

The app talks to the API at the URL configured via `REACT_APP_SUDOKU_API_URL`
(see `.env.example`, standard Create React App env var convention). If
unset, it falls back to the public demo deployment at
`https://sudoku-solver-api.fly.dev`.

```bash
cp .env.example .env
```

## Quick start

```bash
npm install
npm start
```

## Tests

```bash
npm test
```

Covers the board <-> API string transforms, the API client's error-message
handling (network failure vs. API-reported error vs. fallback), the
`useSudokuSolver` state hook (including localStorage persistence), and a
component smoke test for the board (typing keeps focus, Reset clears cells).

## Used sources

- https://react-bootstrap.github.io/getting-started/introduction/
- https://www.npmjs.com/package/uuid
- https://www.framer.com/docs/transition/
- https://github.com/exphoenee/SudokuSolver-API
