const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const gameplayService = require("../services/gameplayService")

const gameplayController = {
    acertos : async (req, res) => {
        try{
           await gameplayService.registrarAcertos(req.body)
        }catch{
           req.flash("error_msg", "erro interno")
           res.redirect("/game/home")
        }
    }
}

module.exports = gameplayController