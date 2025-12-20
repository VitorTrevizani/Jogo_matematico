const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { engine } = require("express-handlebars")
const mongoose = require("mongoose")
const path = require("path")
const game = require("./routes/game")
const session = require("express-session")
const flash = require("connect-flash")

//configurações
    //public
    app.use(express.static(path.join(__dirname,"public"))) //transforma a pasta public em raiz publica, assim nao éprecisso especificar ela no html
   //body-parser
        app.use(bodyParser.urlencoded({extended:true}))  
        app.use(bodyParser.json())
   //mongoose
       mongoose.connect("mongodb://localhost:27017/mathApp").then(() => {
        console.log("Mongoose conectado!")
       }).catch((err) => {
        console.log("Falha ao se conectar com o mongoose: " + err)
       })
   //handlebars
    app.engine("handlebars", engine())
    app.set("view engine", "handlebars")

   //session
    app.use(session({
        secret: "math123vitor",
        resave: true,
        saveUninitialized: true
    }))

    //flash
    app.use(flash())

   //middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })
   //rotas
   app.use("/game", game)
        



const PORT = 8081
app.listen(PORT, () => {
    console.log("sevidor rodando!")
})