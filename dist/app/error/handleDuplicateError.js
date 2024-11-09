"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const regex = /dup key: { ([\w]+):/;
    const matchPath = err.message.match(regex);
    const extractedPath = matchPath && matchPath[1];
    const userFriendlyMessage = extractedPath
        ? `${extractedPath.charAt(0).toUpperCase() + extractedPath.slice(1)} already exists`
        : 'Duplicate key error';
    const errorMessages = [
        {
            path: extractedPath,
            message: err.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: userFriendlyMessage,
        errorMessages,
    };
};
exports.default = handleDuplicateError;
