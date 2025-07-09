import { prisma } from "../prismaClient";
import { Application } from "express";

export const SetupServer = (app: Application) => {
    prisma.$connect()
        .then(() => {
            console.log("connected to postgreSql via Prisma")
        })
        .catch((err: Error) => {
            console.error("failed to connect to database: ", err)
        })

    app.listen(4000, () => {
        console.log("Server is running")
    })
}