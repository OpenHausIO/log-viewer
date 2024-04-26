const { createReadStream } = require("fs");
const { createInterface } = require("readline");
const { EOL } = require("os");
const path = require("path");

const colors = require("colors/safe");
const dateFormat = require("dateformat");
const { WebSocket, createWebSocketStream } = require("ws");

const levels = require("./levels.js");


const {
    LOG_DATEFORMAT,
    LOG_LOCATION,
    LOG_FILTER_NAME,
    LOG_FILTER_LEVEL,
    WEBSOCKET_ENDPOINT
} = process.env = Object.assign({
    LOG_DATEFORMAT: "yyyy.mm.dd - HH:MM.ss.l",
    LOG_LOCATION: path.resolve(process.cwd(), "combined.log"),
    LOG_FILTER_NAME: "",
    LOG_FILTER_LEVEL: "",
    WEBSOCKET_ENDPOINT: ""
}, process.env);



function handleLine(line) {
    try {

        let { level, timestamp, name, message } = JSON.parse(line);

        if (LOG_FILTER_NAME !== name && LOG_FILTER_NAME !== "") {
            return;
        }

        if (LOG_FILTER_LEVEL !== level && LOG_FILTER_LEVEL !== "") {
            return;
        }

        let color = levels.colors[level];
        let colorize = colors[color];

        let header = [
            dateFormat(timestamp, LOG_DATEFORMAT),
            level,
            name
        ].map((msg) => {
            return `[${colorize(msg)}]`;
        }).join("");

        process.stdout.write(`${header} ${message}${EOL}`);

    } catch (err) {

        console.error("BAD_LINE", err, line);

    }
}


if (WEBSOCKET_ENDPOINT !== "") {

    let ws = new WebSocket(WEBSOCKET_ENDPOINT);

    ws.on("message", (msg) => {
        handleLine(msg.toString());
    });

    ws.once("error", () => {
        console.error(`Could not connect to ${ws.url}`);
        process.exit(2);
    });

    ws.once("open", () => {
        console.log(`Connected to ${ws.url}`);
    });

} else {

    const stream = createReadStream(LOG_LOCATION);

    const rl = createInterface({
        input: stream
    });

    rl.on("line", handleLine);

}