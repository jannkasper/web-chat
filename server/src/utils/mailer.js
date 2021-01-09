import env from "../env.js"
import mailgunjs from "mailgun-js";

const { MAILGUN_API_KEY, MAILGUN_DOMAIN } = env;

const apiKey = MAILGUN_API_KEY;
const domain = MAILGUN_DOMAIN;

let mailgun;

if (apiKey && domain) {
    mailgun = mailgunjs({ apiKey, domain });
}

export const sendMail = data  => {
    if (!mailgun) {
        return;
    }
    mailgun.messages().send(data, function (error, body) {});
};
