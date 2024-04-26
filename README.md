# OpenHaus log viewer util
Smale and handy utility to view logviels generated from the backend or connector.

```
node index.js | less -R
```

The tools looks for a logfile called `combined.log` in its **c**urrent **w**orking **d**irectory (cwd).

## Environment variables
|Name|Default|Description|
|-----|---|--|
|`LOG_DATEFORMAT`|`yyyy.mm.dd - HH:MM.ss.l`|Format to print the unix timestamp |
|`LOG_LOCATION`| `<cwd>/combined.log`|Path to logfile to view|
|`LOG_FILTER_NAME`||Logger name to view, e.g.: `system`, `http`, `plugins/abad0f8e-23f0-4c2e-aea3-aa5a17c037db`|
|`LOG_FILTER_LEVEL`||Log level to view, e.g.: `info`, `debug`, `trace`, `warn`|
|`WEBSOCKET_ENDPOINT`||WebSocket remote endpoint to connect. No local logfile needed, just connecto to your server|