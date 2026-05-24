import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home        from './pages/Home.jsx'
import Dashboard   from './pages/Dashboard.jsx'
import RoomDetail  from './pages/RoomDetail.jsx'
import Immediate   from './pages/Immediate.jsx'
import Alerts      from './pages/Alerts.jsx'
import About       from './pages/About.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/rooms"          element={<Dashboard />} />
        <Route path="/room/:roomName" element={<RoomDetail />} />
        <Route path="/immediate"      element={<Immediate />} />
        <Route path="/alerts"         element={<Alerts />} />
        <Route path="/about"          element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
