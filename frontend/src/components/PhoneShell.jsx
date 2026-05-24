export default function PhoneShell({ children }) {
  return (
    <div className="phone-shell">
      <div className="app-frame">
        <div className="app-screen">{children}</div>
      </div>
    </div>
  )
}
