"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.signup);
router.get("/verify/:token", auth_controller_1.verifyEmail);
router.post("/signin", auth_controller_1.signin);
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/signin" }), auth_controller_1.googleAuth);
router.post("/logout", auth_controller_1.logout);
exports.default = router;
