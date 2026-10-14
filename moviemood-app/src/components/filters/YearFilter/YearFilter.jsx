export default function YearFilter({ value, onChange, language }) {
  const ua = language === 'ua';

  return (
    <label>
      {ua ? 'РІК ВИПУСКУ' : 'RELEASE YEAR'}
      <strong>{value}+</strong>

      <input
        type="range"
        min="1990"
        max="2024"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
