/* Thin wrapper around the SudokuSolver-API endpoints.
   All puzzle solving/generation logic lives in the API - this module only
   talks to it, it never solves or generates anything itself. */
import { sudokuApiClient } from "./httpClient";

function unwrap(response) {
  const { success, data, error } = response.data;
  if (!success) {
    throw new Error(error?.message || "The Sudoku API returned an error.");
  }
  return data;
}

function apiErrorMessage(err, fallback) {
  return err?.response?.data?.error?.message || err?.message || fallback;
}

/* puzzle: comma separated string of 81 values, 0 = empty
   returns: comma separated solution string */
export async function solveSudoku(puzzle) {
  try {
    const response = await sudokuApiClient.post("/solve", { puzzle });
    return unwrap(response).solution;
  } catch (err) {
    throw new Error(apiErrorMessage(err, "Could not solve the puzzle."));
  }
}

/* level: "easy" | "medium" | "hard" | "evil"
   returns: { puzzle, solution, level, generationTime, trialStep } */
export async function generateSudoku(level) {
  try {
    const response = await sudokuApiClient.get(`/generate/${level}`);
    return unwrap(response);
  } catch (err) {
    throw new Error(apiErrorMessage(err, "Could not generate a puzzle."));
  }
}
