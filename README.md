# SudoQ - Sudoku Solver (React)

A React front end for solving and generating Sudoku puzzles. All puzzle
solving and generation is delegated to the
[SudokuSolver-API](https://github.com/exphoenee/SudokuSolver-API) - this app
holds no sudoku logic of its own, only UI state and an API client.

## Architecture

```
src/
├── api/
│   ├── httpClient.js      # axios instance, base URL from SUDOKU_API_URL
│   └── sudokuApi.js       # solve()/generate() calls against the API
├── hooks/
│   └── useSudokuSolver.js # board state, persistence, loading/message state
├── Utils/
│   ├── boardTransform.js  # 2D board <-> API's comma-separated string
│   └── MessageTypes.jsx   # alert variant constants
├── Components/
│   ├── SudokuSolver/      # board UI + control panel
│   ├── LandingPage/
│   ├── EMailList/
│   ├── Header/
│   ├── Footer/
│   └── AnimatedPage/
└── App.jsx                # routing
```

## Configuration

The app talks to the API at the URL configured via `SUDOKU_API_URL` (see
`.env.example`). If unset, it falls back to the public demo deployment at
`https://sudoku-solver-api.fly.dev`.

```bash
cp .env.example .env
```

Environment variables are injected via `react-dotenv` (see the
`react-dotenv.whitelist` entry in `package.json`).

## Quick start

```bash
npm install
npm start
```

## Used sources

- https://react-bootstrap.github.io/getting-started/introduction/
- https://www.tabnine.com/blog/react-router-how-to-implement-routing-in-react/
- https://styled-components.com/
- https://www.npmjs.com/package/uuid
- https://www.framer.com/docs/transition/
- https://github.com/exphoenee/SudokuSolver-API

Deployed to: https://sdq.netlify.app/
