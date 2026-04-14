import dotenv from "dotenv";
dotenv.config();


if(!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined")
}


if(!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be defined")
}

if(!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID must be defined")
}

if(!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET must be defined")
}


export const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
}