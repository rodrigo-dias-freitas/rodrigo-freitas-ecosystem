import axios from "axios";

export interface AssetData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  updatedAt: string;
}

export async function fetchYahoo(symbol: string): Promise<AssetData | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.SA`;

    const response = await axios.get(url);

    const meta = response.data.chart.result[0].meta;

    const price = meta.regularMarketPrice;
    const previous = meta.chartPreviousClose;

    const change = price - previous;
    const changePercent = (change / previous) * 100;

    return {
      symbol,
      price,
      change,
      changePercent,
      updatedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error(`Erro ao buscar ${symbol}`, error);
    return null;
  }
}