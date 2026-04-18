import { Router } from "express";
import { validateLoginUser, validateRegisterUser } from "../validators/auth.validator.js";
import { googleCallback, login, register, getMe } from "../controllers/auth.controller.js";
import passport from "passport";
import { config } from "../config/config.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";


const router = Router()


router.post("/register", validateRegisterUser, register)

router.post("/login", validateLoginUser, login)

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }))

router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: config.NODE_ENV === "development" ? "http://localhost:5173/login" : "/login" }),
    googleCallback,
)

/**
 * @route GET /api/auth/me
 * @description Get the authenticated user profile
 * @access Private
 */

router.get("/me", authenticateUser, getMe)



export default router