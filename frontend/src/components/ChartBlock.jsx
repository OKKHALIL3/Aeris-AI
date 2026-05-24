import { useRef, useEffect } from 'react'
import {
  Chart, LineElement, PointElement, LineController,
  CategoryScale, LinearScale, Filler, Tooltip,
} from 'chart.js'

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Filler, Tooltip)

function getStatus(val, warn, danger) {
  if (val >= danger) return 'danger'
  if (val >= warn)   return 'warning'
  return 'normal'
}

export default function ChartBlock({ title, emoji, values, labels, warningThresh, dangerThresh, unit, color }) {
  const canvasRef = useRef(null)
  const chartRef  = useRef(null)

  const latest = values[values.length - 1]
  const status = getStatus(latest, warningThresh, dangerThresh)

  useEffect(() => {
    if (!canvasRef.current || !values.length) return
    if (chartRef.current) chartRef.current.destroy()

    const pointColors = values.map(v =>
      v >= dangerThresh ? '#ff4c4c' : v >= warningThresh ? '#f5a623' : color
    )

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data: values,
            borderColor: color,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointBackgroundColor: pointColors,
            tension: 0.4,
            fill: true,
            backgroundColor: (ctx) => {
              const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 180)
              g.addColorStop(0, color + '44')
              g.addColorStop(1, color + '00')
              return g
            },
          },
          {
            data: Array(labels.length).fill(warningThresh),
            borderColor: '#f5a623',
            borderWidth: 1.5,
            borderDash: [5, 4],
            pointRadius: 0,
            fill: false,
            tension: 0,
          },
          {
            data: Array(labels.length).fill(dangerThresh),
            borderColor: '#ff4c4c',
            borderWidth: 1.5,
            borderDash: [5, 4],
            pointRadius: 0,
            fill: false,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: c => ` ${c.parsed.y}${unit}` } },
        },
        scales: {
          x: { ticks: { color: '#6b7280', font: { size: 10 }, maxTicksLimit: 6 }, grid: { color: 'rgba(255,255,255,0.04)' } },
          y: { ticks: { color: '#6b7280', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.06)' } },
        },
      },
    })

    return () => chartRef.current?.destroy()
  }, [values, labels, color, warningThresh, dangerThresh, unit])

  return (
    <div className="chart-block">
      <div className="chart-block-header">
        <span className="chart-metric-name">{emoji} {title}</span>
        <span className={`danger-badge badge-${status}`}>{status.toUpperCase()}</span>
      </div>
      <div className="chart-current">{latest}{unit}</div>
      <div className="legend-row">
        <div className="legend-dot">
          <div className="legend-line" style={{ background: color }}></div>Reading
        </div>
        <div className="legend-dot">
          <div className="legend-line" style={{ background: '#f5a623', opacity: 0.7 }}></div>
          Warning ≥{warningThresh}{unit}
        </div>
        <div className="legend-dot">
          <div className="legend-line" style={{ background: '#ff4c4c', opacity: 0.7 }}></div>
          Danger ≥{dangerThresh}{unit}
        </div>
      </div>
      <canvas ref={canvasRef} height={120}></canvas>
    </div>
  )
}
