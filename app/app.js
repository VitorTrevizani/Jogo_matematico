const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { engine } = require("express-handlebars")
const mongoose = require("mongoose")
const path = require("path")
const game = require("./routes/game")

//configurações
    //public
    app.use(express.static(path.join(__dirname,"public"))) //transforma a pasta public em raiz publica, assim nao éprecisso especificar ela no html
   //body-parser
        //
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
       //
   //middleware
       //
   //rotas
   app.use("/game", game)
        



const PORT = 8081
app.listen(PORT, () => {
    console.log("sevidor rodando!")
})