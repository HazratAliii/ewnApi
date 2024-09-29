import { Router } from "express";
import {
  signup,
  verifyEmail,
  signin,
  googleAuth,
} from "../controllers/auth.controller";
import passport from "passport";

const router = Router();

router.post("/signup", signup as any);
router.get("/verify/:token", verifyEmail as any);
router.post("/signin", signin as any);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  googleAuth as any
);

export default router;
