import { createLogger, transports, format } from "winston";

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "app.log", level: "info" }),
        new transports.File({ filename: "error.log", level: "error" }),
    ],
});

export default logger;
