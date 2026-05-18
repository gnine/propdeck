import { Boxes, FileText, Home, Plus, Settings, Users } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "new-proposal", label: "New Proposal", icon: Plus, cta: true },
  { id: "proposals", label: "All Proposals", icon: FileText },
  { id: "clients", label: "Clients", icon: Users },
  { id: "products", label: "Products & Plans", icon: Boxes },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ currentScreen, onNavigate, onNewProposal, rep, settings }) {
  const displayName = settings?.company?.signatory || rep?.name || "—";
  const displayRole = settings?.company?.designation || rep?.role || "Sales Rep";
  const initials = displayName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="brand">Propdeck</div>
        <div className="brand-subtitle">Proposal Studio</div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentScreen === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-item ${active ? "active" : ""} ${item.cta ? "cta" : ""}`}
              onClick={() => (item.cta ? onNewProposal() : onNavigate(item.id))}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-user">
        <div className="avatar">{initials}</div>
        <div>
          <div className="user-name">{displayName}</div>
          <div className="user-role">{displayRole}</div>
        </div>
      </div>
    </aside>
  );
}
