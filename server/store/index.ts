import MemoryStore from "./Memory";
import RedisStore from "./Redis";
import env from "../env"

let store;

const getStore = () => {
    // Load store on first demand
    if (store === undefined) {
        const storeBackend: string = env.STORE_BACKEND || "redis";
        const storeHost: string = env.STORE_HOST || env.REDIS_URL;

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
