# mpn-lookup

TypeScript library (published to npm as `mpn-lookup`) for Most Probable Number lookups:
`getQtMpn` (QuantiTray), `getQt2KMpn` (QuantiTray/2000) and `getQtLegio` (Legiolert).
Source is `mpn.lookup.ts`; tsup bundles it to `dist/` as CJS + ESM with type declarations.

## Commands

Use pnpm only (pinned in `package.json` `packageManager`). Node 24 (`.nvmrc`).

- `pnpm test` — mocha tests in `test/`
- `pnpm type-check`, `pnpm lint`
- `pnpm build` — tsup to `dist/`

Commits follow conventional commits (`commitlint.config.js`).

## MPN table data is constant

`mpn.data.ts` holds the lookup tables, transcribed from the IDEXX PDFs. They must never
change: do not edit, reorder, reformat or "correct" any value, and do not modify
`test/table-checksum.test.ts`, which fails if any lookup result changes.
If something in the data looks wrong, report it — don't fix it.

Code in `mpn.lookup.ts` (lookup functions, types, validation) may change, as long as every
lookup still returns the same values.

## Public API

`mpn-lookup` is used by other projects. Keep exported names, signatures and return values
backwards compatible unless a change is explicitly requested; breaking changes need a major
version bump.
