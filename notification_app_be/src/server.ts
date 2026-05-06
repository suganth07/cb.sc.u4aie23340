import dotenv from "dotenv";
import app from "./app";

import { Log } from "logging-middleware";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    app.listen(PORT, async () => {
      await Log({
        stack: "backend",
        level: "info",
        package: "config",
        message: `Server started successfully on port ${PORT}`,
      });
    });
  } catch (error: any) {
    await Log({
      stack: "backend",
      level: "fatal",
      package: "config",
      message: `Server startup failed: ${error.message}`,
    });
  }
}

startServer();