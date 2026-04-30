import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from "cors"
import authRouter from './routes/auth.routes.js'
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import passport from 'passport'
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import { config } from './config/config.js'
import { fileURLToPath } from 'url';
import path from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())
app.use(cors({
    origin: [
    'http://localhost:5173',                   
  ],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID:config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL:"/api/auth/google/callback"
},(_,__,profile,done)=>{
    return done(null,profile)
}))

app.use('/api/auth',authRouter)
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)
app.use("*name",(req,res)=>{
res.sendFile(path.join(__dirname, "..", "public", "index.html"));
})

export default app 
