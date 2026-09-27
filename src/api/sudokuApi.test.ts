import { afterEach, describe, expect, it, vi, type Mock } from "vitest";
import { solveSudoku, generateSudoku } from "./sudokuApi";
import { sudokuApiClient } from "./httpClient";

vi.mock("./httpClient", () => ({
  sudokuApiClient: { post: vi.fn(), get: vi.fn() },
}));

/* The real sudokuApiClient.post/get are fully typed to return AxiosResponse,
   which the lightweight mock fixtures below don't (and shouldn't need to)
   fully satisfy - cast once here rather than per fixture. */
const mockPost = sudokuApiClient.post as unknown as Mock;
const mockGet = sudokuApiClient.get as unknown as Mock;

afterEach(() => {
  vi.clearAllMocks();
});

describe("solveSudoku", () => {
  it("returns the solution on success", async () => {
    mockPost.mockResolvedValue({
      data: { success: true, data: { solution: "1,2,3" }, error: null },
    });
    await expect(solveSudoku("puzzle")).resolves.toBe("1,2,3");
    expect(mockPost).toHaveBeenCalledWith("/solve", { puzzle: "puzzle" });
  });

  it("throws the API's error message when the API reports failure", async () => {
    mockPost.mockResolvedValue({
      data: { success: false, data: null, error: { message: "Bad puzzle" } },
    });
    await expect(solveSudoku("puzzle")).rejects.toThrow("Bad puzzle");
  });

  it("throws a friendly message when the server never responded", async () => {
    mockPost.mockRejectedValue({
      isAxiosError: true,
      message: "Network Error",
    });
    await expect(solveSudoku("puzzle")).rejects.toThrow(
      "Could not reach the Sudoku Solver API"
    );
  });

  it("surfaces the API's structured error message from a failed response", async () => {
    mockPost.mockRejectedValue({
      response: { data: { error: { message: "Invalid puzzle format" } } },
    });
    await expect(solveSudoku("puzzle")).rejects.toThrow(
      "Invalid puzzle format"
    );
  });
});

describe("generateSudoku", () => {
  it("returns the generated puzzle data on success", async () => {
    const data = { puzzle: "1,0,0", solution: "1,2,3", level: "easy" };
    mockGet.mockResolvedValue({
      data: { success: true, data, error: null },
    });
    await expect(generateSudoku("easy")).resolves.toEqual(data);
    expect(mockGet).toHaveBeenCalledWith("/generate/easy");
  });

  it("throws a fallback message when nothing else is available", async () => {
    mockGet.mockRejectedValue({ response: { data: {} } });
    await expect(generateSudoku("evil")).rejects.toThrow(
      "Could not generate a puzzle."
    );
  });
});
