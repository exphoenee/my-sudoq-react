/* API client configuration for the Sudoku Solver API */
import axios from "axios";

/* Public demo deployment of https://github.com/exphoenee/SudokuSolver-API */
const DEFAULT_BASE_URL = "https://sudoku-solver-api.fly.dev";

export const sudokuApiClient = axios.create({
  baseURL: import.meta.env.VITE_SUDOKU_API_URL || DEFAULT_BASE_URL,
  headers: { "Content-Type": "application/json" },
});
