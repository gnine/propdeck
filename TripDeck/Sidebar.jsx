
function Sidebar({ screen, setScreen, setNewProposalClient }) {
  const nav = [
    { id: "dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "new-proposal", label: "New Proposal", icon: "M12 4v16m8-8H4", cta: true },
    { id: "all-proposals", label: "All Proposals", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { id: "clients", label: "Clients", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { id: "products", label: "Products & Plans", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { id: "settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  ];

  return (
    <div style={{ width: 200, minHeight: "100vh", background: "#0C1A12", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1D9E75", letterSpacing: "-0.5px" }}>Tripclap</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2, letterSpacing: "0.5px", textTransform: "uppercase" }}>Proposal Studio</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 0" }}>
        {nav.map(item => {
          const active = screen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setScreen(item.id); if (item.id === "new-proposal" && setNewProposalClient) setNewProposalClient(null); }}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: item.cta ? "10px 16px" : "9px 16px",
                background: item.cta ? (active ? "#1D9E75" : "rgba(29,158,117,0.18)") : (active ? "rgba(29,158,117,0.15)" : "transparent"),
                border: "none", cursor: "pointer", textAlign: "left",
                borderLeft: active && !item.cta ? "3px solid #1D9E75" : "3px solid transparent",
                margin: item.cta ? "6px 12px" : "1px 0",
                borderRadius: item.cta ? 8 : 0,
                transition: "all 0.15s",
              }}
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={item.cta ? "#fff" : (active ? "#1D9E75" : "rgba(255,255,255,0.45)")} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              <span style={{ fontSize: 13, fontWeight: item.cta ? 600 : (active ? 500 : 400), color: item.cta ? "#fff" : (active ? "#e8f5f0" : "rgba(255,255,255,0.55)") }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Rep info */}
      <div style={{ padding: "16px 16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1D9E75", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
            {CURRENT_REP.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{CURRENT_REP.name}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Sales Rep</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar });
