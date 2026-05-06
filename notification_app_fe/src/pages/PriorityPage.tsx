import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
} from "@mui/material";

import API from "../api/notificationApi";

import NotificationCard from "../components/NotificationCard";

import type { Notification } from "../types/notification";

export default function PriorityPage() {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [type, setType] = useState("");

  const [limit, setLimit] = useState(10);

  async function fetchPriorityNotifications() {
    try {
      const response = await API.get("/priorities");

      let data = response.data.data || [];

      if (type) {
        data = data.filter(
          (item: Notification) => item.Type === type
        );
      }
      data = data.slice(0, limit);

      setNotifications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPriorityNotifications();
  }, [type, limit]);

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

      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: 3 }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>
            Notification Type
          </InputLabel>

          <Select
            value={type}
            label="Notification Type"
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <MenuItem value="">
              All
            </MenuItem>

            <MenuItem value="Placement">
              Placement
            </MenuItem>

            <MenuItem value="Result">
              Result
            </MenuItem>

            <MenuItem value="Event">
              Event
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="number"
          label="Top N"
          value={limit}
          onChange={(e) =>
            setLimit(Number(e.target.value))
          }
        />
      </Stack>

      {notifications.map((notification) => (
        <NotificationCard
          key={notification.ID}
          notification={notification}
        />
      ))}
    </Container>
  );
}