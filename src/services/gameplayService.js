const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

const gameplayService = {
    registrarAcertos : async (body) => {

        const {userId, score, dificuldade} = body

        const usuario = await Usuario.findById(userId)

        if(usuario){

            if(dificuldade == "facil"){ 
                if(score > usuario.recordeFacil) {usuario.recordeFacil = score}
            }
            else if(dificuldade == "medio"){
                if(score > usuario.recordeMedio) {usuario.recordeMedio = score} 
            }
            else if(dificuldade == "dificil"){
                if(score > usuario.recordeDificil) {usuario.recordeDificil = score}
            }
            else if(dificuldade == "hard"){
                if(score > usuario.recordeHard) {usuario.recordeHard = score}
            }

            usuario.save()

        }
    }   
}

module.exports = gameplayService