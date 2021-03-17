const express = require("express");
const fs = require("fs");
const url = require("url");
const bodyParser = require("body-parser");
const app = express();
const pjson = require('./package.json');
const config = require("./config");

app.set('view engine', 'ejs')
app.set('views', "./template")
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("", (request, response) => {
  if (request.query.paste === undefined) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.render("index", {
      name: config.name,
      description: config.description,
      version: pjson.version
    });
    response.end();
  } else {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    var json = JSON.parse( fs.readFileSync("pastes.json", "utf-8"));
    if (request.query.paste in json) {
      response.write(json[request.query.paste]);
      response.end();
    } else {
      response.write("null");
      response.end();
    }
  }
});

app.post("", (request, response) => {
  var content = request.body.content;
  var id = makeid(10);
  var json = JSON.parse(fs.readFileSync("pastes.json", "utf-8"));
  json[id] = content;
  fs.writeFileSync("pastes.json", JSON.stringify(json));
  response.redirect("?paste="+id);
  response.end();
});

app.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});

function makeid(length) {
  var result           = "";
  var characters       = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}