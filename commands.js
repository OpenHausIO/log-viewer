
// 0x0a = enter
// https://stackoverflow.com/questions/50430908/listen-for-command-ctrl-l-signal-in-terminal
const BUFFER_STRG_L = Buffer.from([0x0c, 0x0a]);
const BUFFER_STR_CLS = Buffer.from([0x63, 0x6c, 0x73, 0x0a]);


module.exports = {
    BUFFER_STRG_L,
    BUFFER_STR_CLS
};