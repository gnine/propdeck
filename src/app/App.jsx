import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "../components/Sidebar.jsx";
import { TopBar } from "../components/TopBar.jsx";
import { DashboardPage } from "../features/dashboard/DashboardPage.jsx";
import { ProposalsPage } from "../features/proposals/ProposalsPage.jsx";
import { ProposalBuilderPage } from "../features/proposals/ProposalBuilderPage.jsx";
import { ClientsPage } from "../features/clients/ClientsPage.jsx";
import { ProductsPage } from "../features/products/ProductsPage.jsx";
import { SettingsPage } from "../features/settings/SettingsPage.jsx";
import { SearchDialog } from "../components/SearchDialog.jsx";
import { seedDatabase } from "../lib/seed.js";
import { useLocalDb } from "../lib/useLocalDb.js";

const screens = {
  dashboard: "Dashboard",
  "new-proposal": "New Proposal",
  proposals: "All Proposals",
  clients: "Clients",
  products: "Products & Plans",
  settings: "Settings",
};

export function App() {
  const [screen, setScreen] = useState("dashboard");
  const [proposalClientId, setProposalClientId] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { state, ready, reload } = useLocalDb();

  useEffect(() => {
    seedDatabase().then(reload);
  }, [reload]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const selectedClient = useMemo(
    () => state.clients.find((client) => client.id === proposalClientId) || null,
    [proposalClientId, state.clients],
  );

  const openNewProposal = (clientId = null) => {
    setProposalClientId(clientId);
    setScreen("new-proposal");
  };

  const pageProps = { data: state, reload, setScreen, openNewProposal };

  return (
    <div className="app-shell">
      <Sidebar currentScreen={screen} onNavigate={setScreen} onNewProposal={() => openNewProposal()} rep={state.rep} settings={state.settings} />
      <main className="workspace">
        <TopBar title={screens[screen]} onSearch={() => setSearchOpen(true)} rep={state.rep} settings={state.settings} />
        <section className="workspace-content">
          {!ready && <div className="loading-state">Preparing TripDeck...</div>}
          {ready && screen === "dashboard" && <DashboardPage {...pageProps} />}
          {ready && screen === "new-proposal" && (
            <ProposalBuilderPage {...pageProps} initialClient={selectedClient} />
          )}
          {ready && screen === "proposals" && <ProposalsPage {...pageProps} />}
          {ready && screen === "clients" && <ClientsPage {...pageProps} />}
          {ready && screen === "products" && <ProductsPage {...pageProps} />}
          {ready && screen === "settings" && <SettingsPage {...pageProps} />}
        </section>
      </main>
      {searchOpen && (
        <SearchDialog
          data={state}
          onClose={() => setSearchOpen(false)}
          onNavigate={(nextScreen) => {
            setScreen(nextScreen);
            setSearchOpen(false);
          }}
        />
      )}
    </div>
  );
}
