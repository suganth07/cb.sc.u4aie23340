import { Request, Response } from "express";
import axios from "axios";

import { Log } from "logging-middleware";

const BASE_URL = process.env.BASE_URL;
const TOKEN = process.env.TOKEN;

export async function getNotifications(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { page = 1, limit = 10, notification_type } = req.query;

    await Log({
      stack: "backend",
      level: "info",
      package: "controller",
      message: "Fetching notifications",
    });

    const response = await axios.get(
      `${BASE_URL}/notifications`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        params: {
          page,
          limit,
          notification_type,
        },
      }
    );

    await Log({
      stack: "backend",
      level: "info",
      package: "service",
      message: "Notifications fetched successfully",
    });

    res.status(200).json({
      success: true,
      count: response.data.notifications.length,
      data: response.data.notifications,
    });
  } catch (error: any) {
    await Log({
      stack: "backend",
      level: "error",
      package: "controller",
      message: `Notification fetch failed: ${error.message}`,
    });

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
}