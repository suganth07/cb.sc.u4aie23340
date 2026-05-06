import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

import type { Notification } from "../types/notification";

interface Props {
  notification: Notification;
  viewed?: boolean;
}

export default function NotificationCard({
  notification,
  viewed = false,
}: Props) {
  return (
    <Card
      sx={{
        marginBottom: 2,
        backgroundColor: viewed ? "#f5f5f5" : "#ffffff",
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {notification.Message}
        </Typography>

        <Chip
          label={notification.Type}
          sx={{ marginTop: 1 }}
        />

        <Typography
          variant="body2"
          sx={{ marginTop: 1 }}
        >
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}