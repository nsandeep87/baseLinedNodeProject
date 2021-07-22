let express = require("express");
let router = require("./common/router")
let app = express();
app.use(router)
app.listen("3000");