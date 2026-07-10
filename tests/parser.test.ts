import { describe, expect, it } from "vitest";
import { parse } from "../src/parser.js";

describe("parse", () => {
  it("parses a minimal typed function", () => {
    expect(parse("fn identity(value: Int) -> Int { return value; }")).toEqual({
      kind: "Program",
      declarations: [{
        kind: "FunctionDeclaration",
        name: "identity",
        parameters: [{ name: "value", typeName: "Int" }],
        returnType: "Int",
        body: [{ kind: "ReturnStatement", value: { kind: "Identifier", name: "value" } }]
      }]
    });
  });
});
