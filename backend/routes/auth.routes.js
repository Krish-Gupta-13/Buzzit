import express from "express";
import { getMe, signup, login, logout } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", protectRoute, getMe);

export default router;