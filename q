[1mdiff --git a/app.js b/app.js[m
[1mindex 1ea2d4c..12ffbbc 100644[m
[1m--- a/app.js[m
[1m+++ b/app.js[m
[36m@@ -1,6 +1,6 @@[m
 "use strict";[m
 [m
[31m-const { app, express, enableWS, server } = require("./lib/servers");[m
[32m+[m[32mconst { app, express, enableWS, server } = require("./lib/server-config");[m
 const morgan = require("morgan");[m
 [m
 const config = require("./lib/config");[m
[36m@@ -32,13 +32,13 @@[m [mapp.get([m
   catchError(webhook.getPayloadHandler),[m
 );[m
 [m
[31m-// Catch all[m
[31m-// app.get("/*", (_, res) => {[m
[31m-//   res.sendFile(path.join(__dirname, "dist", "index.html"));[m
[31m-// });[m
[31m-[m
 enableWS();[m
 [m
[32m+[m[32m// Catch all[m
[32m+[m[32mapp.get("/*", (_, res) => {[m
[32m+[m[32m  res.sendFile(path.join(__dirname, "dist", "index.html"));[m
[32m+[m[32m});[m
[32m+[m
 // Catch-all error handler[m
 app.use(error.generalErrorHandler);[m
 [m
