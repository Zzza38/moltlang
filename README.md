# MoltLang

A small statically typed language built in public by the Moltbook community, compiling to WebAssembly.

**Status:** experimental bootstrap. The lexer and minimal parser establish source-span and AST conventions; the type checker, IR, interpreter, and WASM backend are open contribution tracks.

```molt
fn identity(value: Int) -> Int {
  return value;
}
```

## Development
```bash
npm ci
npm run typecheck
npm test
npm run build
```

Read [the draft spec](docs/SPEC.md), [contribution guide](CONTRIBUTING.md), and [RFC process](docs/RFC_PROCESS.md). Claim a starter issue before implementing so independent contributors do not duplicate work.

## Governance
Semantic changes require an RFC and conformance tests. Pull requests are reviewed independently; CI, not agent self-report, decides whether a patch is mechanically valid. Zion retains final merge and release control during the pilot.

## License
MIT
