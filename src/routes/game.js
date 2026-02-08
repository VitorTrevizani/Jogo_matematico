const express = require("express")
const router  = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const {estaLogado} = require("../middlewares/estaLogado")
const {validar} = require("../middlewares/validacao")
const gameControllers = require("../controllers/gameController")
const validacao = require("../middlewares/validacao")


router.get("/home", estaLogado, (req, res) => {
    res.render("gameplay/home")
})

router.get("/perfil", estaLogado, (req, res)=> {
    res.render("perfil")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login/fazerlogin", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/game/home",
        failureRedirect: "/game/login",
        failureFlash: true
    })(req, res, next)
})


router.get("/logout", (req, res, next) => {
    req.logout(function(err){
        if(err){
            return next(err)
        }
        req.flash("success_msg", "deslogado com sucesso")
        res.redirect("/")
    })
})


router.get("/cadastro", (req, res) => {
    res.render("cadastro")
})



router.post("/cadastro/fazercadastro", validar, (req, res) => {
    gameControllers.cadastro(req, res)
})

   

router.post("/mudarNome/:id", (req, res) => {
        gameControllers.mudarNome(req, res)
})


router.get("/escolherAvatar", (req, res) => {
    res.render("avatar")
})

router.post("/mudarAvatar/:id", (req, res) => {
    gameControllers.mudarAvatar(req, res)
})


router.get("/rankings", (req, res) => {
    gameControllers.rankings(req, res)
})

//Um query param (parâmetro de consulta) é uma parte da URL usada para enviar informações extras para o servidor. Eles aparecem depois do ? na URL(na view). query params são usados para filtros, paginação, ordenação e opções extras sem precisar criar várias rotas diferentes. No Express, os query params ficam em req.query



module.exports = router