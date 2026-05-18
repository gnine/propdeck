
function Settings() {
  const [tab, setTab] = React.useState("company");
  const [form, setForm] = React.useState({ ...SETTINGS.company, ...SETTINGS.payment, ...SETTINGS.email, ...SETTINGS.defaults });
  const [saved, setSaved] = React.useState(false);

  const tabs = [
    { id: "company", label: "Company Info" },
    { id: "payment", label: "Payment Details" },
    { id: "email", label: "Email Config" },
    { id: "defaults", label: "Defaults" },
  ];

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const card = { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 28 };
  const inputStyle = { width: "100%", padding: "9px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, color: "#111827", outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box" };
  const labelStyle = { fontSize: 12, fontWeight: 500, color: "#374151", display: "block", marginBottom: 5 };
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const Field = ({ label, field, type = "text", span = 1, ...rest }) => (
    <div style={span === 2 ? { gridColumn: "1/-1" } : {}}>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle} type={type} value={form[field] || ""} onChange={e => set(field, e.target.value)} {...rest} />
    </div>
  );

  const renderCompany = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      {/* Logo */}
      <div style={{ gridColumn: "1/-1" }}>
        <label style={labelStyle}>Company Logo</label>
        <div style={{ border: "2px dashed #E5E7EB", borderRadius: 10, padding: 24, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 12, background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#1D9E75" }}>TC</div>
          <div>
            <button style={{ padding: "8px 16px", border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>Upload Logo</button>
            <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 6 }}>PNG or SVG, recommended 200×60px</div>
          </div>
        </div>
      </div>
      <Field label="Company Name" field="name" span={2} />
      <Field label="GST Number" field="gst" />
      <Field label="Website" field="website" />
      <div style={{ gridColumn: "1/-1" }}>
        <label style={labelStyle}>Registered Address</label>
        <textarea style={{ ...inputStyle, minHeight: 72, resize: "vertical" }} value={form.address || ""} onChange={e => set("address", e.target.value)} />
      </div>
      <Field label="Signatory Name" field="signatory" />
      <Field label="Designation" field="designation" />
    </div>
  );

  const renderPayment = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <Field label="Bank Name" field="bank" />
      <Field label="Account Type" field="type" />
      <Field label="Account Number" field="account" />
      <Field label="IFSC Code" field="ifsc" />
      <Field label="Account Holder Name" field="holder" span={2} />
      <Field label="UPI ID" field="upi" />
      <Field label="Razorpay API Key" field="razorpayKey" type="password" placeholder="rzp_live_…" />
    </div>
  );

  const renderEmail = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <Field label="SMTP Host" field="host" />
      <Field label="SMTP Port" field="port" />
      <Field label="SMTP Username" field="user" />
      <div>
        <label style={labelStyle}>SMTP Password</label>
        <input style={inputStyle} type="password" placeholder="••••••••" />
      </div>
      <Field label="From Name" field="fromName" />
      <Field label="From Email" field="fromEmail" />
      <div style={{ gridColumn: "1/-1" }}>
        <label style={labelStyle}>Default Subject Template</label>
        <input style={inputStyle} value={form.subject || ""} onChange={e => set("subject", e.target.value)} />
        <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 5 }}>Use {"{{id}}"} for proposal number, {"{{agency}}"} for agency name</div>
      </div>
      <div>
        <label style={labelStyle}>Default Proposal Validity (days)</label>
        <input style={inputStyle} type="number" value={form.validity || 7} onChange={e => set("validity", e.target.value)} />
      </div>
    </div>
  );

  const renderDefaults = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
      <div>
        <label style={labelStyle}>GST Rate (%)</label>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input style={{ ...inputStyle, width: 80 }} type="number" value={form.gst || 18} readOnly />
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>Fixed by law — not editable</span>
        </div>
      </div>
      <div>
        <label style={labelStyle}>Proposal Validity (days)</label>
        <input style={{ ...inputStyle, width: 80 }} type="number" value={form.validity || 7} onChange={e => set("validity", e.target.value)} />
      </div>
      <div style={{ gridColumn: "1/-1" }}>
        <label style={labelStyle}>KYC Documents Required</label>
        <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
          {(form.kyc || SETTINGS.defaults.kyc).map((doc, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: i < form.kyc?.length - 1 ? "1px solid #F3F4F6" : "none", background: "#fff" }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2}><path d="M4 6h16M4 12h16M4 18h7"/></svg>
              <span style={{ flex: 1, fontSize: 13, color: "#374151" }}>{doc}</span>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#DC2626", fontSize: 16, lineHeight: 1 }}>×</button>
            </div>
          ))}
          <div style={{ padding: "10px 14px", background: "#F9FAFB" }}>
            <button style={{ fontSize: 12, color: "#1D9E75", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>+ Add document</button>
          </div>
        </div>
      </div>
      <div style={{ gridColumn: "1/-1" }}>
        <label style={labelStyle}>Default Terms & Conditions</label>
        <textarea style={{ ...inputStyle, minHeight: 140, resize: "vertical", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}
          value={form.tnc || SETTINGS.defaults.tnc} onChange={e => set("tnc", e.target.value)} />
      </div>
      <div style={{ gridColumn: "1/-1" }}>
        <label style={labelStyle}>About Tripclap (shown in proposals)</label>
        <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
          defaultValue="Tripclap is India's leading platform dedicated to travel agents. Through agents.tripclap.com, we provide verified leads, a purpose-built CRM, professional websites, and marketplace exposure — everything you need to grow your travel business." />
      </div>
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 32, background: "#F4F6F5" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>Settings</div>
        <div style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>Manage company details, payment info, and email configuration</div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 6, width: "fit-content" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: "7px 18px", border: "none", borderRadius: 7, fontSize: 13, fontWeight: tab === t.id ? 600 : 400, cursor: "pointer", background: tab === t.id ? "#1D9E75" : "transparent", color: tab === t.id ? "#fff" : "#6B7280", transition: "all 0.15s" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 28, marginBottom: 20 }}>
        {tab === "company" && renderCompany()}
        {tab === "payment" && renderPayment()}
        {tab === "email" && renderEmail()}
        {tab === "defaults" && renderDefaults()}
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={save} style={{ padding: "10px 24px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save Changes</button>
        {saved && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#1D9E75", fontWeight: 500 }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 13l4 4L19 7"/></svg>
            Saved successfully
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Settings });
