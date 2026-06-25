export type ClientDashboardRow = {
  id: string;
  name: string;
  email: string;
  date: string;
  usdRate: string;
  balance: string;
  dueLimit: string;
  status: "Active" | "Pending" | "Suspended";
};

export const approvedClientsStorageKey = "adsfixter-approved-clients";

export function readApprovedClientsFromStorage() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawClients = window.localStorage.getItem(approvedClientsStorageKey);
    return rawClients ? (JSON.parse(rawClients) as ClientDashboardRow[]) : [];
  } catch {
    return [];
  }
}

export function writeApprovedClientToStorage(client: ClientDashboardRow) {
  const currentClients = readApprovedClientsFromStorage();
  const nextClients = [client, ...currentClients.filter((currentClient) => currentClient.email !== client.email)];
  window.localStorage.setItem(approvedClientsStorageKey, JSON.stringify(nextClients));
}
