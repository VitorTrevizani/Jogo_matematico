const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const passport = require("passport")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: "email"}, (email, senha, done) => {
        Usuario.findOne({email: email}).then((usuario) => {
            if(!usuario){
                return done(null, false, {message: "essa conta não existe"})
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {
                if(batem){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: "senha incorreta"})
                }

            })
        })
    })) 

    //diz ao passport para guardar apenas o id na sessão
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    //Define como recuperar o usuário a partir do que foi salvo na sessão
    passport.deserializeUser((id, done) => {
        Usuario.findById(id).then((usuario) => {
            if(usuario){
                done(null, usuario)
            }else{
                done(null, false)
            }   
        }).catch((err) => {
            done(err, null)
        })
    })

}