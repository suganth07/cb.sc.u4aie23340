import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import NotificationsPage from "./pages/NotificationsPage";
import PriorityPage from "./pages/PriorityPage";

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Notification System
          </Typography>

          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Notifications
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/priority"
          >
            Priority
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route
          path="/"
          element={<NotificationsPage />}
        />

        <Route
          path="/priority"
          element={<PriorityPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;