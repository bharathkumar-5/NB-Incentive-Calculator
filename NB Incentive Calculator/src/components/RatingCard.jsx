function RatingCard({
  label,
  rating,
  weight,
}) {
  return (
    <div className="rating-card">

      <div className="rating-card__info">

        <span className="rating-card__label">
          {label}
        </span>

        <span className="rating-card__weight">
          {weight}
        </span>

      </div>

      <span className="rating-card__value">
        {Number(rating).toFixed(2)}
      </span>

    </div>
  );
}

export default RatingCard;
