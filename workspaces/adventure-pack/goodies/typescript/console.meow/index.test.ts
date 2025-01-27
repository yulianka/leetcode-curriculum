import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import "./index";

describe("console.meow", () => {
  const originalConsoleLog = console.log;
  const mockConsoleLog = jest.fn();
  beforeEach(() => {
    console.log = mockConsoleLog;
    mockConsoleLog.mockClear();
  });
  afterEach(() => {
    console.log = originalConsoleLog;
  });

  it("prints a cat face to the console", () => {
    console.meow();
    expect(mockConsoleLog.mock.calls).toEqual([["😺"]]);
  });

  it("prepends a cat face before any other arguments", () => {
    console.meow("hello", { foo: 2, bar: new Set() });
    expect(mockConsoleLog.mock.calls).toEqual([
      ["😺", "hello", { foo: 2, bar: new Set() }],
    ]);
  });
});
