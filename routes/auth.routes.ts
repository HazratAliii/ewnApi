import { Router } from "express";
import { signup, verifyEmail, signin } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup as any);
router.get("/verify/:token", verifyEmail as any);
router.post("/signin", signin as any);

export default router;
