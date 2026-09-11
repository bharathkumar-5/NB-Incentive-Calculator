import {
  useMemo,
  useState,
} from "react";

import MetricInput from "./components/MetricInput";
import RatingCard from "./components/RatingCard";
import ResultCard from "./components/ResultCard";
import CalculationPanel from "./components/CalculationPanel";

import {
  calculateIncentive,
} from "./utils/incentiveCalculator";

function App() {
  const [inputs, setInputs] = useState({
    walkIns: "",
    dialled: "",
    talkTime: "",
  });

  const [showCalculation, setShowCalculation] =
    useState(false);

  const result = useMemo(() => {
    return calculateIncentive({
      walkIns: inputs.walkIns,
      dialled: inputs.dialled,
      talkTime: inputs.talkTime,
    });
  }, [inputs]);

  const updateInput = (
    field,
    value
  ) => {
    setInputs((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setInputs({
      walkIns: "",
      dialled: "",
      talkTime: "",
    });

    setShowCalculation(false);
  };

  return (
    <main className="app">

      <section className="calculator">

        {/* HEADER */}
        <header className="calculator-header">

          <div>
            <span className="calculator-header__eyebrow">
              INCENTIVE CALCULATOR
            </span>

            <h1 className="calculator-header__title">
              Walk-in Incentive
            </h1>
          </div>

          <div className="calculator-header__maximum">
            <span>
              Maximum payout
            </span>

            <strong>
              ₹8,000
            </strong>
          </div>

        </header>

        {/* BODY */}
        <div className="calculator-body">

          {/* INPUTS */}
          <div className="metrics">

            <MetricInput
              label="Walk-in Count"
              suffix="/ month"
              value={inputs.walkIns}
              onChange={(value) =>
                updateInput(
                  "walkIns",
                  value
                )
              }
            />

            <MetricInput
              label="Dialled"
              suffix="/ day"
              value={inputs.dialled}
              onChange={(value) =>
                updateInput(
                  "dialled",
                  value
                )
              }
            />

            <MetricInput
              label="Talk Time"
              suffix="min / day"
              value={inputs.talkTime}
              onChange={(value) =>
                updateInput(
                  "talkTime",
                  value
                )
              }
            />

          </div>

          {/* RESULT */}
          <ResultCard
            exactRating={
              result.exactRating
            }
            exactPayout={
              result.exactPayout
            }
          />

          {/* RATINGS */}
          <div className="rating-grid">

            <RatingCard
              label="Walk-in"
              rating={
                result.walkInRating
              }
              weight="60%"
            />

            <RatingCard
              label="Dialled"
              rating={
                result.dialledRating
              }
              weight="20%"
            />

            <RatingCard
              label="Talk Time"
              rating={
                result.talkTimeRating
              }
              weight="20%"
            />

          </div>

          {/* EXACT RATING */}
          <div className="weighted-rating">

            <span>
              Exact Weighted Rating
            </span>

            <strong>
              {Number(
                result.exactRating || 0
              ).toFixed(2)}
            </strong>

          </div>

          {/* ACTIONS */}
          <div className="calculator-actions">

            <button
              type="button"
              className="calculation-button"
              onClick={() =>
                setShowCalculation(true)
              }
            >
              View Calculation
            </button>

            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
            >
              Reset
            </button>

          </div>

        </div>

      </section>

      {/* SIDE PANEL */}
      <CalculationPanel
        isOpen={showCalculation}
        onClose={() =>
          setShowCalculation(false)
        }
        inputs={inputs}
        result={result}
      />

    </main>
  );
}

export default App;
