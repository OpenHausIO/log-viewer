const { createReadStream } = require("fs");
const { createInterface } = require("readline");
const { EOL } = require("os");
const path = require("path");

const colors = require("colors/safe");
const dateFormat = require("dateformat");

const levels = require("./levels.js");


const {
    LOG_DATEFORMAT,
    LOG_LOCATION,
    LOG_FILTER_NAME,
    LOG_FILTER_LEVEL
} = process.env = Object.assign({
    LOG_DATEFORMAT: "yyyy.mm.dd - HH:MM.ss.l",
    LOG_LOCATION: path.resolve(process.cwd(), "combined.log"),
    LOG_FILTER_NAME: "",
    LOG_FILTER_LEVEL: ""
}, process.env);


const stream = createReadStream(LOG_LOCATION);


const rl = createInterface({
    input: stream
});


rl.on("line", (line) => {
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

        process.stdout.write(`${header} - ${message}${EOL}`);

    } catch (err) {

        console.error(err);

    }
});