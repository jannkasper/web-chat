import env from "./env";

import nextApp from "next";
import express from "express";

import getStore from "./store";

const port = env.PORT;
const app = nextApp({ dir:"./client", dev: env.isDev });
const handle = app.getRequestHandler();

const appName = env.HEROKU_APP_NAME;
const isReviewApp = /-pr-/.test(appName);
const siteURL = env.SITE_URL;

const store = getStore();


app.prepare().then(async() => {
    const server = express();

    server.get("*", (req, res) => res.status(200).send(`${port}`));

    // Handler everything else by Next.js
    server.get("*", (req, res) => handle(req, res));

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
})
