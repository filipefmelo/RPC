var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("./destination/")).listen(1337);
console.log("Server listening on port 1337");
console.log("Game: http://127.0.0.1:1337/");
console.log("Coverage report: open manually /source/coverage/**/index.html");