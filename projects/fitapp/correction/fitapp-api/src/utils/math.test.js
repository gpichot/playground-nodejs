import { describe, it, expect } from "vitest";
import { square } from "./math.js";

describe("square", () => {
  it("returns 81 for x = 9", () => {
    const result = square(9);
    expect(result).toEqual(81);
  });

  it("returns 1024 for x = 32", () => {
    const result = square(32);
    expect(result).toEqual(1024);
  });
});
