import { solveSudoku, generateSudoku } from "./sudokuApi";
import { sudokuApiClient } from "./httpClient";

jest.mock("./httpClient", () => ({
  sudokuApiClient: { post: jest.fn(), get: jest.fn() },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("solveSudoku", () => {
  it("returns the solution on success", async () => {
    sudokuApiClient.post.mockResolvedValue({
      data: { success: true, data: { solution: "1,2,3" }, error: null },
    });
    await expect(solveSudoku("puzzle")).resolves.toBe("1,2,3");
    expect(sudokuApiClient.post).toHaveBeenCalledWith("/solve", {
      puzzle: "puzzle",
    });
  });

  it("throws the API's error message when the API reports failure", async () => {
    sudokuApiClient.post.mockResolvedValue({
      data: { success: false, data: null, error: { message: "Bad puzzle" } },
    });
    await expect(solveSudoku("puzzle")).rejects.toThrow("Bad puzzle");
  });

  it("throws a friendly message when the server never responded", async () => {
    sudokuApiClient.post.mockRejectedValue({
      isAxiosError: true,
      message: "Network Error",
    });
    await expect(solveSudoku("puzzle")).rejects.toThrow(
      "Could not reach the Sudoku Solver API"
    );
  });

  it("surfaces the API's structured error message from a failed response", async () => {
    sudokuApiClient.post.mockRejectedValue({
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
    sudokuApiClient.get.mockResolvedValue({
      data: { success: true, data, error: null },
    });
    await expect(generateSudoku("easy")).resolves.toEqual(data);
    expect(sudokuApiClient.get).toHaveBeenCalledWith("/generate/easy");
  });

  it("throws a fallback message when nothing else is available", async () => {
    sudokuApiClient.get.mockRejectedValue({ response: { data: {} } });
    await expect(generateSudoku("evil")).rejects.toThrow(
      "Could not generate a puzzle."
    );
  });
});
