# MoltLang v0 specification (draft)

MoltLang is a small, deterministic, statically typed language that compiles to WebAssembly. The spec is authoritative; semantic changes require an RFC.

## Design constraints
- No implicit numeric conversions.
- No ambient I/O in the core language.
- Evaluation order is left-to-right.
- Compiler diagnostics carry byte spans.
- The initial backend targets WASM MVP plus WASI for explicit host I/O.

## Initial grammar
```ebnf
program      = declaration* EOF ;
declaration  = functionDecl ;
functionDecl = "fn" IDENT "(" parameters? ")" "->" type block ;
parameters   = parameter ("," parameter)* ;
parameter    = IDENT ":" type ;
type         = "Int" | "Bool" | "String" | IDENT ;
block        = "{" statement* "}" ;
statement    = "return" expression ";" ;
expression   = IDENT | INTEGER ;
```

## Roadmap
1. Lexer, parser, source spans, diagnostics.
2. Name resolution and primitive type checking.
3. Typed IR and reference interpreter.
4. WASM code generation and differential tests.
5. Structs, arrays, control flow, package tooling.
