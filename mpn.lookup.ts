/**
 * @fileoverview MPN (Most Probable Number) Lookup Tables and Functions
 * 
 * This module provides lookup tables and functions for calculating Most Probable Number (MPN)
 * values for different types of microbiological testing:
 * 
 * - Standard quantification (getQtMpn)
 * - 2000-well format high-throughput analysis (getQt2KMpn)  
 * - Legionella-specific testing (getQtLegio)
 * 
 * The lookup tables live in mpn.data.ts; they are kept as large static lookups for optimal performance and minimal memory usage.
 */

import { mpn, mpn2k, mpnLegio } from './mpn.data';

/**
 * MPN (Most Probable Number) result tuple
 * [0]: Lower bound (number or string like '<1.0')
 * [1]: Most probable number estimate
 * [2]: Upper bound (number or string like 'infinite')
 */
export type MpnResult = [string | number, number, string | number];

/**
 * MPN lookup result - either a valid MPN tuple or undefined for invalid inputs
 */
export type Mpn = MpnResult | undefined;

// Array bounds constants for validation
/** Maximum index for standard MPN lookup (0-51) */
export const MAX_QT_MPN_INDEX = 51;
/** Maximum large position for 2K MPN lookup (0-49) */
export const MAX_2K_LARGE_POS = 49;
/** Maximum small position for 2K MPN lookup (0-48) */
export const MAX_2K_SMALL_POS = 48;
/** Maximum large position for Legionella MPN lookup (0-6) */
export const MAX_LEGIO_LARGE_POS = 6;
/** Maximum small position for Legionella MPN lookup (0-90) */
export const MAX_LEGIO_SMALL_POS = 90;

// Internal calculation constants
const LEGIO_MULTIPLIER = 7;
const MPN_2K_MULTIPLIER = 49;

/**
 * Get MPN value for standard quantification based on positive well count
 * 
 * @param inCount - Number of positive wells (0-51)
 * @returns MPN result tuple [lower_bound, estimate, upper_bound] or undefined if invalid
 * 
 * @example
 * ```typescript
 * const result = getQtMpn(10);
 * if (result) {
 *   const [lower, estimate, upper] = result;
 *   console.log(`MPN: ${estimate} (${lower} - ${upper})`);
 * }
 * ```
 */
export const getQtMpn = (inCount: number): Mpn => {
  // Validate input range
  if (!Number.isInteger(inCount) || inCount < 0 || inCount > MAX_QT_MPN_INDEX) {
    return undefined;
  }
  
  return mpn[inCount];
};

/**
 * Get MPN value for 2000-well format using large and small position indices
 * 
 * @param inLargePos - Large position index (0-49)
 * @param inSmallPos - Small position index (0-48)
 * @returns MPN result tuple [lower_bound, estimate, upper_bound] or undefined if invalid
 * 
 * @example
 * ```typescript
 * const result = getQt2KMpn(10, 25);
 * if (result) {
 *   const [lower, estimate, upper] = result;
 *   console.log(`2K MPN: ${estimate} (${lower} - ${upper})`);
 * }
 * ```
 */
export const getQt2KMpn = (inLargePos: number, inSmallPos: number): Mpn => {
  // Validate input ranges
  if (!Number.isInteger(inLargePos) || !Number.isInteger(inSmallPos) ||
      inLargePos < 0 || inLargePos > MAX_2K_LARGE_POS ||
      inSmallPos < 0 || inSmallPos > MAX_2K_SMALL_POS) {
    return undefined;
  }
  
  // Calculate flattened array index
  const index = inLargePos * MPN_2K_MULTIPLIER + inSmallPos;
  return mpn2k[index];
};

/**
 * Get MPN value for Legionella testing using large and small position indices
 * 
 * Note: This function returns a single value from the flattened Legionella array,
 * not a tuple like the other MPN functions. The Legionella data structure is different.
 * 
 * @param inLargePos - Large position index (0-6)
 * @param inSmallPos - Small position index (0-90)
 * @returns Single MPN value (string or number) or undefined if invalid
 * 
 * @example
 * ```typescript
 * const result = getQtLegio(3, 45);
 * if (result !== undefined) {
 *   console.log(`Legionella MPN: ${result}`);
 * }
 * ```
 */
export const getQtLegio = (inLargePos: number, inSmallPos: number): string | number | undefined => {
  // Validate input ranges
  if (!Number.isInteger(inLargePos) || !Number.isInteger(inSmallPos) ||
      inLargePos < 0 || inLargePos > MAX_LEGIO_LARGE_POS ||
      inSmallPos < 0 || inSmallPos > MAX_LEGIO_SMALL_POS) {
    return undefined;
  }
  
  // Calculate flattened array index (note: different indexing than other functions)
  const index = inSmallPos * LEGIO_MULTIPLIER + inLargePos;
  return mpnLegio[index];
};
