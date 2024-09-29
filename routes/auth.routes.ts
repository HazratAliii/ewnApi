import { Router } from "express";
import {
  signup,
  verifyEmail,
  signin,
  googleAuth,
  logout,
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
router.post("/logout", logout as any);

export default router;
