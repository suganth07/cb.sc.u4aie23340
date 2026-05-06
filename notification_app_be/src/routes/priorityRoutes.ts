import express from "express";

import { getPriorityNotifications } from "../controllers/priorityController";

const router = express.Router();

router.get("/", getPriorityNotifications);

export default router;