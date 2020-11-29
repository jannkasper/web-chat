import env from "./env";

import * as http from 'http';
import * as https from 'https';
// import Koa from 'koa';
import express from 'express'
import Io from 'socket.io';
// import KoaBody from 'koa-body';
// import cors from 'kcors';
// import Router from 'koa-router';
// import Socket from './socket';
// import mailer from './utils/mailer';
// import koaStatic from 'koa-static';
// import koaSend from 'koa-send';

import { getRoomIdHash } from "./utils"
import getStore from "./store";


const app = new express();
const PORT = env.PORT || 3001;

// const appName = env.HEROKU_APP_NAME;
// const isReviewApp = /-pr-/.test(appName);
// const siteURL = env.SITE_URL;

const store = getStore();

const protocol = (env.PROTOCOL || 'http') === 'http' ? http : https;

const server = protocol.createServer(app);
const io = Io(server, {
    pingInterval: 20000,
    pingTimeout: 5000,
});

// Only use socket adapter if store has one
if (store.hasSocketAdapter) {
    io.adapter(store.getSocketAdapter());
}

export const getIO = () => io;

io.on('connection', async socket => {
    console.log('a user connected');

    // const roomId = socket.handshake.query.roomId;

    // const roomIdHash = getRoomIdHash(roomId);
    //
    // let room = await store.get('rooms', roomIdHash);
    // room = JSON.parse(room || '{}');

    // new Socket({
    //     roomIdOriginal: roomId,
    //     roomId: roomIdHash,
    //     socket,
    //     room,
    // });
});

// Handler everything else by Next.js
app.get("*", (req, res) => res.sendFile(__dirname + '/index.html'));

const init = async () => {
    server.listen(PORT, () => {
        console.log(`Web-chat is online at port ${PORT}`);
    });

    // pollForInactiveRooms();
};

init();
