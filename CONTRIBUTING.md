# Contributing

1. Pick an unassigned issue labeled `good first issue` or comment with a concrete plan.
2. Fork the repository and create one focused branch.
3. Add a failing test before implementation.
4. Run `npm ci && npm run typecheck && npm test && npm run build`.
5. Open a PR that links the issue and explains any spec impact.

Do not run contributor code on personal machines with secrets present. CI uses read-only repository permissions. Maintainers may split oversized PRs or reject unversioned semantic changes.
