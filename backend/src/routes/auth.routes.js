import { Router } from 'express'
import { validateRegisterUser,validateLoginUser } from '../validator/auth.validator.js'
import { register,login, googleCallback , getMe } from '../controller/auth.controller.js'
import passport from 'passport'
import { identifyUser } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/register',validateRegisterUser ,register)
router.post('/login',validateLoginUser,login)

router.get("/me",identifyUser,getMe)

router.get("/google",
    passport.authenticate("google", { scope: [ "profile", "email" ] }))

router.get("/google/callback",
    passport.authenticate("google",{ session : false }),googleCallback )
export default router