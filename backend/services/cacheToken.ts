import { redisClient } from "../config/redisClient";

export const getTokenFromCache = async (userEmail: string) => {
    try {

        return await redisClient.get(userEmail)


    } catch (error) {
        console.error(error)
    }
}

export const storeTokenInCache = async (userEmail: string, token: string) => {
    try {

        return await redisClient.set(userEmail, token, { EX: 9900 })

    } catch (error) {
        console.error(error)
    }
}