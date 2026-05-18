
function AllProposals({ setScreen }) {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [expanded, setExpanded] = React.useState(null);
  const [selected, setSelected] = React.useState([]);

  const statuses = ["All", "Draft", "Sent", "Accepted", "Expired", "Revised"];
  const filtered = PROPOSALS.filter(p => {
    const matchSearch = p.id.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase()) || p.contact.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleSelect = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const allSelected = filtered.length > 0 && filtered.every(p => selected.includes(p.id));

  const inputStyle = { padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, color: "#111827", outline: "none", fontFamily: "Inter, sans-serif" };
  const card = { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10 };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 32, background: "#F4F6F5" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>All Proposals</div>
        <div style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>{PROPOSALS.length} proposals total</div>
      </div>

      {/* Filters */}
      <div style={{ ...card, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <svg style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2}><circle cx={11} cy={11} r={8}/><path d="M21 21l-4.35-4.35"/></svg>
          <input style={{ ...inputStyle, paddingLeft: 32, width: "100%", boxSizing: "border-box" }} placeholder="Search proposals, clients…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {statuses.map(s => {
            const st = s !== "All" ? getStatusStyle(s) : null;
            return (
              <button key={s} onClick={() => setStatusFilter(s)}
                style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${statusFilter === s ? (st?.color || "#1D9E75") : "#E5E7EB"}`, background: statusFilter === s ? (st?.bg || "#E1F5EE") : "#fff", color: statusFilter === s ? (st?.color || "#0F6E56") : "#6B7280", fontSize: 12, fontWeight: statusFilter === s ? 600 : 400, cursor: "pointer", transition: "all 0.15s" }}>
                {s}
              </button>
            );
          })}
        </div>
        {selected.length > 0 && (
          <button style={{ padding: "7px 16px", background: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer", color: "#374151" }}>
            Export {selected.length} selected →
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{ ...card, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              <th style={{ padding: "10px 16px", width: 36 }}>
                <input type="checkbox" checked={allSelected} onChange={() => setSelected(allSelected ? [] : filtered.map(p => p.id))} />
              </th>
              {["Proposal ID","Client","Products","Amount","Status","Date","Rep","Actions"].map(h => (
                <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6B7280", letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
              ))}
              <th style={{ width: 28 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const st = getStatusStyle(p.status);
              const isExpanded = expanded === p.id;
              return (
                <React.Fragment key={p.id}>
                  <tr style={{ borderTop: "1px solid #F3F4F6", background: isExpanded ? "#FAFFFE" : "" }}
                    onMouseEnter={e => !isExpanded && (e.currentTarget.style.background = "#FAFAFA")}
                    onMouseLeave={e => !isExpanded && (e.currentTarget.style.background = "")}>
                    <td style={{ padding: "12px 16px" }}>
                      <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} />
                    </td>
                    <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 600, color: "#1D9E75", whiteSpace: "nowrap" }}>{p.id}</td>
                    <td style={{ padding: "12px 12px" }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>{p.client}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>{p.contact}</div>
                    </td>
                    <td style={{ padding: "12px 12px", fontSize: 12, color: "#6B7280", maxWidth: 200 }}>{p.products.join(", ")}</td>
                    <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 600, color: "#111827", whiteSpace: "nowrap" }}>{formatINR(p.amount)}</td>
                    <td style={{ padding: "12px 12px" }}>
                      <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: st.bg, color: st.color }}>{p.status}</span>
                    </td>
                    <td style={{ padding: "12px 12px", fontSize: 12, color: "#6B7280", whiteSpace: "nowrap" }}>{p.date}</td>
                    <td style={{ padding: "12px 12px", fontSize: 12, color: "#6B7280" }}>{p.rep}</td>
                    <td style={{ padding: "12px 12px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        {["View","Resend","PDF"].map(a => (
                          <button key={a} style={{ fontSize: 11, padding: "4px 10px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", color: "#374151", cursor: "pointer", fontWeight: 500 }}>{a}</button>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <button onClick={() => setExpanded(isExpanded ? null : p.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", transform: isExpanded ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr style={{ background: "#F9FFFE", borderTop: "1px solid #E1F5EE" }}>
                      <td colSpan={10} style={{ padding: "16px 24px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, fontSize: 12 }}>
                          <div><div style={{ color: "#9CA3AF", marginBottom: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px" }}>Client</div><div style={{ fontWeight: 500 }}>{p.client}</div><div style={{ color: "#9CA3AF" }}>{p.contact}</div></div>
                          <div><div style={{ color: "#9CA3AF", marginBottom: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px" }}>Products</div>{p.products.map((pr, i) => <div key={i} style={{ fontWeight: 500 }}>{pr}</div>)}</div>
                          <div><div style={{ color: "#9CA3AF", marginBottom: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px" }}>Financials</div><div style={{ fontWeight: 500 }}>{formatINR(p.amount)} total</div><div style={{ color: "#9CA3AF" }}>incl. 18% GST</div></div>
                          <div><div style={{ color: "#9CA3AF", marginBottom: 4, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px" }}>Prepared by</div><div style={{ fontWeight: 500 }}>{p.rep}</div><div style={{ color: "#9CA3AF" }}>Sent {p.date}</div></div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>No proposals match your filters.</div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { AllProposals });
