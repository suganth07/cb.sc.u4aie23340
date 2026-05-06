import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";

import API from "../api/notificationApi";

import NotificationCard from "../components/NotificationCard";

import { Notification } from "../types/notification";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [loading, setLoading] = useState(true);

  async function fetchNotifications() {
    try {
      const response = await API.get("/notifications");

      setNotifications(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
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