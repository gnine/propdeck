import { useState } from "react";
import { Check, GripVertical, X } from "lucide-react";
import { putOne } from "../../lib/db.js";

const TABS = [
  { id: "company", label: "Company Info" },
  { id: "payment", label: "Payment Details" },
  { id: "email", label: "Email Config" },
  { id: "defaults", label: "Defaults" },
];

export function SettingsPage({ data, reload }) {
  const s = data.settings || {};

  const [tab, setTab] = useState("company");
  const [company, setCompany] = useState({ ...(s.company || {}) });
  const [payment, setPayment] = useState({ ...(s.payment || {}) });
  const [email, setEmail] = useState({ ...(s.email || {}) });
  const [defaults, setDefaults] = useState({
    ...(s.defaults || {}),
    kyc: [...(s.defaults?.kyc || [])],
    terms: [...(s.defaults?.terms || [])],
  });
  const [saved, setSaved] = useState(false);
  const [newKyc, setNewKyc] = useState("");

  const saveSettings = async () => {
    await putOne("settings", {
      id: s.id || "default",
      company,
      payment,
      email,
      defaults,
    });
    await reload();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const removeKyc = (index) => {
    setDefaults((prev) => ({ ...prev, kyc: prev.kyc.filter((_, i) => i !== index) }));
  };

  const addKyc = () => {
    const trimmed = newKyc.trim();
    if (!trimmed) return;
    setDefaults((prev) => ({ ...prev, kyc: [...prev.kyc, trimmed] }));
    setNewKyc("");
  };

  const handleKycKey = (e) => {
    if (e.key === "Enter") { e.preventDefault(); addKyc(); }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <div className="muted">Manage company details, payment info, and email configuration</div>
        </div>
      </div>

      <div className="settings-tabs">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="card form-card">
        {tab === "company" && <CompanyTab form={company} onChange={(f, v) => setCompany((p) => ({ ...p, [f]: v }))} />}
        {tab === "payment" && <PaymentTab form={payment} onChange={(f, v) => setPayment((p) => ({ ...p, [f]: v }))} />}
        {tab === "email" && <EmailTab form={email} onChange={(f, v) => setEmail((p) => ({ ...p, [f]: v }))} />}
        {tab === "defaults" && (
          <DefaultsTab
            form={defaults}
            onChange={(f, v) => setDefaults((p) => ({ ...p, [f]: v }))}
            newKyc={newKyc}
            setNewKyc={setNewKyc}
            onAddKyc={addKyc}
            onKycKey={handleKycKey}
            onRemoveKyc={removeKyc}
          />
        )}
      </div>

      <div className="settings-save-row">
        <button className="button primary" onClick={saveSettings}>Save Changes</button>
        {saved && (
          <span className="save-confirmation">
            <Check size={14} strokeWidth={2.5} /> Saved successfully
          </span>
        )}
      </div>
    </div>
  );
}

function Field({ label, value = "", onChange, type = "text", placeholder, readOnly, hint, span }) {
  return (
    <label className={span ? "span-2" : ""}>
      <span className="field-label">{label}</span>
      <input
        className="input"
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      />
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

function CompanyTab({ form, onChange }) {
  return (
    <div className="settings-grid">
      <div className="span-2">
        <span className="field-label">Company Logo</span>
        <div className="logo-upload-area">
          <div className="logo-preview">TC</div>
          <div>
            <button className="button" type="button">Upload Logo</button>
            <div className="field-hint" style={{ marginTop: 6 }}>PNG or SVG, recommended 200×60px</div>
          </div>
        </div>
      </div>
      <Field label="Company Name" value={form.name} onChange={(v) => onChange("name", v)} span />
      <Field label="Tagline" value={form.tagline} onChange={(v) => onChange("tagline", v)} span placeholder="e.g. Empowering Travel Agents Across India" />
      <Field label="GST Number" value={form.gst} onChange={(v) => onChange("gst", v)} />
      <Field label="Website" value={form.website} onChange={(v) => onChange("website", v)} />
      <label className="span-2">
        <span className="field-label">Registered Address</span>
        <textarea
          className="textarea"
          style={{ minHeight: 72, resize: "vertical" }}
          value={form.address || ""}
          onChange={(e) => onChange("address", e.target.value)}
        />
      </label>
      <Field label="Signatory Name" value={form.signatory} onChange={(v) => onChange("signatory", v)} />
      <Field label="Designation" value={form.designation} onChange={(v) => onChange("designation", v)} />
      <Field label="Contact Phone" value={form.phone} onChange={(v) => onChange("phone", v)} placeholder="e.g. 98100 55678" />
      <Field label="Contact Email" value={form.email} onChange={(v) => onChange("email", v)} placeholder="e.g. sales@yourcompany.com" />
      <div>
        <span className="field-label">Proposal Header Color</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
          <input
            type="color"
            value={form.brandColor || "#0f6e56"}
            onChange={(e) => onChange("brandColor", e.target.value)}
            style={{ width: 48, height: 36, border: "1px solid #e5e7eb", borderRadius: 6, padding: 2, cursor: "pointer", background: "none" }}
          />
          <input
            className="input"
            style={{ width: 110 }}
            value={form.brandColor || "#0f6e56"}
            placeholder="#0f6e56"
            onChange={(e) => onChange("brandColor", e.target.value)}
          />
          <span className="field-hint" style={{ margin: 0 }}>Used in proposal header &amp; totals bar</span>
        </div>
      </div>
      <label className="span-2">
        <span className="field-label">About (shown in proposals)</span>
        <textarea
          className="textarea"
          style={{ minHeight: 100, resize: "vertical" }}
          value={form.about || ""}
          onChange={(e) => onChange("about", e.target.value)}
        />
      </label>
    </div>
  );
}

function PaymentTab({ form, onChange }) {
  return (
    <div className="settings-grid">
      <Field label="Bank Name" value={form.bank} onChange={(v) => onChange("bank", v)} />
      <Field label="Account Type" value={form.type} onChange={(v) => onChange("type", v)} />
      <Field label="Account Number" value={form.account} onChange={(v) => onChange("account", v)} />
      <Field label="IFSC Code" value={form.ifsc} onChange={(v) => onChange("ifsc", v)} />
      <Field label="Account Holder Name" value={form.holder} onChange={(v) => onChange("holder", v)} span />
      <Field label="UPI ID" value={form.upi} onChange={(v) => onChange("upi", v)} />
      <Field label="Razorpay API Key" type="password" value={form.razorpayKey} onChange={(v) => onChange("razorpayKey", v)} placeholder="rzp_live_…" />
    </div>
  );
}

function EmailTab({ form, onChange }) {
  return (
    <div className="settings-grid">
      <Field label="SMTP Host" value={form.smtpHost} onChange={(v) => onChange("smtpHost", v)} />
      <Field label="SMTP Port" value={form.smtpPort} onChange={(v) => onChange("smtpPort", v)} />
      <Field label="SMTP Username" value={form.smtpUser} onChange={(v) => onChange("smtpUser", v)} />
      <label>
        <span className="field-label">SMTP Password</span>
        <input className="input" type="password" placeholder="••••••••" onChange={(e) => onChange("smtpPassword", e.target.value)} />
      </label>
      <Field label="From Name" value={form.fromName} onChange={(v) => onChange("fromName", v)} />
      <Field label="From Email" value={form.fromEmail} onChange={(v) => onChange("fromEmail", v)} />
      <label className="span-2">
        <span className="field-label">Default Subject Template</span>
        <input
          className="input"
          value={form.subjectTemplate || ""}
          onChange={(e) => onChange("subjectTemplate", e.target.value)}
        />
        <span className="field-hint">Use {"{{id}}"} for proposal number, {"{{agency}}"} for agency name</span>
      </label>
    </div>
  );
}

function DefaultsTab({ form, onChange, newKyc, setNewKyc, onAddKyc, onKycKey, onRemoveKyc }) {
  const termsText = (form.terms || []).join("\n");

  return (
    <div className="settings-grid">
      <div>
        <span className="field-label">GST Rate (%)</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input className="input" style={{ width: 80 }} type="number" value={form.gstRate ?? 18} readOnly />
          <span className="field-hint">Fixed by law — not editable</span>
        </div>
      </div>
      <div>
        <span className="field-label">Proposal Validity (days)</span>
        <input
          className="input"
          style={{ width: 80 }}
          type="number"
          value={form.validityDays ?? 7}
          onChange={(e) => onChange("validityDays", Number(e.target.value))}
        />
      </div>
      <div>
        <span className="field-label">Proposal ID Prefix</span>
        <input
          className="input"
          style={{ width: 140 }}
          value={form.proposalPrefix ?? "TC"}
          placeholder="e.g. TC, INV, PROP"
          onChange={(e) => onChange("proposalPrefix", e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ""))}
        />
        <span className="field-hint">Alphanumeric and - only. Format: PREFIX-YEAR-NUMBER</span>
      </div>
      <div>
        <span className="field-label">Starting Sequence Number</span>
        <input
          className="input"
          style={{ width: 140 }}
          type="number"
          min="1"
          value={form.proposalStartNumber ?? 1}
          onChange={(e) => onChange("proposalStartNumber", Math.max(1, Number(e.target.value)))}
        />
        <span className="field-hint">New proposals start from this number (auto-skips taken ones)</span>
      </div>

      <div className="span-2">
        <span className="field-label">KYC Documents Required</span>
        <div className="kyc-list">
          {(form.kyc || []).map((doc, i) => (
            <div className="kyc-item" key={i}>
              <GripVertical size={14} style={{ color: "#9ca3af", flexShrink: 0 }} />
              <span>{doc}</span>
              <button className="kyc-remove" onClick={() => onRemoveKyc(i)} aria-label="Remove">
                <X size={13} />
              </button>
            </div>
          ))}
          <div className="kyc-add-row">
            <input
              className="input"
              placeholder="Add a document requirement..."
              value={newKyc}
              onChange={(e) => setNewKyc(e.target.value)}
              onKeyDown={onKycKey}
            />
            <button className="button" onClick={onAddKyc}>Add</button>
          </div>
        </div>
      </div>

      <label className="span-2">
        <span className="field-label">Default Terms & Conditions</span>
        <textarea
          className="textarea"
          style={{ minHeight: 140, resize: "vertical", lineHeight: 1.7 }}
          value={termsText}
          placeholder={"Term 1\nTerm 2\nTerm 3"}
          onChange={(e) => onChange("terms", e.target.value.split("\n"))}
        />
        <span className="field-hint">One term per line. Numbered automatically in proposals.</span>
      </label>
    </div>
  );
}
