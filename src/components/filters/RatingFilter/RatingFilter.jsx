export default function RatingFilter({ value, onChange, language }) {
  const ua = language === 'ua';

  return (
    <label>
      {ua ? 'РЕЙТИНГ' : 'RATING'}
      <strong>{value.toFixed(1)}+</strong>

      <input
        type="range"
        min="5"
        max="9"
        step=".5"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
