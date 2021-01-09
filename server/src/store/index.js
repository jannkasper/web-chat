import MemoryStore from "./Memory.js";
import RedisStore from "./Redis.js";
import env from "../env.js"

let store;

const getStore = () => {
    // Load store on first demand
    if (store === undefined) {
        const storeBackend = env.STORE_BACKEND || "redis";
        const storeHost = env.STORE_HOST || env.REDIS_URL;

        switch (storeBackend) {
            case "memory":
                store = new MemoryStore();
                break;
            case "redis":
            default:
                store = new RedisStore(storeHost);
                break;
        }
    }
    return store;
}

export default getStore;
