import env from "../env"
import Mailgun from "mailgun-js"
import {messages} from "mailgun-js"

const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = env;

const apiKey = MAILGUN_API_KEY;
const domain = MAILGUN_DOMAIN;

let mailgun: Mailgun;

if (apiKey && domain) {
    mailgun = require('mailgun-js')({ apiKey, domain });
}

export const send = (data: messages.SendData): void => {
    if (!mailgun) {
        return;
    }
    mailgun.messages().send(data, function (error, body) {});
};
