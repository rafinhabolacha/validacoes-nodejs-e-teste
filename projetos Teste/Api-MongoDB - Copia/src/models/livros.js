const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var livro  = new Schema({
    categorias:{
        type:String,
        required:true,
    },
    titulo:{
        type:String,
        required:true,

    },
    descricao:{
        type:String,
        required:true,
    },
    quantidade:{
        type:Number,

    },
    ativo:{
        type:Boolean,
        default:true
    },
    registros:{
        type:Date,
        default:Date.now
    }
       
});

const Livro = mongoose.model('livros',livro);
module.exports = Livro;