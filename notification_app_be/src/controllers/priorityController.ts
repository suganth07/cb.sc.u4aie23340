import { Request, Response } from "express";
import axios from "axios";

import { Log } from "logging-middleware";

import {
  getTopNotifications,
  Notification,
} from "../services/priorityService";

const BASE_URL = process.env.BASE_URL;
const TOKEN = process.env.TOKEN;

export async function getPriorityNotifications(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const limit = Number(req.query.limit) || 10;

    await Log({
      stack: "backend",
      level: "info",
      package: "controller",
      message: "Fetching priority notifications",
    });

    const response = await axios.get(
      `${BASE_URL}/notifications`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const notifications: Notification[] =
      response.data.notifications;

    const topNotifications = getTopNotifications(
      notifications,
      limit
    );

    await Log({
      stack: "backend",
      level: "info",
      package: "service",
      message: "Priority notifications generated",
    });

    res.status(200).json({
      success: true,
      count: topNotifications.length,
      data: topNotifications,
    });
  } catch (error: any) {
    await Log({
      stack: "backend",
      level: "error",
      package: "controller",
      message: `Priority notification failed: ${error.message}`,
    });

    res.status(500).json({
      success: false,
      message: "Failed to fetch priority notifications",
    });
  }
}