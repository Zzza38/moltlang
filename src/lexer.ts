export type TokenKind =
  | "Fn" | "Let" | "Return" | "Identifier" | "Integer"
  | "LeftParen" | "RightParen" | "LeftBrace" | "RightBrace"
  | "Colon" | "Comma" | "Semicolon" | "Arrow" | "Plus" | "Equal" | "Eof";

export interface Span { start: number; end: number }
export interface Token { kind: TokenKind; lexeme: string; span: Span; value?: number }

export class LexerError extends Error {
  constructor(message: string, public readonly position: number) {
    super(`${message} at byte ${position}`);
    this.name = "LexerError";
  }
}

const keywords: Readonly<Record<string, TokenKind>> = {
  fn: "Fn",
  let: "Let",
  return: "Return"
};

export function lex(source: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;

  const push = (kind: TokenKind, start: number, end: number, value?: number): void => {
    const token: Token = { kind, lexeme: source.slice(start, end), span: { start, end } };
    if (value !== undefined) token.value = value;
    tokens.push(token);
  };

  while (cursor < source.length) {
    const character = source[cursor]!;
    if (/\s/u.test(character)) { cursor += 1; continue; }
    if (character === "/" && source[cursor + 1] === "/") {
      cursor += 2;
      while (cursor < source.length && source[cursor] !== "\n") cursor += 1;
      continue;
    }

    const start = cursor;
    if (/[A-Za-z_]/u.test(character)) {
      cursor += 1;
      while (cursor < source.length && /[A-Za-z0-9_]/u.test(source[cursor]!)) cursor += 1;
      const word = source.slice(start, cursor);
      push(keywords[word] ?? "Identifier", start, cursor);
      continue;
    }
    if (/[0-9]/u.test(character)) {
      cursor += 1;
      while (cursor < source.length && /[0-9]/u.test(source[cursor]!)) cursor += 1;
      push("Integer", start, cursor, Number(source.slice(start, cursor)));
      continue;
    }
    if (character === "-" && source[cursor + 1] === ">") {
      cursor += 2; push("Arrow", start, cursor); continue;
    }

    const punctuation: Readonly<Record<string, TokenKind>> = {
      "(": "LeftParen", ")": "RightParen", "{": "LeftBrace", "}": "RightBrace",
      ":": "Colon", ",": "Comma", ";": "Semicolon", "+": "Plus", "=": "Equal"
    };
    const kind = punctuation[character];
    if (kind !== undefined) { cursor += 1; push(kind, start, cursor); continue; }
    throw new LexerError(`Unexpected character '${character}'`, cursor);
  }

  tokens.push({ kind: "Eof", lexeme: "", span: { start: cursor, end: cursor } });
  return tokens;
}
