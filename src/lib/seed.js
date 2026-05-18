import { getAll, putOne } from "./db.js";
import { seedClients, seedProducts, seedProposals, seedRep, seedSettings } from "./seedData.js";

export async function seedDatabase() {
  const settings = await getAll("settings");
  if (settings.length > 0) return;

  await Promise.all([
    ...seedClients.map((client) => putOne("clients", client)),
    ...seedProducts.map((product) => putOne("products", product)),
    ...seedProposals.map((proposal) => putOne("proposals", proposal)),
    putOne("settings", { id: "default", ...seedSettings }),
    putOne("rep", seedRep),
  ]);
}
