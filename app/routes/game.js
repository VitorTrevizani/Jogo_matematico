const express = require("express")
const router  = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")

router.get("/", (req, res) => {
    res.render("home")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login/fazerlogin", (req, res) => {
    Usuario.findOne({nome: req.body.name, senha: req.body.password}).lean().then((usuario) => {
        if(!usuario){
            req.flash("error_msg", "usuário não encontrado")
            res.redirect("/game/login")
        }
        else{
            req.flash("success_msg", "Usuário logado com sucesso")
            res.redirect("/game")
        }
        
    }).catch((err) => {
        req.flash("error_msg", "Falha ao fazer login")
        res.redirect("/game/login")
    })
})

router.get("/cadastro", (req, res) => {
    res.render("cadastro")
})




router.post("/cadastro/fazercadastro", (req, res) => {

    // validação: 

    let erros = []

    if(req.body.name == null || typeof req.body.name == "undefined" || req.body.password == null || typeof req.body.password == "undefined"){
        erros.push({texto:"campos vazios não são permitidos"})
    }

    if(req.body.name.length < 5 || req.body.name.length > 15){
        erros.push({texto:"O nome deve ter 5 a 15 caracteres"})
    }

    if(req.body.password.length < 5 || req.body.password.length > 10 ){
        erros.push({texto:"A senha deve ter de 5 a 10 caracteres"})

    }
    
       
    if(erros.length > 0){
        res.render("cadastro", {erros: erros})
    }else{

        const newUser = {
            nome: req.body.name,
            senha: req.body.password
        }

        //procura pra ver se já existe
        Usuario.findOne({nome: newUser.nome, senha: newUser.senha}).lean().then((usuario) => {
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
                            res.redirect("/game")
                        }
                        newUser.senha = hash
                        new Usuario (newUser).save().then(() => {
                            req.flash("success_msg", "usuário cadastrado com sucesso")
                            res.redirect("/game")
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

   

module.exports = router