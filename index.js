let express = require("express");
var bodyParser = require('body-parser')
let router = require("./common/router")
let app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(router)
app.listen("3000");