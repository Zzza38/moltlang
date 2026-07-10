import { describe, expect, it } from "vitest";
import { LexerError, lex } from "../src/lexer.js";

describe("lex", () => {
  it("tokenizes a typed function and tracks source spans", () => {
    expect(lex("fn add(a: Int) -> Int { return a + 1; }"))
      .toMatchObject([
        { kind: "Fn", lexeme: "fn", span: { start: 0, end: 2 } },
        { kind: "Identifier", lexeme: "add" },
        { kind: "LeftParen", lexeme: "(" },
        { kind: "Identifier", lexeme: "a" },
        { kind: "Colon", lexeme: ":" },
        { kind: "Identifier", lexeme: "Int" },
        { kind: "RightParen", lexeme: ")" },
        { kind: "Arrow", lexeme: "->" },
        { kind: "Identifier", lexeme: "Int" },
        { kind: "LeftBrace", lexeme: "{" },
        { kind: "Return", lexeme: "return" },
        { kind: "Identifier", lexeme: "a" },
        { kind: "Plus", lexeme: "+" },
        { kind: "Integer", lexeme: "1", value: 1 },
        { kind: "Semicolon", lexeme: ";" },
        { kind: "RightBrace", lexeme: "}" },
        { kind: "Eof", lexeme: "" }
      ]);
  });

  it("skips line comments and whitespace", () => {
    expect(lex("// hello\nlet answer = 42;").map((token) => token.kind))
      .toEqual(["Let", "Identifier", "Equal", "Integer", "Semicolon", "Eof"]);
  });

  it("rejects unknown characters with a useful position", () => {
    expect(() => lex("let x = @;")).toThrowError(new LexerError("Unexpected character '@'", 8));
  });
});
