let express = require("express");
var bodyParser = require('body-parser')
let router = require("./common/router")
require('dotenv').config()
let app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(router)
app.listen(process.env.PORT || "3000");