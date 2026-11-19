# mpn-lookup

[![npm version](https://img.shields.io/npm/v/mpn-lookup.svg)](https://www.npmjs.com/package/mpn-lookup)
[![CI](https://github.com/jonathan-gartland/mpn-lookup/actions/workflows/ci.yml/badge.svg)](https://github.com/jonathan-gartland/mpn-lookup/actions/workflows/ci.yml)
[![types](https://img.shields.io/npm/types/mpn-lookup.svg)](https://www.npmjs.com/package/mpn-lookup)
[![license](https://img.shields.io/npm/l/mpn-lookup.svg)](./LICENSE)

Most Probable Number (MPN) lookups for IDEXX Quanti-Tray®, Quanti-Tray®/2000 and Legiolert®
water tests, as a small, typed, zero-dependency TypeScript library.

## Why

Labs that test drinking and recreational water for coliforms, _E. coli_, enterococci and
_Legionella pneumophila_ often use IDEXX's tray-based methods. After incubation, the analyst
counts the positive wells and looks up the result in a printed MPN table: one table for
Quanti-Tray, a 49 × 48 grid for Quanti-Tray/2000, and another grid for Legiolert.

`mpn-lookup` puts those tables in code. You pass in the well counts and get back the MPN and
its 95% confidence interval. Each table was transcribed from the IDEXX reference tables, and a
checksum test fails the build if any value changes.

- **Typed**: ships its own `.d.ts`, so editors show argument ranges and return types
- **CJS + ESM** builds, no runtime dependencies
- **Validated input**: out-of-range or non-integer counts return `undefined` and never an
  unrelated table entry
- **Read-only tables**: they're frozen at runtime, so callers can't mutate them by accident

## Installation

```bash
npm install mpn-lookup
# or
pnpm add mpn-lookup
# or
yarn add mpn-lookup
```

## Usage

```typescript
import { getQtMpn, getQt2KMpn, getQtLegio } from 'mpn-lookup';

// Quanti-Tray (51 wells): number of positive wells
getQtMpn(10); // [11.1, 6.1, 20.5]   -> MPN 11.1/100 mL (95% CI 6.1–20.5)
getQtMpn(0); //  ['<1.0', 0, 3.7]
getQtMpn(51); // ['>200.5', 146.1, 'infinite']

// Quanti-Tray/2000 (49 large + 48 small wells): positive large, positive small
getQt2KMpn(10, 25); // [39.7, 29.1, 52.8]
getQt2KMpn(49, 48); // ['>2419.6', 1439.5, 'infinite']

// Legiolert (6 large + 90 small wells): positive large, positive small
getQtLegio(3, 45); // 82.8
getQtLegio(0, 0); //  '<1'

// Out-of-range or non-integer input
getQtMpn(52); // undefined
```

Values at the ends of a table are strings such as `'<1.0'`, `'>2419.6'` or `'infinite'`,
matching the IDEXX tables. Check the type before doing arithmetic on them.

## API

### `getQtMpn(positiveWells: number): MpnResult | undefined`

Quanti-Tray (51-well) lookup.

| Parameter       | Range  |
| --------------- | ------ |
| `positiveWells` | 0 – 51 |

### `getQt2KMpn(largePositive: number, smallPositive: number): MpnResult | undefined`

Quanti-Tray/2000 lookup.

| Parameter       | Range  |
| --------------- | ------ |
| `largePositive` | 0 – 49 |
| `smallPositive` | 0 – 48 |

### `getQtLegio(largePositive: number, smallPositive: number): string | number | undefined`

Legiolert lookup. Returns the MPN value only, since the Legiolert table has no confidence
interval.

| Parameter       | Range  |
| --------------- | ------ |
| `largePositive` | 0 – 6  |
| `smallPositive` | 0 – 90 |

### Types and constants

```typescript
// [MPN, lower 95% CI, upper 95% CI]
type MpnResult = [string | number, number, string | number];
type Mpn = MpnResult | undefined;

MAX_QT_MPN_INDEX; // 51
MAX_2K_LARGE_POS; // 49
MAX_2K_SMALL_POS; // 48
MAX_LEGIO_LARGE_POS; // 6
MAX_LEGIO_SMALL_POS; // 90
```

## Used by

- [mpn-lookup-nextjs](https://github.com/jonathan-gartland/mpn-lookup-nextjs): Next.js web app
- [MpnLookupRN](https://github.com/jonathan-gartland/MpnLookupRN): React Native mobile app

## Development

Requires Node 24 and pnpm.

```bash
git clone https://github.com/jonathan-gartland/mpn-lookup.git
cd mpn-lookup
pnpm install

pnpm test        # mocha + chai
pnpm check-all   # lint, type-check, test
pnpm build       # tsup -> dist/ (CJS, ESM, .d.ts)
```

The lookup tables in `mpn.data.ts` are treated as constant. CI rejects any change to them,
and `test/table-checksum.test.ts` fails if any lookup result changes. If a value looks wrong,
please [open an issue](https://github.com/jonathan-gartland/mpn-lookup/issues) with the IDEXX
table reference instead of sending a PR.

Releases are published to npm from GitHub releases through npm trusted publishing (OIDC, no
stored tokens), with provenance and a 2FA approval step.

## Disclaimer

This project is not affiliated with or endorsed by IDEXX Laboratories. Quanti-Tray and
Legiolert are trademarks of IDEXX Laboratories, Inc. Always confirm reportable results against
the official IDEXX documentation for your test.

## License

[MIT](./LICENSE) © Jonathan Gartland
