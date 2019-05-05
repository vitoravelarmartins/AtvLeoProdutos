const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const methodOverride = require("method-override")
// const connectionMiddleware = require("./db/connection-middleware")

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(expressValidator())
// app.use(connectionMiddleware)

//adiciona as rotas para funções de contato
require('./routes/contatos')(app)
require('./routes/produtos')(app)

app.get("/", (req, res) => res.redirect("/produtos"))

module.exports = app