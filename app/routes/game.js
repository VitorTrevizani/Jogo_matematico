const express = require("express")
const router  = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const {estaLogado} = require("../helpers/estaLogado")

router.get("/home", estaLogado, (req, res) => {
    res.render("home")
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


router.get("/cadastro", (req, res) => {
    res.render("cadastro")
})




router.post("/cadastro/fazercadastro", (req, res) => {

    function extrairNome(email){
        const indice = email.indexOf("@")
        return email.slice(0, indice)
    }

    // validação: 

    let erros = []

    if(req.body.email == null || typeof req.body.email == "undefined" || req.body.password == null || typeof req.body.password == "undefined"){
        erros.push({texto:"campos vazios não são permitidos"})
    }


    if(req.body.password.length < 5 || req.body.password.length > 10 ){
        erros.push({texto:"A senha deve ter de 5 a 10 caracteres"})

    }
    
    
    if(erros.length > 0){
        res.render("cadastro", {erros: erros})
    }else{

        const newUser = {
            email: req.body.email,
            senha: req.body.password,
            nome: extrairNome(req.body.email)
        }

        //procura pra ver se já existe
        Usuario.findOne({email: newUser.email, senha: newUser.senha}).lean().then((usuario) => {
            if(usuario){
                req.flash("error_msg","Já existe um usuário com esse nome e senha cadastrados")
                res.redirect("/game/cadastro")
            }
            else{
            //adiciona no banco caso aonda não exista
                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(newUser.senha, salt, (erro, hash) => {
                        if(erro){
                            req.flash("error_msg", "houve um erro durante o salvamento do usuario")
                            res.redirect("/game/home")
                        }
                        newUser.senha = hash
                        new Usuario (newUser).save().then(() => {
                            req.flash("success_msg", "usuário cadastrado com sucesso")
                            res.redirect("/")
                        }).catch((err) => {
                            req.flash("error_msg", "Falha ao cadastrar usuário")
                            res.redirect("/game/cadastro")
                })
                    })
                })

                  
            }
           
        }).catch((err) => {
            req.flash("error_msg", "falha ao cadastrar usuário")
            res.redirect("/game/cadastro")
        })
    }

    
})

   

router.get("/logout", (req, res, next) => {
    req.logout(function(err){
        if(err){
            return next(err)
        }
        req.flash("sucess_msg", "deslogado com sucesso")
        res.redirect("/")
    })
})

module.exports = router