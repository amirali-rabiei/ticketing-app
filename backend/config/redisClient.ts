import { createClient } from "redis"

export const redisClient = createClient({
    url: process.env.REDIS_URL
})
redisClient.on('error', (error) => console.error(error))

export const connectRedis = async () => {
    try {
        await redisClient.connect()
        console.log('Radis connected')
    } catch (error) {
        console.error(error)
    }
}