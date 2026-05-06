import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

import type { Notification } from "../types/notification";

interface Props {
  notification: Notification;
}

const NotificationCard = ({ notification }: Props) => {
  return (
    <Card
      sx={{
        marginBottom: 2,
        backgroundColor: "#1e1e2f",
        color: "white",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h6">
            {notification.Message}
          </Typography>

          <Chip
            label={notification.Type}
            color={
              notification.Type === "Placement"
                ? "success"
                : notification.Type === "Event"
                ? "primary"
                : "secondary"
            }
          />
        </Stack>

        <Typography variant="body2">
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;