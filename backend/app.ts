import express, { Application, Request } from "express"
const app: Application = express()
import { SetupServer } from "./server/server"
import useRouter from "./routes"
import { useMiddleware } from "./middlewares"
import { connectRedis } from "./config/redisClient"
import { deleteCodeCorn } from "./corn/cornJobs"




deleteCodeCorn()

useMiddleware(app)
app.use('/', useRouter)

connectRedis()
SetupServer(app)