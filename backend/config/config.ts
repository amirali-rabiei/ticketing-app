import dotenv from "dotenv"
dotenv.config()

if (!process.env.JWT_SECRET) {
    throw new Error("missing enviroment variable")
}

export const JWT_SECRET = process.env.JWT_SECRET