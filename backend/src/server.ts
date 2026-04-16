import express from "express";
import cors from "cors";
import { getData, updateData } from "./services/data.service";
import { startScheduler } from "./cron/scheduler";

const app = express();
app.use(cors());

const PORT = 3000;

// endpoint principal
app.get("/api/assets", (req, res) => {
  res.json(getData());
});

// endpoint manual (opcional)
app.get("/api/update", async (req, res) => {
  await updateData();
  res.json({ message: "Atualizado manualmente" });
});

app.listen(PORT, async () => {
  console.log(`🚀 Server rodando em http://localhost:${PORT}`);

  // primeira carga
  await updateData();

  // inicia scheduler
  startScheduler();
});