
function Dashboard({ setScreen, setNewProposalStep }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const stats = [
    { label: "Proposals this month", value: "14", sub: "+3 from last month", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { label: "Accepted proposals", value: "9", sub: "64% acceptance rate", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Revenue committed", value: "₹8,43,200", sub: "This month", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" },
  ];

  const card = { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "20px 24px" };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 32, background: "#F4F6F5" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{greeting}, {CURRENT_REP.name.split(" ")[0]} 👋</div>
        <div style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>Wednesday, 30 April 2025 · Here's your activity overview</div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 200px", gap: 16, marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={i} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#111827", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 6 }}>{s.sub}</div>
              </div>
              <div style={{ width: 36, height: 36, background: "#E1F5EE", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
              </div>
            </div>
          </div>
        ))}
        {/* CTA card */}
        <div onClick={() => setScreen("new-proposal")} style={{ background: "#1D9E75", borderRadius: 10, padding: "20px 24px", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#0F6E56"}
          onMouseLeave={e => e.currentTarget.style.background = "#1D9E75"}>
          <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round"><path d="M12 4v16m8-8H4"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>New Proposal</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>Create in &lt; 5 min</div>
          </div>
        </div>
      </div>

      {/* Recent proposals table */}
      <div style={{ ...card, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>Recent Proposals</div>
          <button onClick={() => setScreen("all-proposals")} style={{ fontSize: 12, color: "#1D9E75", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>View all →</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {["Proposal ID","Client","Products","Amount","Status","Date","Actions"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6B7280", letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROPOSALS.map((p, i) => {
              const st = getStatusStyle(p.status);
              return (
                <tr key={p.id} style={{ borderTop: "1px solid #F3F4F6", transition: "background 0.1s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#1D9E75" }}>{p.id}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{p.client}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>{p.contact}</div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#6B7280", maxWidth: 200 }}>{p.products.join(", ")}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#111827" }}>{formatINR(p.amount)}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: st.bg, color: st.color }}>{p.status}</span>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#6B7280", whiteSpace: "nowrap" }}>{p.date}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["View","Resend","PDF"].map(a => (
                        <button key={a} style={{ fontSize: 11, padding: "4px 10px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", color: "#374151", cursor: "pointer", fontWeight: 500 }}>{a}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard });
