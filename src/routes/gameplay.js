const express = require("express")
const router  = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const {estaLogado} = require("../middlewares/estaLogado")
const gameplayControllers = require("../controllers/gameplayController")

router.get("/escolherDificuldade", estaLogado, (req, res) => {
    res.render("gameplay/escolherDificuldade")
})


router.get("/jogar/:dificuldade", estaLogado, (req,res) => {
    res.render("gameplay/gameplay", {dificuldade: req.params.dificuldade})
})


router.post("/acertos", estaLogado, (req, res) => {
    gameplayControllers.acertos(req, res)
})



module.exports = router