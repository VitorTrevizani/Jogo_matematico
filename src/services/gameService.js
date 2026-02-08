const mongoose = require("mongoose")
const Usuario = require("../models/Usuario")
const bcrypt = require("bcryptjs")
const passport = require("passport")


const gameService = {

   criarUsuario: async (body) => {
      //procura pra ver se já existe
      const usuario = await Usuario.findOne({email: body.email})
      if(usuario){
            return "Já existe um usuário com esse email"
      }
      else{
         try{

            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(body.password, salt) 
            
            await new Usuario ({
               email: body.email,
               senha: hash,
               nome: (body.email.split('@', 1)).join()
            }).save()   

         }catch(error){
               return "erro ao cadastrar usuário"
         }      
      }   
   }, 

   mudarNome : async (nome, id) => {
      const usuario = await Usuario.findById(id)
      if(usuario){
            usuario.nome = nome
            await usuario.save()
      }
   },

   mudarAvatar : async (caminho, id) => {
      const usuario = await Usuario.findById(id)
        if(usuario){
            usuario.avatarPath = caminho
            await usuario.save()
        }
   },

   rankings : async (dif) => {
      const dificuldade = dif || "recordeFacil" 
      const usuarios = await Usuario.find().sort({[dificuldade] : -1}).lean()
      return usuarios
   }   
}



module.exports = gameService