import * as crypto from "crypto";

export function sanitize(str) {
    return str.replace(/[^A-Za-z0-9]/g, '-');
}

export function getRoomIdHash (id) {
    if (process.env.isDev) {
        return id;
    }

    if (process.env.ROOM_HASH_SECRET) {
        return crypto.createHmac('sha256', process.env.ROOM_HASH_SECRET).update(id).digest('hex');
    }

    return crypto.createHash('sha256').update(id).digest('hex');
};
