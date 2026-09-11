import {
  formatCurrency,
} from "../utils/incentiveCalculator";

function ResultCard({
  exactRating,
  exactPayout,
}) {
  return (
    <div className="result-section">

      <div className="result-card result-card--rating">
        <span className="result-card__label">
          FINAL RATING
        </span>

        <div className="result-card__rating">
          <strong>
            {exactRating.toFixed(2)}
          </strong>

          <span>
            / 10
          </span>
        </div>
      </div>

      <div className="result-card result-card--payout">
        <span className="result-card__label">
          INCENTIVE PAYOUT
        </span>

        <strong className="result-card__payout">
          {formatCurrency(exactPayout)}
        </strong>
      </div>

    </div>
  );
}

export default ResultCard;
