const express = require("express")
const router  = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const {estaLogado} = require("../helpers/estaLogado")


router.get("/escolherDificuldade", estaLogado, (req, res) => {
    res.render("gameplay/escolherDificuldade")
})


router.get("/jogar/:dificuldade", estaLogado, (req,res) => {
    res.render("gameplay/gameplay", {dificuldade: req.params.dificuldade})
})




router.post("/acertos", (req, res) => {

    const {userId, score, dificuldade} = req.body

    Usuario.findById(userId).then((usuario) => {

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

            usuario.save().then(() => {
                console.log("show!")
            }).catch((err) => {
                req.flash("error_msg", "erro interno")
                res.redirect("/game/home")
            })

        }else{
           req.flash("error_msg", "erro interno")
           res.redirect("/game/home")
        }

    }).catch((err) => {

        req.flash("error_msg", "falha no servidor")
        res.redirect("/game/home")

    })
})



module.exports = router