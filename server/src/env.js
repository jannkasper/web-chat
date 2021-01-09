import envalid from "envalid";
const { cleanEnv, num, str } = envalid;

import path from 'path';
import dotenv from 'dotenv'
dotenv.config({path: path.resolve("../.env")})

const env = cleanEnv(process.env, {
    PORT: num({ default: 4000 }),
    SITE_NAME: str({ example: "web-chat" }),
    SITE_URL: str({ example: "web-chat.com" }),
    MAILGUN_API_KEY: str(),
    MAILGUN_DOMAIN: str(),
    ABUSE_TO_EMAIL_ADDRESS: str(),
    ABUSE_FROM_EMAIL_ADDRESS: str(),

    CLIENT_DIST_DIRECTORY: str(),
    ROOM_HASH_SECRET: str(),
    STORE_BACKEND: str(),
    STORE_HOST: str(),
});

export default env;


