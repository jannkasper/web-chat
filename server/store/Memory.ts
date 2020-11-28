/**
 * Memory store more for testing purpose than production use.
 */
export class MemoryStore {
    public store: any;
    public hasSocketAdapter: boolean;

    constructor() {
        this.store = {};
        this.hasSocketAdapter = false;
    }

    async get(key: string, field: string) {
        if (this.store[key] === undefined || this.store[key][field] === undefined) {
            return null;
        }
        return this.store[key][field];
    }

    async getAll(key: "abuse" | "rooms") {
        if (this.store[key] === undefined) {
            return [];
        }

        return this.store[key];
    }

    async set(key: "abuse" | "rooms", field: string, value) {
        if (this.store[key] === undefined) {
            this.store[key] = {};
        }
        this.store[key][field] = value;
        return 1;
    }

    async del(key: "abuse" | "rooms", field: string) {
        if (this.store[key] === undefined || this.store[key][field] === undefined) {
            return 0;
        }
        delete this.store[key][field];
        return 1;
    }

    async inc(key: "abuse" | "rooms", field: string, inc: number = 1) {
        this.store[key][field] += inc;
        return this.store[key][field];
    }
}

export default MemoryStore;
