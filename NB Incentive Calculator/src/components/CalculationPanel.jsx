import { formatCurrency } from "../utils/incentiveCalculator";

function CalculationPanel({
  isOpen,
  onClose,
  inputs,
  result,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="calculation-overlay"
        onClick={onClose}
      />

      <aside className="calculation-panel">

        {/* HEADER */}
        <div className="calculation-panel__header">
          <div>
            <span className="calculation-panel__eyebrow">
              CALCULATION
            </span>

            <h2>
              Incentive Breakdown
            </h2>
          </div>

          <button
            type="button"
            className="calculation-panel__close"
            onClick={onClose}
            aria-label="Close calculation"
          >
            ×
          </button>
        </div>

        {/* INPUTS */}
        <div className="calculation-panel__section">

          <h3>
            Input Values
          </h3>

          <div className="calculation-input-row">
            <span>Walk-in Count</span>
            <strong>
              {inputs.walkIns || 0}
            </strong>
          </div>

          <div className="calculation-input-row">
            <span>Dialled / Day</span>
            <strong>
              {inputs.dialled || 0}
            </strong>
          </div>

          <div className="calculation-input-row">
            <span>Talk Time / Day</span>
            <strong>
              {inputs.talkTime || 0}
            </strong>
          </div>

        </div>

        {/* RATINGS */}
        <div className="calculation-panel__section">

          <h3>
            Metric Ratings
          </h3>

          <div className="calculation-rating-row">
            <div>
              <span>Walk-in Rating</span>
              <small>Weight: 60%</small>
            </div>

            <strong>
              {result.walkInRating.toFixed(2)}
            </strong>
          </div>

          <div className="calculation-rating-row">
            <div>
              <span>Dialled Rating</span>
              <small>Weight: 20%</small>
            </div>

            <strong>
              {result.dialledRating.toFixed(2)}
            </strong>
          </div>

          <div className="calculation-rating-row">
            <div>
              <span>Talk Time Rating</span>
              <small>Weight: 20%</small>
            </div>

            <strong>
              {result.talkTimeRating.toFixed(2)}
            </strong>
          </div>

        </div>

        {/* FORMULA */}
        <div className="calculation-panel__section">

          <h3>
            Weighted Calculation
          </h3>

          <div className="formula-box">

            <div>
              ({result.walkInRating.toFixed(2)} × 60%)
            </div>

            <div>
              + ({result.dialledRating.toFixed(2)} × 20%)
            </div>

            <div>
              + ({result.talkTimeRating.toFixed(2)} × 20%)
            </div>

            <div className="formula-result">
              = {result.exactRating.toFixed(2)}
            </div>

          </div>

        </div>

        {/* FINAL RESULT */}
        <div className="calculation-final">

          <div>
            <span>
              Final Rating
            </span>

            <strong>
              {result.exactRating.toFixed(2)}
              <small> / 10</small>
            </strong>
          </div>

          <div>
            <span>
              Payout
            </span>

            <strong>
              {formatCurrency(
                result.exactPayout
              )}
            </strong>
          </div>

        </div>

      </aside>
    </>
  );
}

export default CalculationPanel;
