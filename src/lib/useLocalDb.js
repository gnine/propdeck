import { useCallback, useEffect, useState } from "react";
import { getAll } from "./db.js";

const emptyState = {
  clients: [],
  products: [],
  proposals: [],
  settings: null,
  rep: null,
};

export function useLocalDb() {
  const [state, setState] = useState(emptyState);
  const [ready, setReady] = useState(false);

  const reload = useCallback(async () => {
    const [clients, products, proposals, settingsRows, reps] = await Promise.all([
      getAll("clients"),
      getAll("products"),
      getAll("proposals"),
      getAll("settings"),
      getAll("rep"),
    ]);
    setState({
      clients,
      products,
      proposals,
      settings: settingsRows[0] || null,
      rep: reps[0] || null,
    });
    setReady(true);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { state, ready, reload };
}
