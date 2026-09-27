/* Thin wrapper around the SudokuSolver-API endpoints.
   All puzzle solving/generation logic lives in the API - this module only
   talks to it, it never solves or generates anything itself. */
import type { AxiosError, AxiosResponse } from "axios";
import { sudokuApiClient } from "./httpClient";

export interface GenerateResult {
  puzzle: string;
  solution: string;
  level: string;
  generationTime: number;
  trialStep: number;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T | null;
  error: { message: string; code?: string } | null;
}

function unwrap<T>(response: AxiosResponse<ApiEnvelope<T>>): T {
  const { success, data, error } = response.data;
  if (!success || data === null) {
    throw new Error(error?.message || "The Sudoku API returned an error.");
  }
  return data;
}

function apiErrorMessage(err: unknown, fallback: string): string {
  const axiosErr = err as AxiosError<{ error?: { message?: string } }>;
  const apiMessage = axiosErr?.response?.data?.error?.message;
  if (apiMessage) return apiMessage;
  /* A real axios request that never got a response (network failure,
     timeout, CORS block) - as opposed to a locally thrown Error, e.g.
     unwrap()'s success:false case, which already carries a good message. */
  if (axiosErr?.isAxiosError && !axiosErr.response) {
    return "Could not reach the Sudoku Solver API. Check your connection and try again.";
  }
  return (err as Error)?.message || fallback;
}

/* puzzle: comma separated string of 81 values, 0 = empty
   returns: comma separated solution string */
export async function solveSudoku(puzzle: string): Promise<string> {
  try {
    const response = await sudokuApiClient.post<
      ApiEnvelope<{ solution: string }>
    >("/solve", { puzzle });
    return unwrap(response).solution;
  } catch (err) {
    throw new Error(apiErrorMessage(err, "Could not solve the puzzle."));
  }
}

/* level: "easy" | "medium" | "hard" | "evil" */
export async function generateSudoku(level: string): Promise<GenerateResult> {
  try {
    const response = await sudokuApiClient.get<ApiEnvelope<GenerateResult>>(
      `/generate/${level}`
    );
    return unwrap(response);
  } catch (err) {
    throw new Error(apiErrorMessage(err, "Could not generate a puzzle."));
  }
}
