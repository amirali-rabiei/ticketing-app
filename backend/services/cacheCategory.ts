import { redisClient } from "../config/redisClient";

export const getCategoryFromCache = async (category: string) => {
    try {

        const cached = await redisClient.get(`tickets:${category}`)
        return cached ? JSON.parse(cached) : null
    } catch (error) {
        console.log(error)
    }
}

export const storeCategoryInCache = async (category: string, data: any) => {
    try {

        return await redisClient.set(`tickets:${category}`, JSON.stringify(data), { EX: 9900 })

    } catch (error) {
        console.log(error)
    }
}