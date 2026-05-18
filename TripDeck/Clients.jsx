
function Clients({ setScreen, setNewProposalClient }) {
  const [selected, setSelected] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [editMode, setEditMode] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newClient, setNewClient] = React.useState({ agency: "", contact: "", email: "", phone: "", city: "", state: "", gst: "" });
  const [addSaved, setAddSaved] = React.useState(false);

  const filtered = CLIENTS.filter(c =>
    c.agency.toLowerCase().includes(search.toLowerCase()) ||
    c.contact.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  const card = { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10 };
  const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box" };
  const labelStyle = { fontSize: 12, fontWeight: 500, color: "#374151", display: "block", marginBottom: 5 };

  if (selected) {
    const client = CLIENTS.find(c => c.id === selected);
    const proposals = PROPOSALS.filter(p => p.clientId === client.id);
    return (
      <div style={{ flex: 1, overflowY: "auto", padding: 32, background: "#F4F6F5" }}>
        <button onClick={() => setSelected(null)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 13, marginBottom: 20, padding: 0 }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to Clients
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20 }}>
          {/* Client card */}
          <div>
            <div style={{ ...card, padding: 24, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#1D9E75" }}>
                  {client.agency[0]}
                </div>
                <button onClick={() => { setEditMode(true); setEditData({ ...client }); }} style={{ fontSize: 12, padding: "5px 12px", border: "1px solid #E5E7EB", borderRadius: 6, background: "#fff", cursor: "pointer", color: "#374151", fontWeight: 500 }}>Edit</button>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{client.agency}</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>{client.contact}</div>
              {[["Email", client.email], ["Phone", client.phone], ["City", `${client.city}, ${client.state}`], ["GST", client.gst]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "#9CA3AF", width: 50 }}>{l}</span>
                  <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ ...card, padding: 16, display: "flex", gap: 12 }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#1D9E75" }}>{client.proposals}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF" }}>Proposals</div>
              </div>
              <div style={{ width: 1, background: "#E5E7EB" }}></div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}><span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, ...getStatusStyle(client.lastStatus) }}>{client.lastStatus}</span></div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>Latest status</div>
              </div>
            </div>
            <button onClick={() => { setNewProposalClient(client); setScreen("new-proposal"); }} style={{ width: "100%", marginTop: 12, padding: "10px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ New Proposal</button>
          </div>

          {/* Timeline */}
          <div style={{ ...card, padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 20 }}>Proposal History</div>
            {proposals.length === 0 && <div style={{ color: "#9CA3AF", fontSize: 13 }}>No proposals for this client yet.</div>}
            {proposals.map((p, i) => {
              const st = getStatusStyle(p.status);
              return (
                <div key={p.id} style={{ display: "flex", gap: 16, marginBottom: 20, position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: st.color, marginTop: 3, flexShrink: 0 }}></div>
                    {i < proposals.length - 1 && <div style={{ width: 2, flex: 1, background: "#E5E7EB", marginTop: 4 }}></div>}
                  </div>
                  <div style={{ flex: 1, paddingBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1D9E75" }}>{p.id}</div>
                        <div style={{ fontSize: 12, color: "#6B7280", margin: "3px 0" }}>{p.products.join(", ")}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>{formatINR(p.amount)}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: st.bg, color: st.color }}>{p.status}</span>
                        <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>{p.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Edit modal */}
        {editMode && editData && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: "#fff", borderRadius: 12, padding: 32, width: 520, maxHeight: "80vh", overflowY: "auto" }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Edit Client</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[["agency","Travel Agency Name"],["contact","Contact Person"],["email","Email"],["phone","Phone"],["city","City"],["state","State"],["gst","GST Number"]].map(([k,l]) => (
                  <div key={k} style={k === "agency" || k === "contact" ? { gridColumn: "1/-1" } : {}}>
                    <label style={labelStyle}>{l}</label>
                    <input style={inputStyle} value={editData[k]} onChange={e => setEditData(p => ({...p, [k]: e.target.value}))} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button onClick={() => setEditMode(false)} style={{ flex: 1, padding: 10, background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save Changes</button>
                <button onClick={() => setEditMode(false)} style={{ padding: "10px 20px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, cursor: "pointer", background: "#fff" }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 32, background: "#F4F6F5" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>Clients</div>
          <div style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>{CLIENTS.length} travel agencies</div>
        </div>
        <button onClick={() => { setNewClient({ agency: "", contact: "", email: "", phone: "", city: "", state: "", gst: "" }); setAddSaved(false); setShowAddModal(true); }} style={{ padding: "9px 18px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add Client</button>
      </div>

      {/* Search */}
      <div style={{ ...card, padding: "14px 18px", marginBottom: 16, position: "relative" }}>
        <svg style={{ position: "absolute", left: 30, top: "50%", transform: "translateY(-50%)" }} width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2}><circle cx={11} cy={11} r={8}/><path d="M21 21l-4.35-4.35"/></svg>
        <input style={{ ...inputStyle, paddingLeft: 28, border: "none", outline: "none", background: "transparent" }} placeholder="Search by agency, contact, or city…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* List */}
      <div style={{ ...card, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {["Agency","Contact","City","GST","Proposals","Status","Actions"].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6B7280", letterSpacing: "0.5px", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const st = getStatusStyle(c.lastStatus);
              return (
                <tr key={c.id} style={{ borderTop: "1px solid #F3F4F6", cursor: "pointer" }}
                  onClick={() => setSelected(c.id)}
                  onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#1D9E75", flexShrink: 0 }}>{c.agency[0]}</div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{c.agency}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{c.contact}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "#6B7280" }}>{c.city}, {c.state}</td>
                  <td style={{ padding: "12px 16px", fontSize: 12, color: "#9CA3AF", fontFamily: "monospace" }}>{c.gst}</td>
                  <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#111827" }}>{c.proposals}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: st.bg, color: st.color }}>{c.lastStatus}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button onClick={e => { e.stopPropagation(); setNewProposalClient(c); setScreen("new-proposal"); }}
                      style={{ fontSize: 11, padding: "5px 12px", border: "1px solid #1D9E75", borderRadius: 6, background: "#fff", color: "#1D9E75", cursor: "pointer", fontWeight: 600 }}>
                      + Proposal
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 32, width: 540, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 56px rgba(0,0,0,0.18)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>Add New Client</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 3 }}>New client will be saved to your database</div>
              </div>
              <button onClick={() => setShowAddModal(false)} style={{ width: 32, height: 32, border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280", fontSize: 18, lineHeight: 1 }}>×</button>
            </div>

            {addSaved ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth={2.5}><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginBottom: 6 }}>Client Added!</div>
                <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 24 }}>{newClient.agency} has been saved to your client list.</div>
                <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                  <button onClick={() => { setShowAddModal(false); }} style={{ padding: "9px 20px", background: "#F3F4F6", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151" }}>Close</button>
                  <button onClick={() => { setNewProposalClient(newClient); setScreen("new-proposal"); setShowAddModal(false); }} style={{ padding: "9px 20px", background: "#1D9E75", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#fff" }}>Create Proposal →</button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  {[
                    { key: "agency", label: "Travel Agency Name *", ph: "e.g. Skyline Travel & Tours", span: true },
                    { key: "contact", label: "Contact Person *", ph: "Full name", span: true },
                    { key: "email", label: "Email Address *", ph: "email@agency.com" },
                    { key: "phone", label: "Phone Number", ph: "+91 98765 43210" },
                    { key: "city", label: "City", ph: "e.g. Mumbai" },
                    { key: "state", label: "State", ph: "e.g. Maharashtra" },
                    { key: "gst", label: "GST Number", ph: "27AABCT1234A1Z5", span: true },
                  ].map(f => (
                    <div key={f.key} style={f.span ? { gridColumn: "1 / -1" } : {}}>
                      <label style={labelStyle}>{f.label}</label>
                      <input
                        style={{ ...inputStyle, borderColor: f.key.endsWith("*") && !newClient[f.key] ? undefined : undefined }}
                        placeholder={f.ph}
                        value={newClient[f.key] || ""}
                        onChange={e => setNewClient(p => ({ ...p, [f.key]: e.target.value }))}
                        onFocus={e => { e.target.style.borderColor = "#1D9E75"; e.target.style.boxShadow = "0 0 0 3px rgba(29,158,117,0.1)"; }}
                        onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ background: "#F9FAFB", borderRadius: 8, padding: "12px 14px", marginBottom: 20, fontSize: 12, color: "#6B7280", display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }}><circle cx={12} cy={12} r={10}/><path d="M12 16v-4M12 8h.01"/></svg>
                  GST number is optional but required for generating a tax-compliant invoice later.
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => {
                      if (!newClient.agency || !newClient.contact || !newClient.email) return;
                      setAddSaved(true);
                    }}
                    style={{ flex: 1, padding: "10px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    Save Client
                  </button>
                  <button onClick={() => setShowAddModal(false)} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, cursor: "pointer", color: "#374151" }}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Clients });
