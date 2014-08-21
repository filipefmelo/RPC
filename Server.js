var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("destination")).listen(1337);
console.log("Server listening on port 1337");
console.log("Open your web browser and navigate here: http://127.0.0.1:1337");