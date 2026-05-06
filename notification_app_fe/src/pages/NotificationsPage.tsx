import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

import API from "../api/notificationApi";

import NotificationCard from "../components/NotificationCard";

import type { Notification } from "../types/notification";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  async function fetchNotifications() {
    try {
      const response = await API.get("/notifications");

      console.log(response.data);

      setNotifications(response.data.notifications || []);
    } catch (err) {
      console.error(err);

      setError("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>

      {notifications.length === 0 ? (
        <Typography>No notifications found</Typography>
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.ID}
            notification={notification}
          />
        ))
      )}
    </Container>
  );
}