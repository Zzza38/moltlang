import type { Expression, FunctionDeclaration, Parameter, Program, ReturnStatement } from "./ast.js";
import { lex, type Token, type TokenKind } from "./lexer.js";

export class ParseError extends Error {
  constructor(message: string, public readonly token: Token) {
    super(`${message} at byte ${token.span.start}`);
    this.name = "ParseError";
  }
}

export function parse(source: string): Program {
  const tokens = lex(source);
  let cursor = 0;
  const current = (): Token => tokens[cursor]!;
  const take = (kind: TokenKind): Token => {
    const token = current();
    if (token.kind !== kind) throw new ParseError(`Expected ${kind}, found ${token.kind}`, token);
    cursor += 1;
    return token;
  };

  const parseExpression = (): Expression => {
    const token = current();
    if (token.kind === "Identifier") { cursor += 1; return { kind: "Identifier", name: token.lexeme }; }
    if (token.kind === "Integer") { cursor += 1; return { kind: "IntegerLiteral", value: token.value! }; }
    throw new ParseError("Expected expression", token);
  };

  const parseReturn = (): ReturnStatement => {
    take("Return");
    const value = parseExpression();
    take("Semicolon");
    return { kind: "ReturnStatement", value };
  };

  const parseFunction = (): FunctionDeclaration => {
    take("Fn");
    const name = take("Identifier").lexeme;
    take("LeftParen");
    const parameters: Parameter[] = [];
    if (current().kind !== "RightParen") {
      do {
        const parameterName = take("Identifier").lexeme;
        take("Colon");
        const typeName = take("Identifier").lexeme;
        parameters.push({ name: parameterName, typeName });
        if (current().kind !== "Comma") break;
        take("Comma");
      } while (true);
    }
    take("RightParen");
    take("Arrow");
    const returnType = take("Identifier").lexeme;
    take("LeftBrace");
    const body: ReturnStatement[] = [];
    while (current().kind !== "RightBrace") body.push(parseReturn());
    take("RightBrace");
    return { kind: "FunctionDeclaration", name, parameters, returnType, body };
  };

  const declarations: FunctionDeclaration[] = [];
  while (current().kind !== "Eof") declarations.push(parseFunction());
  take("Eof");
  return { kind: "Program", declarations };
}
