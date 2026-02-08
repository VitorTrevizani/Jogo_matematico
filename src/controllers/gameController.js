const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const gameService = require("../services/gameService")

const gameController = {
    login : (req, res, next) => {
        passport.authenticate("local", {
            successRedirect: "/game/home",
            failureRedirect: "/game/login",
            failureFlash: true
        })(req, res, next)
    },

    cadastro : async (req, res) => {

           try{
               const erro = await gameService.criarUsuario(req.body)

                if(!erro){
                    req.flash("success_msg", "Usuário criado com sucesso")
                    res.redirect("/game/login")
                }else{
                    req.flash("error_msg", erro)
                    res.redirect("/game/cadastro")
                }
           }catch(error){
                req.flash("error_msg", "erro interno")
                res.redirect("/game/cadastro")
           }
    },

    logout : (req, res, next) => {

       try{
          req.logout()
          req.flash("success_msg", "deslogado com sucesso")
          res.redirect("/")
       }catch{
          return next(err)
       }
    },

    mudarNome : async (req, res) => {
        
        try{
           await gameService.mudarNome(req.body.nome, req.params.id)
           req.flash("success_msg", "nome de usuário alterado com sucesso")
           res.redirect("/game/perfil")
        }catch{
           req.flash("error_msg", "Erro ao alterado nome de usuário")
           res.redirect("/game/perfil")
        }
    },

    mudarAvatar : async (req, res) => {
        try{
            await gameService.mudarAvatar(req.body.caminho, req.params.id)
            req.flash("success_msg", "Avatar alterado com sucesso")
            res.redirect("/game/perfil")
        }catch{
            req.flash("error_msg", "Erro ao alterar avatar")
            res.redirect("/game/perfil")
        }
    },

    rankings: async (req, res) => {
       try{
            const usuarios = await gameService.rankings(req.query.dif)
            res.render("rankings", {usuarios : usuarios})
       }catch(erro){
           req.flash("error_msg", "erro interno")
           res.redirect("/game/home")
       }
    }

}


module.exports = gameController