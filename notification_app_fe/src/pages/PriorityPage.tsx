import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

import API from "../api/notificationApi";

import NotificationCard from "../components/NotificationCard";

import type { Notification } from "../types/notification";

export default function PriorityPage() {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [loading, setLoading] = useState(true);

  async function fetchPriorityNotifications() {
    try {
      const response = await API.get("/priorities");

      setNotifications(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPriorityNotifications();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Priority Notifications
      </Typography>

      {notifications.map((notification) => (
        <NotificationCard
          key={notification.ID}
          notification={notification}
        />
      ))}
    </Container>
  );
}