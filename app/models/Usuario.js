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

mongoose.model("usuarios", UsuarioSchema)
