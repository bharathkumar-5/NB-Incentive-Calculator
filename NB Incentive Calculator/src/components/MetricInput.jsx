function MetricInput({
  label,
  suffix,
  value,
  onChange,
}) {
  const handleChange = (event) => {
    const inputValue =
      event.target.value;

    /*
     * Allow empty input.
     */
    if (inputValue === "") {
      onChange("");
      return;
    }

    const numericValue =
      Number(inputValue);

    /*
     * Don't allow negative values.
     */
    if (numericValue >= 0) {
      onChange(inputValue);
    }
  };

  return (
    <label className="metric-input">
      <span className="metric-input__header">
        <span className="metric-input__label">
          {label}
        </span>

        <span className="metric-input__suffix">
          {suffix}
        </span>
      </span>

      <input
        type="number"
        min="0"
        step="1"
        inputMode="numeric"
        value={value}
        placeholder="0"
        onChange={handleChange}
      />
    </label>
  );
}

export default MetricInput;
