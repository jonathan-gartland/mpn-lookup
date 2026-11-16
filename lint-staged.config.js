/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unsafe-argument */
const quote = (filenames) => filenames.map((f) => `"${f}"`).join(' ');

// mpn.data.ts holds constant lookup tables and must never be reformatted.
const isProtected = (f) => /(^|[\\/])mpn\.data\.ts$/.test(f);
const allowed = (filenames) => filenames.filter((f) => !isProtected(f));

module.exports = {
  '**/*.{js,jsx,ts,tsx}': (filenames) => {
    const files = allowed(filenames);
    return files.length > 0 ? [`eslint --fix ${quote(files)}`] : [];
  },
  '**/*.{md,json}': (filenames) => {
    const files = allowed(filenames);
    return files.length > 0 ? [`prettier --write ${quote(files)}`] : [];
  },
};
