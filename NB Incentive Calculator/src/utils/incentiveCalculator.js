import {
  INCENTIVE_MATRIX,
  WEIGHTS,
  MAX_PAYOUT,
} from "../constants/incentiveMatrix";

/**
 * Calculate continuous/interpolated rating.
 *
 * Example:
 *
 * Walk-in:
 * 10 = Rating 1
 * 17 = Rating 2
 *
 * Input = 16
 *
 * Rating =
 * 1 + ((16 - 10) / (17 - 10))
 * = 1.8571
 *
 * Displayed as 1.85 if using 2 decimal precision.
 */
export const getInterpolatedRating = (
  value,
  metric
) => {
  const numericValue = Number(value);

  if (
    !Number.isFinite(numericValue) ||
    numericValue <= 0
  ) {
    return 0;
  }

  const matrix = INCENTIVE_MATRIX;

  // Below first target
  if (numericValue < matrix[1][metric]) {
    const lower = matrix[0];
    const upper = matrix[1];

    const rating =
      lower.rating +
      ((numericValue - lower[metric]) /
        (upper[metric] - lower[metric])) *
        (upper.rating - lower.rating);

    return Math.max(0, rating);
  }

  // Maximum rating
  const last =
    matrix[matrix.length - 1];

  if (numericValue >= last[metric]) {
    return 10;
  }

  // Find the two surrounding levels
  for (let i = 1; i < matrix.length; i++) {
    const lower = matrix[i - 1];
    const upper = matrix[i];

    if (
      numericValue >= lower[metric] &&
      numericValue < upper[metric]
    ) {
      const rating =
        lower.rating +
        ((numericValue - lower[metric]) /
          (upper[metric] - lower[metric])) *
          (upper.rating - lower.rating);

      return rating;
    }
  }

  return 0;
};

/**
 * Calculate complete incentive.
 *
 * Formula:
 *
 * Final Rating =
 * (Walk-in Rating × 60%)
 * +
 * (Dialled Rating × 20%)
 * +
 * (Talk Time Rating × 20%)
 *
 * NO final rounding.
 */
export const calculateIncentive = ({
  walkIns = 0,
  dialled = 0,
  talkTime = 0,
}) => {
  // -----------------------------------------
  // STEP 1
  // Continuous metric ratings
  // -----------------------------------------

  const walkInRating =
    getInterpolatedRating(
      walkIns,
      "walkIns"
    );

  const dialledRating =
    getInterpolatedRating(
      dialled,
      "dialled"
    );

  const talkTimeRating =
    getInterpolatedRating(
      talkTime,
      "talkTime"
    );

  // -----------------------------------------
  // STEP 2
  // Weighted ratings
  // -----------------------------------------

  const walkInScore =
    walkInRating *
    WEIGHTS.walkIns;

  const dialledScore =
    dialledRating *
    WEIGHTS.dialled;

  const talkTimeScore =
    talkTimeRating *
    WEIGHTS.talkTime;

  // -----------------------------------------
  // STEP 3
  // Exact final rating
  // -----------------------------------------

  const exactRating =
    walkInScore +
    dialledScore +
    talkTimeScore;

  // -----------------------------------------
  // STEP 4
  // Payout
  //
  // ₹800 per rating point
  // -----------------------------------------

  const exactPayout = Math.min(
    exactRating * 800,
    MAX_PAYOUT
  );

  return {
    walkInRating,
    dialledRating,
    talkTimeRating,

    walkInScore,
    dialledScore,
    talkTimeScore,

    exactRating,
    exactPayout,
  };
};

/**
 * Currency formatter
 */
export const formatCurrency = (
  amount
) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
};
