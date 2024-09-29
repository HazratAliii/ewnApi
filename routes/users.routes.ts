import { Router } from "express";
import { userProfile } from "../controllers/users.controllers";
import { authenticateJWT } from "../middlewares/authenticatejwt";

const router = Router();

router.get("/profile", authenticateJWT as any, userProfile as any);

export default router;
