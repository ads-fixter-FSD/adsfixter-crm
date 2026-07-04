export const newPaymentMethods = [
  { id: "dbbl", name: "Dutch Bangla Bank Ltd.", account: "Milon It Center #01, DBBL_MFC", holder: "Milon It Center LTD", number: "701710057843", branch: "Savar, Dhaka" },
  { id: "ebl", name: "Eastern Bank PLC", account: "AdsFixter EBL_EBP_ADF", holder: "AdsFixter", number: "410210000394", branch: "Jatrabari" },
  { id: "city", name: "The City Bank LLC", account: "MOW MART, CBL_MMT", holder: "MOW MART", number: "105209999001", branch: "Dhaka Avenue" },
  { id: "ucb", name: "UNITED COMMERCIAL BANK LTD", account: "ADF FIXTER UCB_ADF", holder: "ADS FIXTER", number: "79821341000032359", branch: "UCBL" },
  { id: "islamic", name: "Islami Bank PLC", account: "ADF_IBBL", holder: "Ads Fixter", number: "207846100400680", branch: "Jatrabari" },
  { id: "bkash", name: "Bkash Limited", account: "Personal Account", holder: "Rakabul Imtiaz", number: "01761437754", branch: "N/A" },
] as const;

export type NewPaymentMethod = (typeof newPaymentMethods)[number];
