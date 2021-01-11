import dotenv from 'dotenv'
dotenv.config()

import http from "http";
import https from "https";
import Koa from "koa";
import Io from "socket.io";
import KoaBody from "koa-body";
import cors from "kcors";
import Router from "koa-router";
import Socket from "./socket.js";
import { sendMail } from "./utils/mailer.js";
import koaStatic from "koa-static";
import koaSend from "koa-send";
import { pollForInactiveRooms } from "./inactive_rooms.js";
import { getRoomIdHash } from "./utils/index.js"
import getStore from "./store/index.js";

const environment = process.env.NODE_ENV || "development";

const app = new Koa();
const PORT = process.env.PORT || 3001;

const router = new Router();
const koaBody = KoaBody();

const appName = process.env.HEROKU_APP_NAME;
const isReviewApp = /-pr-/.test(appName);
const siteURL = process.env.SITE_URL;

const store = getStore();

if ((siteURL || environment === "development") && !isReviewApp) {
    app.use(
        cors({
            origin: environment === "development" ? "*" : siteURL,
            allowMethods: ["GET", "HEAD", "POST"],
            credentials: true,
        }),
    );
};

router.post("/abuse/:roomId", koaBody, async ctx => {
    let { roomId } = ctx.params;

    roomId = roomId.trim();

    if (process.env.ABUSE_FROM_EMAIL_ADDRESS && process.env.ABUSE_TO_EMAIL_ADDRESS) {
        const abuseForRoomExists = await store.get("abuse", roomId);
        if (!abuseForRoomExists) {
            sendMail({
                from: process.env.ABUSE_FROM_EMAIL_ADDRESS,
                to: process.env.ABUSE_TO_EMAIL_ADDRESS,
                subject: "Darkweb Abuse Notification",
                text: `Room ID: ${roomId}`,
            })
        }
    }

    await store.inc("abuse", roomId);

    ctx.status = 200;
})

app.use(router.routes());

const apiHost = process.env.API_HOST;
const cspDefaultSrc = `self"${apiHost ? `http://${apiHost} wss://${apiHost}` : ''}`;

function setStaticFileHeaders(ctx) {
    ctx.set({
        'strict-transport-security': 'max-age=31536000',
        'Content-Security-Policy': `default-src ${cspDefaultSrc} 'unsafe-inline'; img-src 'self' data:;`,
        'X-Frame-Options': 'deny',
        'X-XSS-Protection': '1; mode=block',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer',
        'Feature-Policy': "geolocation 'none'; vr 'none'; payment 'none'; microphone 'none'",
    })
};

const clientDistDirectory = process.env.CLIENT_DIST_DIRECTORY;
if (clientDistDirectory) {
    app.use(async (ctx, next) => {
        setStaticFileHeaders(ctx);
        await koaStatic(clientDistDirectory, {
            maxage: ctx.req.url === "/" ? 60 * 1000 : 365 * 24 * 60 * 60 * 1000 // one minute in ms for html doc, one year for css, js, etc
        })(ctx, next);
    });

    app.use(async ctx => {
        setStaticFileHeaders(ctx);
        await koaSend(ctx, "index.html", { root: clientDistDirectory });
    });
} else {
    app.use(async ctx => {
        ctx.body = { ready: true };
    });
}

const protocol = (process.env.PROTOCOL || "http") === "http" ? http : https;

const server = protocol.createServer(app.callback());
const io = Io(server, {
    pingIntervals: 2000,
    pingTimeout: 5000,
});

// Only use socket adapter if store has one
if (store.hasSocketAdapter) {
    io.adapter(store.getSocketAdapter())
}

export const getIO = () => io;

io.on("connection", async socket => {
    const roomId = socket.handshake.query.roomId;

    const roomIdHash = getRoomIdHash(roomId);

    let room = await store.get("rooms", roomIdHash);
    room = JSON.parse(room || "{}");

    new Socket({
        roomIdOriginal: roomId,
        roomId: roomIdHash,
        socket,
        room,
    });
});

const init = async () => {
    server.listen(PORT, () => {
        console.log(`Darkweb is online at port ${PORT}`);
    });

    pollForInactiveRooms();
};

init();

