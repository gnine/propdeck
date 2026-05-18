
function Products() {
  const [products, setProducts] = React.useState(PRODUCTS);
  const [editing, setEditing] = React.useState(null);
  const [editForm, setEditForm] = React.useState({});
  const [expandedProduct, setExpandedProduct] = React.useState(1);
  const [showAddProduct, setShowAddProduct] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({ name: "", category: "", description: "", color: "#6B7280" });

  const categoryColors = { leads: "#F59E0B", crm: "#3B82F6", website: "#8B5CF6", ads: "#EF4444" };
  const categoryBgs = { leads: "#FFFBEB", crm: "#EFF6FF", website: "#F5F3FF", ads: "#FEF2F2" };
  const presetColors = ["#F59E0B","#3B82F6","#8B5CF6","#EF4444","#1D9E75","#EC4899","#F97316","#06B6D4"];

  const card = { background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10 };
  const inputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box" };
  const labelStyle = { fontSize: 12, fontWeight: 500, color: "#374151", display: "block", marginBottom: 5 };

  const openEdit = (plan, productId) => {
    setEditing({ productId, planId: plan.id });
    setEditForm({ ...plan, features: plan.features.join("\n") });
  };

  const openNewPlan = (productId) => {
    setEditing({ productId, planId: "new" });
    setEditForm({ name: "", description: "", mrp: "", billing: "monthly", features: "" });
  };

  const saveEdit = () => {
    const featuresArr = editForm.features.split("\n").map(f => f.trim()).filter(Boolean);
    setProducts(prev => prev.map(p => {
      if (p.id !== editing.productId) return p;
      if (editing.planId === "new") {
        const newPlan = { ...editForm, id: Date.now(), mrp: Number(editForm.mrp), features: featuresArr };
        return { ...p, plans: [...p.plans, newPlan] };
      }
      return { ...p, plans: p.plans.map(pl => pl.id === editing.planId ? { ...pl, ...editForm, mrp: Number(editForm.mrp), features: featuresArr } : pl) };
    }));
    setEditing(null);
  };

  const deletePlan = (productId, planId) => {
    setProducts(prev => prev.map(p => p.id !== productId ? p : { ...p, plans: p.plans.filter(pl => pl.id !== planId) }));
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 32, background: "#F4F6F5" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>Products & Plans</div>
          <div style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>Manage pricing catalog — changes apply to all new proposals</div>
        </div>
        <button onClick={() => { setNewProduct({ name: "", category: "", description: "", color: "#3B82F6" }); setShowAddProduct(true); }} style={{ padding: "9px 18px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Add Product</button>
      </div>

      {products.map(prod => {
        const isOpen = expandedProduct === prod.id;
        const color = categoryColors[prod.category] || prod.color || "#6B7280";
        const bg = categoryBgs[prod.category] || (prod.color ? prod.color + "22" : "#F3F4F6");
        return (
          <div key={prod.id} style={{ ...card, marginBottom: 16, overflow: "hidden" }}>
            {/* Product header */}
            <div onClick={() => setExpandedProduct(isOpen ? null : prod.id)} style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", background: isOpen ? "#FAFAFA" : "#fff", transition: "background 0.15s" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: color }}></div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{prod.name}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{prod.description}</div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#9CA3AF" }}>{prod.plans.length} plans</span>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2} style={{ transform: isOpen ? "rotate(180deg)" : "", transition: "transform 0.2s" }}><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>

            {/* Plans */}
            {isOpen && (
              <div style={{ borderTop: "1px solid #F3F4F6", padding: "16px 24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 14 }}>
                  {prod.plans.map(plan => (
                    <div key={plan.id} style={{ border: "1px solid #E5E7EB", borderRadius: 10, padding: 16, position: "relative" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{plan.name}</div>
                          <div style={{ fontSize: 11, color: "#6B7280" }}>{plan.description}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 16, fontWeight: 800, color: "#1D9E75" }}>{formatINR(plan.mrp)}</div>
                          <div style={{ fontSize: 10, color: "#9CA3AF" }}>/{plan.billing === "one-time" ? "setup" : "mo"}</div>
                        </div>
                      </div>
                      <ul style={{ margin: "0 0 12px", padding: "0 0 0 0", listStyle: "none" }}>
                        {plan.features.map((f, i) => (
                          <li key={i} style={{ fontSize: 11, color: "#6B7280", marginBottom: 3, display: "flex", gap: 6 }}>
                            <span style={{ color: "#1D9E75", fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                          </li>
                        ))}
                      </ul>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => openEdit(plan, prod.id)} style={{ flex: 1, padding: "5px 0", border: "1px solid #E5E7EB", borderRadius: 6, fontSize: 11, fontWeight: 500, cursor: "pointer", background: "#fff", color: "#374151" }}>Edit</button>
                        <button onClick={() => deletePlan(prod.id, plan.id)} style={{ padding: "5px 10px", border: "1px solid #FEE2E2", borderRadius: 6, fontSize: 11, cursor: "pointer", background: "#fff", color: "#DC2626" }}>✕</button>
                      </div>
                    </div>
                  ))}
                  {/* Add plan card */}
                  <div onClick={() => openNewPlan(prod.id)} style={{ border: "2px dashed #E5E7EB", borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", minHeight: 120, gap: 8, transition: "border-color 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#1D9E75"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#E5E7EB"}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth={2.5}><path d="M12 4v16m8-8H4"/></svg>
                    </div>
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>Add Plan</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Add Product Modal */}
      {showAddProduct && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 32, width: 500, boxShadow: "0 24px 56px rgba(0,0,0,0.18)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#111827" }}>Add New Product</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 3 }}>You can add plans to it after creation</div>
              </div>
              <button onClick={() => setShowAddProduct(false)} style={{ width: 32, height: 32, border: "1px solid #E5E7EB", borderRadius: 8, background: "#fff", cursor: "pointer", fontSize: 18, color: "#6B7280", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Product Name *</label>
                <input style={inputStyle} placeholder="e.g. Email Marketing" value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} onFocus={e => { e.target.style.borderColor = "#1D9E75"; e.target.style.boxShadow = "0 0 0 3px rgba(29,158,117,0.1)"; }} onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Description</label>
                <input style={inputStyle} placeholder="Short description shown on proposals" value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} onFocus={e => { e.target.style.borderColor = "#1D9E75"; e.target.style.boxShadow = "0 0 0 3px rgba(29,158,117,0.1)"; }} onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Category Key</label>
                <input style={inputStyle} placeholder="e.g. email (used internally)" value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value.toLowerCase().replace(/\s+/g, "_") }))} onFocus={e => { e.target.style.borderColor = "#1D9E75"; e.target.style.boxShadow = "0 0 0 3px rgba(29,158,117,0.1)"; }} onBlur={e => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Product Color</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {presetColors.map(c => (
                    <div key={c} onClick={() => setNewProduct(p => ({ ...p, color: c }))}
                      style={{ width: 28, height: 28, borderRadius: 8, background: c, cursor: "pointer", border: newProduct.color === c ? "3px solid #111827" : "3px solid transparent", transition: "border 0.1s" }} />
                  ))}
                </div>
              </div>
            </div>
            <div style={{ background: "#F9FAFB", borderRadius: 8, padding: "10px 14px", margin: "16px 0", fontSize: 12, color: "#6B7280", display: "flex", gap: 8, alignItems: "center" }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2}><circle cx={12} cy={12} r={10}/><path d="M12 16v-4M12 8h.01"/></svg>
              After saving, expand the product card to add pricing plans.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => {
                if (!newProduct.name) return;
                const id = Date.now();
                setProducts(prev => [...prev, { id, name: newProduct.name, category: newProduct.category || "custom", description: newProduct.description, color: newProduct.color, plans: [] }]);
                setExpandedProduct(id);
                setShowAddProduct(false);
              }} style={{ flex: 1, padding: "10px", background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Save Product
              </button>
              <button onClick={() => setShowAddProduct(false)} style={{ padding: "10px 20px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, cursor: "pointer", color: "#374151" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      {editing && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, width: 480, maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>{editing.planId === "new" ? "Add New Plan" : "Edit Plan"}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["name","Plan Name"],["description","Description (e.g. 5 users)"]].map(([k,l]) => (
                <div key={k} style={{ gridColumn: "1/-1" }}>
                  <label style={labelStyle}>{l}</label>
                  <input style={inputStyle} value={editForm[k] || ""} onChange={e => setEditForm(p => ({...p, [k]: e.target.value}))} />
                </div>
              ))}
              <div>
                <label style={labelStyle}>MRP (₹)</label>
                <input style={inputStyle} type="number" value={editForm.mrp || ""} onChange={e => setEditForm(p => ({...p, mrp: e.target.value}))} />
              </div>
              <div>
                <label style={labelStyle}>Billing Type</label>
                <select style={inputStyle} value={editForm.billing || "monthly"} onChange={e => setEditForm(p => ({...p, billing: e.target.value}))}>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annual">Annual</option>
                  <option value="one-time">One-time</option>
                </select>
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label style={labelStyle}>Features (one per line)</label>
                <textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} value={editForm.features || ""} onChange={e => setEditForm(p => ({...p, features: e.target.value}))} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={saveEdit} style={{ flex: 1, padding: 10, background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save Plan</button>
              <button onClick={() => setEditing(null)} style={{ padding: "10px 20px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, cursor: "pointer", background: "#fff" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Products });
