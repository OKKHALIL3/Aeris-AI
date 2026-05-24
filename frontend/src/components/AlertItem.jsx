export default function AlertItem({ field, value, level, timestamp }) {
  const label = field
    .replace('_C', '').replace('_%', '').replace('_hPa', '').replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())

  return (
    <div className="alert-item">
      <div className="alert-row-top">
        <div className="alert-area">
          <span className={`dot ${level === 'danger' ? 'red' : 'yellow'}`}></span>
          {label} {level.toUpperCase()}
        </div>
        <span className="alert-time">{timestamp.slice(11, 16)}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px' }}>
        <span className="alert-sensor">{timestamp.slice(0, 10)}</span>
        <span className="alert-reading">Value: {value}</span>
      </div>
    </div>
  )
}
