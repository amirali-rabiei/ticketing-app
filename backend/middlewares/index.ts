import cors from 'cors';
import cookieParser from "cookie-parser";
import { Application } from "express";
import express from "express";



export const useMiddleware = (app: Application) => {
    app.use(express.json())
    app.use(cookieParser())

    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:5173'],
        credentials: true
    }))
}