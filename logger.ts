import axios from "axios";
import dotenv from "dotenv";

import { LogPayload } from "./types";
import {
  VALID_LEVELS,
  VALID_PACKAGES,
  VALID_STACKS,
  LOG_API,
} from "./logging-middleware/src/constants";

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const TOKEN = process.env.TOKEN;

export async function Log(payload: LogPayload): Promise<void> {
  try {
    const { stack, level, package: packageName, message } = payload;

    // Validate stack
    if (!VALID_STACKS.includes(stack)) {
      throw new Error(`Invalid stack value: ${stack}`);
    }

    // Validate level
    if (!VALID_LEVELS.includes(level)) {
      throw new Error(`Invalid level value: ${level}`);
    }

    // Validate package
    if (!VALID_PACKAGES.includes(packageName)) {
      throw new Error(`Invalid package value: ${packageName}`);
    }

    // Validate message
    if (!message || message.trim().length === 0) {
      throw new Error("Message cannot be empty");
    }

    const response = await axios.post(
      `${BASE_URL}${LOG_API}`,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Log created:", response.data);
  } catch (error: any) {
    console.error("Logging failed:", error.message);
  }
}