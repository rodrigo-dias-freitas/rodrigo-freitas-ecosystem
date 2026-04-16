import { fetchYahoo, AssetData } from "./yahoo.service";
import { ALL_ASSETS } from "../config/assets";

let cache: AssetData[] = [];

export async function updateData() {
  console.log("🔄 Atualizando dados...");

  const results = await Promise.all(
    ALL_ASSETS.map(symbol => fetchYahoo(symbol))
  );

  cache = results.filter((r): r is AssetData => r !== null);

  console.log("✅ Dados atualizados:", cache.length);
}

export function getData(): AssetData[] {
  return cache;
}