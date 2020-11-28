import { RedisClient } from "redis"

interface RedisStore {
    redisUrl: string,
    redis: RedisClient,
    hasSocketAdapter: boolean
}

interface MailData {
    from: string,
    to: string,
    subject: string,
    text: string
}
