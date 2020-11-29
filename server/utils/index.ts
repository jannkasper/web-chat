import env from "../env";
import * as crypto from "crypto";

export function sanitize(str: string): string {
    return str.replace(/[^A-Za-z0-9]/g, '-');
}

export function getRoomIdHash (id) {
    if (env.isDev) {
        return id;
    }

    if (env.ROOM_HASH_SECRET) {
        return crypto.createHmac('sha256', env.ROOM_HASH_SECRET).update(id).digest('hex');
    }

    return crypto.createHash('sha256').update(id).digest('hex');
};
