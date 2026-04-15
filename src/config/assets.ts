export const ASSETS = {
  banking: ["ITUB4", "BBDC4", "BBAS3", "B3SA3"],
  commodities: ["PETR4", "VALE3"],
  rates: ["DI1F28", "DI1F30", "DI1F32"]
};

export const ALL_ASSETS = [
  ...ASSETS.banking,
  ...ASSETS.commodities,
  ...ASSETS.rates
];