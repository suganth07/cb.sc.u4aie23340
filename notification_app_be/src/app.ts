import express from "express";
import cors from "cors";

import { Log } from "logging-middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  await Log({
    stack: "backend",
    level: "info",
    package: "route",
    message: "Root route accessed",
  });

  res.status(200).json({
    success: true,
    message: "Notification Backend Running",
  });
});

export default app;