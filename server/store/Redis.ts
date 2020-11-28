import Redis from 'redis';
import RedisClient from "redis";
import bluebird from 'bluebird';
import socketRedis from 'socket.io-redis';

/**
 * Redis store.
 */
export class RedisStore {
    public redisUrl: string;
    public redis: RedisClient;
    public hasSocketAdapter: boolean;

    constructor(redisUrl: string) {
        bluebird.promisifyAll(Redis.RedisClient.prototype);
        bluebird.promisifyAll(Redis.Multi.prototype);
        this.redisUrl = redisUrl;
        this.redis = Redis.createClient(redisUrl);
        this.hasSocketAdapter = true;
    }

    get(key: "abuse" | "rooms", field: string) {
        return this.redis.hgetAsync(key, field);
    }

    getAll(key: "abuse" | "rooms") {
        return this.redis.hgetallAsync(key);
    }

    set(key: "abuse" | "rooms", field: string, value) {
        return this.redis.hsetAsync(key, field, value);
    }

    del(key: "abuse" | "rooms", field): string {
        return this.redis.hdelAsync(key, field);
    }

    inc(key: "abuse" | "rooms", field: string, inc: number = 1) {
        return this.redis.incrbyAsync(key, field, inc);
    }

    getSocketAdapter() {
        return socketRedis(this.redisUrl);
    }
}

export default RedisStore
