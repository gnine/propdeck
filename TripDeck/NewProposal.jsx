
function NewProposal({ initialClient }) {
  const [step, setStep] = React.useState(1);
  const [client, setClient] = React.useState(initialClient || { agency: "", contact: "", email: "", phone: "", city: "", state: "", gst: "", notes: "" });
  const [clientSearch, setClientSearch] = React.useState("");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedProducts, setSelectedProducts] = React.useState({});
  const [discounts, setDiscounts] = React.useState({});
  const [frequency, setFrequency] = React.useState("monthly");
  const [paymentLink, setPaymentLink] = React.useState("");
  const [showSendModal, setShowSendModal] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [personalNote, setPersonalNote] = React.useState("");

  const proposalId = "TC-2025-0013";
  const steps = ["Client Details", "Select Products", "Pricing", "Preview & Send"];

  // Frequency multipliers
  const freqDiscount = { monthly: 0, quarterly: 0.05, annual: 0.15 };

  // Compute pricing
  const lineItems = Object.entries(selectedProducts).map(([pid, planId]) => {
    const product = PRODUCTS.find(p => p.id === Number(pid));
    const plan = product?.plans.find(pl => pl.id === Number(planId));
    if (!product || !plan) return null;
    const disc = Number(discounts[pid] || 0) / 100;
    const freqD = freqDiscount[frequency];
    const discounted = Math.round(plan.mrp * (1 - disc) * (1 - freqD));
    return { product, plan, mrp: plan.mrp, disc: Number(discounts[pid] || 0), freqD: freqDiscount[frequency] * 100, final: discounted };
  }).filter(Boolean);

  const subtotal = lineItems.reduce((s, i) => s + i.final, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const toggleProduct = (pid) => {
    setSelectedProducts(prev => {
      const next = { ...prev };
      if (next[pid]) { delete next[pid]; } else { next[pid] = PRODUCTS.find(p => p.id === pid)?.plans[0]?.id; }
      return next;
    });
  };

  const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, color: "#111827", outline: "none", boxSizing: "border-box", fontFamily: "Inter, sans-serif" };
  const labelStyle = { fontSize: 12, fontWeight: 500, color: "#374151", display: "block", marginBottom: 5 };

  // ─── Step 1 ───────────────────────────────────────────────
  const renderStep1 = () => {
    const matches = CLIENTS.filter(c => c.agency.toLowerCase().includes(clientSearch.toLowerCase()) || c.contact.toLowerCase().includes(clientSearch.toLowerCase())).slice(0, 5);
    return (
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <div style={{ marginBottom: 24, position: "relative" }}>
          <label style={labelStyle}>Search existing client</label>
          <input style={inputStyle} placeholder="Type agency or contact name…" value={clientSearch}
            onChange={e => { setClientSearch(e.target.value); setShowDropdown(true); }}
            onFocus={() => setShowDropdown(true)} onBlur={() => setTimeout(() => setShowDropdown(false), 150)} />
          {showDropdown && clientSearch && matches.length > 0 && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 100, marginTop: 4 }}>
              {matches.map(c => (
                <div key={c.id} onMouseDown={() => { setClient({ agency: c.agency, contact: c.contact, email: c.email, phone: c.phone, city: c.city, state: c.state, gst: c.gst, notes: "" }); setClientSearch(c.agency); setShowDropdown(false); }}
                  style={{ padding: "10px 14px", cursor: "pointer", fontSize: 13, borderBottom: "1px solid #F3F4F6" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#F9FAFB"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <div style={{ fontWeight: 500 }}>{c.agency}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>{c.contact} · {c.city}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[["Travel Agency Name *","agency","text"],["Contact Person *","contact","text"],["Email Address *","email","email"],["Phone Number","phone","tel"],["City","city","text"],["State","state","text"],["GST Number","gst","text"]].map(([lbl, key, type]) => (
            <div key={key} style={key === "agency" || key === "contact" ? { gridColumn: "1 / -1" } : {}}>
              <label style={labelStyle}>{lbl}</label>
              <input style={inputStyle} type={type} value={client[key]} onChange={e => setClient(p => ({ ...p, [key]: e.target.value }))} placeholder={lbl.replace(" *","")} />
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Internal Notes (not shown on proposal)</label>
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 72 }} value={client.notes} onChange={e => setClient(p => ({ ...p, notes: e.target.value }))} placeholder="Notes for your reference…" />
          </div>
        </div>
      </div>
    );
  };

  // ─── Step 2 ───────────────────────────────────────────────
  const renderStep2 = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {PRODUCTS.map(prod => {
        const isSelected = !!selectedProducts[prod.id];
        const selectedPlanId = selectedProducts[prod.id];
        const selectedPlan = prod.plans.find(p => p.id === selectedPlanId);
        const iconMap = { leads: "#F59E0B", crm: "#3B82F6", website: "#8B5CF6", ads: "#EF4444" };
        return (
          <div key={prod.id} onClick={() => toggleProduct(prod.id)} style={{ background: "#fff", border: `2px solid ${isSelected ? "#1D9E75" : "#E5E7EB"}`, borderRadius: 12, padding: 20, cursor: "pointer", transition: "all 0.15s", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, border: `2px solid ${isSelected ? "#1D9E75" : "#D1D5DB"}`, borderRadius: 4, background: isSelected ? "#1D9E75" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                {isSelected && <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}><path d="M5 13l4 4L19 7"/></svg>}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>{prod.name}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 3 }}>{prod.description}</div>
              </div>
            </div>
            {isSelected && (
              <div onClick={e => e.stopPropagation()}>
                <select value={selectedPlanId} onChange={e => setSelectedProducts(prev => ({ ...prev, [prod.id]: Number(e.target.value) }))}
                  style={{ ...inputStyle, marginBottom: 12, background: "#F9FAFB", cursor: "pointer" }}>
                  {prod.plans.map(plan => <option key={plan.id} value={plan.id}>{plan.name} — {plan.description} — {formatINR(plan.mrp)}/{plan.billing === "one-time" ? "setup" : "mo"}</option>)}
                </select>
                {selectedPlan && (
                  <ul style={{ margin: 0, padding: "0 0 0 16px", listStyle: "none" }}>
                    {selectedPlan.features.slice(0,4).map((f,i) => (
                      <li key={i} style={{ fontSize: 11, color: "#6B7280", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: "#1D9E75", fontWeight: 700 }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {!isSelected && (
              <div style={{ display: "flex", gap: 6 }}>
                {prod.plans.map(plan => (
                  <span key={plan.id} style={{ fontSize: 10, padding: "3px 8px", background: "#F3F4F6", borderRadius: 20, color: "#6B7280" }}>{plan.name}</span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  // ─── Step 3 ───────────────────────────────────────────────
  const renderStep3 = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 16 }}>Selected Products</div>
        {lineItems.length === 0 && <div style={{ color: "#9CA3AF", fontSize: 13 }}>No products selected. Go back to Step 2.</div>}
        {lineItems.map((item, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 16, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{item.product.name}</div>
                <span style={{ fontSize: 11, padding: "2px 8px", background: "#E1F5EE", color: "#0F6E56", borderRadius: 20, fontWeight: 500 }}>{item.plan.name} · {item.plan.description}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, color: "#9CA3AF", textDecoration: "line-through" }}>{formatINR(item.mrp)}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1D9E75" }}>{formatINR(item.final)}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <label style={{ fontSize: 12, color: "#6B7280" }}>Rep Discount %</label>
              <input type="number" min={0} max={30} value={discounts[item.product.id] || ""} onChange={e => setDiscounts(p => ({ ...p, [item.product.id]: Math.min(30, Number(e.target.value)) }))}
                style={{ ...inputStyle, width: 80 }} placeholder="0" />
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>Max 30%</span>
              {frequency !== "monthly" && <span style={{ fontSize: 11, color: "#1D9E75", fontWeight: 500 }}>+{item.freqD}% {frequency} discount applied</span>}
            </div>
          </div>
        ))}
      </div>
      {/* Summary */}
      <div>
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 20, position: "sticky", top: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#111827" }}>Price Summary</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 8 }}>Payment Frequency</div>
            <div style={{ display: "flex", border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
              {["monthly","quarterly","annual"].map(f => (
                <button key={f} onClick={() => setFrequency(f)} style={{ flex: 1, padding: "7px 4px", border: "none", fontSize: 11, fontWeight: 500, cursor: "pointer", background: frequency === f ? "#1D9E75" : "#fff", color: frequency === f ? "#fff" : "#6B7280", textTransform: "capitalize", transition: "all 0.15s" }}>
                  {f}{f === "quarterly" ? " −5%" : f === "annual" ? " −15%" : ""}
                </button>
              ))}
            </div>
          </div>
          {lineItems.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, color: "#374151" }}>
              <span>{item.product.name} ({item.plan.name})</span>
              <span style={{ fontWeight: 500 }}>{formatINR(item.final)}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #E5E7EB", margin: "12px 0" }}></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, color: "#374151" }}>
            <span>Subtotal</span><span style={{ fontWeight: 500 }}>{formatINR(subtotal)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 12, color: "#374151" }}>
            <span>GST @ 18%</span><span style={{ fontWeight: 500 }}>{formatINR(gst)}</span>
          </div>
          <div style={{ background: "#1D9E75", borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Total Payable</span>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{formatINR(total)}</span>
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={{ ...labelStyle }}>Payment Link (optional)</label>
            <input style={inputStyle} value={paymentLink} onChange={e => setPaymentLink(e.target.value)} placeholder="Paste Razorpay link…" />
          </div>
        </div>
      </div>
    </div>
  );

  // ─── Step 4 ───────────────────────────────────────────────
  const renderStep4 = () => (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setShowSendModal(true)} style={{ padding: "9px 20px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Send Email</button>
        <button style={{ padding: "9px 16px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151" }}>Copy HTML</button>
        <button style={{ padding: "9px 16px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151" }}>Export PDF</button>
        <button style={{ padding: "9px 16px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", color: "#374151" }}>Save as Draft</button>
      </div>
      <ProposalEmailPreview client={client} lineItems={lineItems} subtotal={subtotal} gst={gst} total={total} proposalId={proposalId} frequency={frequency} paymentLink={paymentLink} />
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 32, background: "#F4F6F5" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>New Proposal</div>
        <div style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>Proposal {proposalId}</div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "16px 24px", marginBottom: 28, display: "flex", alignItems: "center", gap: 0 }}>
        {steps.map((s, i) => {
          const num = i + 1;
          const done = step > num;
          const active = step === num;
          return (
            <React.Fragment key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: done ? "#1D9E75" : active ? "#1D9E75" : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {done ? <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3}><path d="M5 13l4 4L19 7"/></svg>
                    : <span style={{ fontSize: 12, fontWeight: 700, color: active ? "#fff" : "#9CA3AF" }}>{num}</span>}
                </div>
                <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? "#111827" : done ? "#1D9E75" : "#9CA3AF", whiteSpace: "nowrap" }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: done ? "#1D9E75" : "#E5E7EB", margin: "0 8px", maxWidth: 80 }}></div>}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step content */}
      <div style={{ background: step < 4 ? "#fff" : "transparent", border: step < 4 ? "1px solid #E5E7EB" : "none", borderRadius: 10, padding: step < 4 ? 28 : 0, marginBottom: 24 }}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>

      {/* Nav buttons */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => setStep(s => Math.max(1, s - 1))} style={{ padding: "9px 20px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: step === 1 ? "not-allowed" : "pointer", color: step === 1 ? "#D1D5DB" : "#374151" }} disabled={step === 1}>← Back</button>
        {step < 4 && <button onClick={() => setStep(s => Math.min(4, s + 1))} style={{ padding: "9px 24px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Continue →</button>}
      </div>

      {/* Send Modal */}
      {showSendModal && !sent && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, width: 480, boxShadow: "0 24px 48px rgba(0,0,0,0.15)" }}>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Send Proposal</div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>To</label>
              <input style={inputStyle} value={client.email} readOnly />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Subject</label>
              <input style={inputStyle} defaultValue={`Tripclap Proposal ${proposalId} for ${client.agency}`} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Personal Note (optional)</label>
              <textarea style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} value={personalNote} onChange={e => setPersonalNote(e.target.value)} placeholder="Add a personal message to the email body…" />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setShowSendModal(false); setSent(true); }} style={{ flex: 1, padding: "10px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Send Now</button>
              <button onClick={() => setShowSendModal(false)} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {sent && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 40, width: 400, textAlign: "center" }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth={2.5}><path d="M5 13l4 4L19 7"/></svg>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Proposal Sent!</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 24 }}>{proposalId} has been sent to {client.email}. A PDF snapshot has been saved.</div>
            <button onClick={() => setSent(false)} style={{ padding: "10px 24px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Accept / Reject Bar ────────────────────────────────
function AcceptRejectBar({ proposalId, clientName, total }) {
  const [status, setStatus] = React.useState(null); // null | "accepted" | "rejected"
  const [showRejectModal, setShowRejectModal] = React.useState(false);
  const [rejectReason, setRejectReason] = React.useState("");
  const [rejectNote, setRejectNote] = React.useState("");

  const reasons = ["Price too high", "Not interested right now", "Choosing a competitor", "Budget constraints", "Other"];

  if (status === "accepted") return (
    <div style={{ margin: "0 36px 24px", background: "#E1F5EE", border: "2px solid #1D9E75", borderRadius: 12, padding: "24px 28px", display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#1D9E75", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><path d="M5 13l4 4L19 7"/></svg>
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#0F6E56" }}>Proposal Accepted</div>
        <div style={{ fontSize: 12, color: "#1D9E75", marginTop: 2 }}>{clientName} has accepted {proposalId} — {formatINR(total)}. Next step: collect KYC documents.</div>
      </div>
    </div>
  );

  if (status === "rejected") return (
    <div style={{ margin: "0 36px 24px", background: "#FEF2F2", border: "2px solid #FCA5A5", borderRadius: 12, padding: "24px 28px", display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><path d="M6 18L18 6M6 6l12 12"/></svg>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#DC2626" }}>Proposal Rejected</div>
        <div style={{ fontSize: 12, color: "#EF4444", marginTop: 2 }}>Reason: {rejectReason}{rejectNote ? ` — "${rejectNote}"` : ""}</div>
      </div>
      <button onClick={() => setStatus(null)} style={{ fontSize: 12, padding: "6px 14px", border: "1px solid #FCA5A5", borderRadius: 8, background: "#fff", cursor: "pointer", color: "#DC2626", fontWeight: 500 }}>Revise Proposal</button>
    </div>
  );

  return (
    <>
      <div style={{ margin: "0 36px 24px", border: "2px solid #E5E7EB", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: "#F9FAFB", padding: "16px 24px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Ready to proceed?</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Record the client's decision for {proposalId}</div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1D9E75" }}>{formatINR(total)}</div>
        </div>
        <div style={{ padding: "20px 24px", display: "flex", gap: 12, background: "#fff" }}>
          <button onClick={() => setStatus("accepted")}
            style={{ flex: 1, padding: "13px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#0F6E56"}
            onMouseLeave={e => e.currentTarget.style.background = "#1D9E75"}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}><path d="M5 13l4 4L19 7"/></svg>
            Accept Proposal
          </button>
          <button onClick={() => setShowRejectModal(true)}
            style={{ flex: 1, padding: "13px", background: "#fff", color: "#EF4444", border: "2px solid #FCA5A5", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#FEF2F2"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth={2.5}><path d="M6 18L18 6M6 6l12 12"/></svg>
            Reject Proposal
          </button>
        </div>
      </div>

      {/* Reject modal */}
      {showRejectModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 32, width: 460, boxShadow: "0 24px 56px rgba(0,0,0,0.18)" }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 4 }}>Record Rejection</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 20 }}>Help us understand why so we can improve.</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 8 }}>Reason *</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {reasons.map(r => (
                  <button key={r} onClick={() => setRejectReason(r)}
                    style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${rejectReason === r ? "#EF4444" : "#E5E7EB"}`, background: rejectReason === r ? "#FEF2F2" : "#fff", color: rejectReason === r ? "#DC2626" : "#374151", fontSize: 12, fontWeight: rejectReason === r ? 600 : 400, cursor: "pointer" }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#374151", marginBottom: 6 }}>Additional Note (optional)</div>
              <textarea value={rejectNote} onChange={e => setRejectNote(e.target.value)} placeholder="Any additional feedback from the client…" style={{ width: "100%", padding: "9px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, outline: "none", minHeight: 72, resize: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { if (!rejectReason) return; setStatus("rejected"); setShowRejectModal(false); }}
                style={{ flex: 1, padding: "10px", background: "#EF4444", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", opacity: rejectReason ? 1 : 0.5 }}>
                Confirm Rejection
              </button>
              <button onClick={() => setShowRejectModal(false)} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, cursor: "pointer", color: "#374151" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Email Preview Component ─────────────────────────────
function ProposalEmailPreview({ client, lineItems, subtotal, gst, total, proposalId, frequency, paymentLink }) {
  const today = new Date();
  const validity = new Date(today); validity.setDate(validity.getDate() + 7);
  const fmt = d => d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, overflow: "hidden", maxWidth: 680, margin: "0 auto" }}>
      {/* Email Header */}
      <div style={{ background: "#0F6E56", padding: "28px 36px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>Tripclap</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>Empowering Travel Agents Across India</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.5px" }}>{proposalId}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Prepared exclusively for {client.agency || "[Agency Name]"}</div>
        </div>
      </div>

      {/* Meta card */}
      <div style={{ background: "#F9FAFB", padding: "16px 36px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, borderBottom: "1px solid #E5E7EB" }}>
        {[["Prepared by", CURRENT_REP.name], ["Prepared for", client.agency || "—"], ["Date", fmt(today)], ["Valid till", fmt(validity)]].map(([l,v]) => (
          <div key={l}>
            <div style={{ fontSize: 10, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3 }}>{l}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: "28px 36px" }}>
        {/* Greeting */}
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, marginBottom: 20 }}>
          Dear <strong>{client.contact || "Travel Partner"}</strong>,<br/><br/>
          Thank you for taking the time to connect with us. We are delighted to present this proposal from <strong>Tripclap</strong> — India's dedicated platform for travel agents at <a href="https://agents.tripclap.com" style={{ color: "#1D9E75" }}>agents.tripclap.com</a>. Our platform provides verified leads, a powerful CRM, professional websites, and marketplace placements — everything a travel agency needs to grow.
        </p>

        {/* Products */}
        {lineItems.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 14, borderBottom: "2px solid #E1F5EE", paddingBottom: 8 }}>Products Offered</div>
            {lineItems.map((item, i) => (
              <div key={i} style={{ border: "1px solid #E5E7EB", borderRadius: 10, padding: 16, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1D9E75" }}>{item.product.name}</div>
                    <span style={{ fontSize: 10, padding: "2px 8px", background: "#E1F5EE", color: "#0F6E56", borderRadius: 20, fontWeight: 600 }}>{item.plan.name}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#111827" }}>{formatINR(item.final)}<span style={{ fontSize: 11, fontWeight: 400, color: "#9CA3AF" }}>/{item.plan.billing === "one-time" ? "setup" : "mo"}</span></div>
                </div>
                <ul style={{ margin: 0, padding: "0 0 0 16px", listStyle: "none", display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>
                  {item.plan.features.map((f, j) => <li key={j} style={{ fontSize: 11, color: "#6B7280" }}>✓ {f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Pricing table */}
        {lineItems.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginBottom: 12, borderBottom: "2px solid #E1F5EE", paddingBottom: 8 }}>Pricing Breakdown</div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#F9FAFB" }}>
                  {["Product","Plan","MRP","Discount","Your Price"].map(h => <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6B7280", border: "1px solid #E5E7EB" }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, i) => (
                  <tr key={i}>
                    <td style={{ padding: "9px 12px", border: "1px solid #E5E7EB", fontWeight: 500 }}>{item.product.name}</td>
                    <td style={{ padding: "9px 12px", border: "1px solid #E5E7EB" }}>{item.plan.name}</td>
                    <td style={{ padding: "9px 12px", border: "1px solid #E5E7EB", color: "#9CA3AF", textDecoration: "line-through" }}>{formatINR(item.mrp)}</td>
                    <td style={{ padding: "9px 12px", border: "1px solid #E5E7EB", color: "#D97706" }}>{item.disc + (item.freqD || 0)}%</td>
                    <td style={{ padding: "9px 12px", border: "1px solid #E5E7EB", fontWeight: 700, color: "#1D9E75" }}>{formatINR(item.final)}</td>
                  </tr>
                ))}
                <tr style={{ background: "#F9FAFB" }}>
                  <td colSpan={4} style={{ padding: "9px 12px", border: "1px solid #E5E7EB", fontWeight: 600 }}>Subtotal</td>
                  <td style={{ padding: "9px 12px", border: "1px solid #E5E7EB", fontWeight: 600 }}>{formatINR(subtotal)}</td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: "9px 12px", border: "1px solid #E5E7EB" }}>GST @ 18%</td>
                  <td style={{ padding: "9px 12px", border: "1px solid #E5E7EB" }}>{formatINR(gst)}</td>
                </tr>
                <tr style={{ background: "#1D9E75" }}>
                  <td colSpan={4} style={{ padding: "10px 12px", border: "1px solid #0F6E56", fontWeight: 700, color: "#fff", fontSize: 14 }}>TOTAL PAYABLE</td>
                  <td style={{ padding: "10px 12px", border: "1px solid #0F6E56", fontWeight: 800, color: "#fff", fontSize: 16 }}>{formatINR(total)}</td>
                </tr>
              </tbody>
            </table>
            <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 6 }}>Prices in INR. GST @ 18% applicable. Frequency: {frequency}.</div>
          </div>
        )}

        {/* Payment */}
        <div style={{ border: "2px solid #1D9E75", borderRadius: 10, padding: 20, marginBottom: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 10 }}>Bank Transfer</div>
            {[["Bank", "HDFC Bank"], ["Account No", "50100234567890"], ["IFSC", "HDFC0001234"], ["Type", "Current"], ["UPI", "tripclap@hdfcbank"]].map(([l,v]) => (
              <div key={l} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: "#9CA3AF", width: 80 }}>{l}</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: "#374151" }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {paymentLink
              ? <a href={paymentLink} style={{ display: "block", padding: "12px 20px", background: "#1D9E75", color: "#fff", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none", textAlign: "center" }}>PAY NOW — {formatINR(total)}</a>
              : <div style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center" }}>Contact your sales rep for a payment link</div>
            }
          </div>
        </div>

        {/* KYC */}
        <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, padding: 18, marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#92400E", marginBottom: 10 }}>Documents Required (KYC)</div>
          <ul style={{ margin: 0, padding: "0 0 0 16px", color: "#78350F", fontSize: 12 }}>
            {SETTINGS.defaults.kyc.map((d, i) => <li key={i} style={{ marginBottom: 4 }}>{d}</li>)}
          </ul>
          <div style={{ fontSize: 11, color: "#92400E", marginTop: 10 }}>Email KYC to <strong>onboarding@tripclap.com</strong> within 3 days of payment.</div>
        </div>

        {/* T&C */}
        <div style={{ fontSize: 11, color: "#9CA3AF", lineHeight: 1.7, marginBottom: 24 }}>
          <div style={{ fontWeight: 600, color: "#6B7280", marginBottom: 6 }}>Terms & Conditions</div>
          {SETTINGS.defaults.tnc.split("\n").map((t,i) => <div key={i}>{t}</div>)}
        </div>
      </div>

      {/* Accept / Reject CTA */}
      <AcceptRejectBar proposalId={proposalId} clientName={client.agency || "your agency"} total={total} />

      {/* Footer */}
      <div style={{ background: "#F9FAFB", borderTop: "1px solid #E5E7EB", padding: "20px 36px", textAlign: "center" }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#1D9E75", marginBottom: 6 }}>Tripclap</div>
        <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>Prepared by {CURRENT_REP.name} · {CURRENT_REP.phone} · {CURRENT_REP.email}</div>
        <div style={{ fontSize: 10, color: "#9CA3AF" }}>© 2025 ThinkNext Technologies Pvt Ltd · agents.tripclap.com</div>
      </div>
    </div>
  );
}

Object.assign(window, { NewProposal, ProposalEmailPreview, AcceptRejectBar });
