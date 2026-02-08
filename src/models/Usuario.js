const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UsuarioSchema = new Schema({

    email: {
        type: String,
        require: true
    },

    nome : {
        type: String,
        require: true,
    },

    senha : {
        type: String,
        require: true
    },

    avatarPath: {
        type: String ,
        default: null
    },

    recordeFacil : {
        type: Number,
        default: 0
    },

    recordeMedio : {
        type: Number,
        default: 0
    },

    recordeDificil : {
        type: Number,
        default: 0
    },

    recordeHard : {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("usuarios", UsuarioSchema)
