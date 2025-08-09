# mpn-lookup

A simple tool for when you don't want to use, or simply can't find, the various reference PDF's for the QuantiTray system.

Built with:  
![Mocha](https://img.shields.io/badge/-Mocha-%238D6748?&style=for-the-badge&logo=Mocha&logoColor=white)
![Chai](https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red)
![TS](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

For the work I used the following tools:

![Intellij](https://img.shields.io/badge/IntelliJ_IDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white)
![VSCode](https://img.shields.io/badge/-Visual%20Studio%20Code-%233178C6?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Cursor](https://img.shields.io/badge/Cursor-000000?style=for-the-badge&logo=cursor&logoColor=white)
![Claude](https://img.shields.io/badge/Claude-191A23?style=for-the-badge&logo=anthropic&logoColor=white)

## Installation

```bash
npm install mpn-lookup
# or
pnpm add mpn-lookup
# or
yarn add mpn-lookup
```

## Quick Start

```typescript
import { getQtMpn, getQt2KMpn, getQtLegio } from 'mpn-lookup';

// Standard QuantiTray lookup (0-51 positive wells)
const result = getQtMpn(10);
if (result) {
  const [lower, estimate, upper] = result;
  console.log(`MPN: ${estimate} (${lower} - ${upper})`);
  // Output: MPN: 5.3 (2.3 - 12.3)
}

// QuantiTray 2000 lookup (large pos: 0-49, small pos: 0-48)
const result2k = getQt2KMpn(10, 25);
if (result2k) {
  const [lower, estimate, upper] = result2k;
  console.log(`2K MPN: ${estimate} (${lower} - ${upper})`);
}

// Legionella lookup (large pos: 0-6, small pos: 0-90)
const legioResult = getQtLegio(3, 45);
if (legioResult !== undefined) {
  console.log(`Legionella MPN: ${legioResult}`);
}
```

## API Reference

### `getQtMpn(positiveWells: number): MpnResult | undefined`

Returns MPN values for standard QuantiTray testing.

- **positiveWells**: Number of positive wells (0-51)
- **Returns**: `[lowerBound, estimate, upperBound]` tuple or `undefined` for invalid inputs

### `getQt2KMpn(largePos: number, smallPos: number): MpnResult | undefined`

Returns MPN values for QuantiTray 2000 high-throughput testing.

- **largePos**: Large position index (0-49)
- **smallPos**: Small position index (0-48)
- **Returns**: `[lowerBound, estimate, upperBound]` tuple or `undefined` for invalid inputs

### `getQtLegio(largePos: number, smallPos: number): string | number | undefined`

Returns MPN values for Legionella testing.

- **largePos**: Large position index (0-6)
- **smallPos**: Small position index (0-90)
- **Returns**: Single MPN value or `undefined` for invalid inputs

## Development

```bash
# Clone and setup
git clone https://github.com/jonathan-gartland/mpn-lookup.git
cd mpn-lookup
pnpm install

# Run tests
pnpm test

# Build library
pnpm build

# Run all checks (lint, type-check, test)
pnpm run check-all
```

## Example use in REPL:

![MPN Output Example](https://raw.githubusercontent.com/jonathan-gartland/mpn-lookup/refactor/improve-project-structure/public/mpn_out.png)  
![MPN Examples](https://raw.githubusercontent.com/jonathan-gartland/mpn-lookup/refactor/improve-project-structure/public/mpn_examples.png)

## Example Apps that uses the mpn-lookup library

[https://github.com/jonathan-gartland/mpn-lookup-nextjs](https://github.com/jonathan-gartland/mpn-lookup-nextjs)  
[https://github.com/jonathan-gartland/MpnLookupRN](https://github.com/jonathan-gartland/MpnLookupRN)
