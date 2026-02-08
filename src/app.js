const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../.env") })
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { engine } = require("express-handlebars")
const mongoose = require("mongoose")
const game = require("./routes/game")
const gameplay = require("./routes/gameplay")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
require("./config/auth")(passport)





//configurações
    app.use(express.json())
    app.use(express.urlencoded({ extended: true })) // para forms HTML

    //public
    app.use(express.static(path.join(__dirname,"public"))) //transforma a pasta public em raiz publica, assim nao éprecisso especificar ela no html

   //mongoose
       const DB_CONNECT = process.env.DB_CONNECT
       mongoose.connect(DB_CONNECT).then(() => {
        console.log("Mongoose conectado!")
       }).catch((err) => {
        console.log("Falha ao se conectar com o mongoose: " + err)
       })

   //handlebars
    app.engine("handlebars", engine())
    app.set("view engine", "handlebars")
    app.set("views", path.join(__dirname, "views"))

   //session
    const SECRET = process.env.SECRET
    app.use(session({
        secret: SECRET,
        resave: false,
        saveUninitialized: false
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

   //middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        //a variavel abaixo armazena os dados do usuario logado. req.user é algo que o passport cria para armazenar dados do usuario logado
        res.locals.User = req.user || null
        next()
    })


   //rotas
   app.get("/", (req, res) => {
     res.render("index")
   })

   app.use("/game", game)
   app.use("/gameplay", gameplay)
        



const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log("sevidor rodando!")
})


