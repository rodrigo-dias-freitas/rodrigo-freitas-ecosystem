import cron from "node-cron";
import { updateData } from "../services/data.service";

export function startScheduler() {
  cron.schedule("0 9,10,12,13,15,16 * * 1-5", async () => {
    console.log("⏱️ Rodando scheduler...");
    await updateData();
  });
}