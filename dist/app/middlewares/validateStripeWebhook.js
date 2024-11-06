"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateStripeWebhook = (req, res, next) => {
    if (req.rawBody) {
        next();
    }
    else {
        let data = '';
        req.setEncoding('utf8');
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            req.rawBody = data;
            next();
        });
    }
};
exports.default = validateStripeWebhook;
