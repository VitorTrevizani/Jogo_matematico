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

router.get("/perfil", (req, res)=> {
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
        Usuario.findOne({email: newUser.email}).lean().then((usuario) => {
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
        req.flash("success_msg", "deslogado com sucesso")
        res.redirect("/")
    })
})



router.post("/mudarNome/:id", (req, res) => {

    Usuario.findById(req.params.id).then((usuario) => {
        if(usuario){
            usuario.nome = req.body.nome
            usuario.save().then(() =>{
                req.flash("success_msg", "nome de usuário alterado para " + req.body.nome)
                res.redirect("/game/perfil")
            }).catch((err) => {
                req.flash("error_msg", "erro ao alterar nome de usuario")
                res.redirect("/game/perfil")
            })
        }else{
            req.flash("error_msg", "usuario nao econtrado")
        }
    }).catch((err) => {
        req.flash("error_msg", "erro interno")
        res.redirect("/game/perfil")
    })
})


router.get("/escolherAvatar", (req, res) => {
    res.render("avatar")
})

router.post("/mudarAvatar/:id", (req, res) => {

    Usuario.findById(req.params.id).then((usuario) => {
        if(usuario){
            usuario.avatarPath = req.body.caminho
            usuario.save().then(() => {
                req.flash("success", "Avatar alterado com sucesso")
                res.redirect("/game/perfil")
            }).catch((err) => {
                req.flash("error_msg", "erro ao tentar mudar o avatar")
                res.redirect("/game/perfil")
            })
        }else{
            req.flash("error_msg", "erro interno1")
            res.redirect("/game/escolherAvatar")
        }
    }).catch((err) => {
        req.flash("error_msg", "erro interno2")
        res.redirect("/game/escolherAvatar")
        
    })
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