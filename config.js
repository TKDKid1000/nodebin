// DO NOT REMOVE THIS
var config = {};

// the hostname the nodebin server runs on. for example: 127.0.0.1, 0.0.0.0, localhost, example.com
config.hostname="localhost"
// the port that the nodebin server runs on
config.port=8080
// the name of the nodebin. usually just called "nodebin"
config.name="NodeBin"
// the description of the nodebin. just any text you want to display with the nodebin.
// use `text` for a multiline string.
// full html works here too.
config.description=`<p>Hello! Welcome to NodeBin.
NodeBin is the best pastebin.</p>`
// any reverse proxy subpath. if your app runs on localhost/nodebin use "/nodebin". if none (ie. localhost) use "/".
config.path="";

// DO NOT REMOVE THIS
module.exports = config;