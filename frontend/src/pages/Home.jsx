import { useNavigate } from 'react-router-dom'
import PhoneShell from '../components/PhoneShell.jsx'
import usePiTrigger from '../components/usePiTrigger.js'

export default function Home() {
  const navigate = useNavigate()
  const { trigger, loading, status, statusColor } = usePiTrigger(() => {
    setTimeout(() => navigate('/rooms'), 1200)
  })

  return (
    <PhoneShell>
      <div className="home-hero">
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <div className="hero-ring"></div>
          <div className="hero-ring"></div>
          <div className="hero-ring"></div>
          <div className="hero-orb"></div>
        </div>
      </div>

      <div className="powered-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        Powered by AI
      </div>

      <h1 className="home-title">AI-Driven Methane Detection<br />for a Safer Tomorrow.</h1>

      <a className="home-cta" href="/rooms">
        GET STARTED FOR FREE
        <span className="cta-arrow">→</span>
      </a>

      <button className="home-generate-btn" onClick={trigger} disabled={loading} style={{ opacity: loading ? 0.65 : 1 }}>
        Generate Pi Data
        <span style={{ animation: loading ? 'spin 1s linear infinite' : '' }}>⟳</span>
      </button>

      {status && (
        <div className="home-generate-status" style={{ display: 'block', color: statusColor }}>
          {status}
        </div>
      )}

      <a className="know-more" href="/about">I want to know more</a>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </PhoneShell>
  )
}
