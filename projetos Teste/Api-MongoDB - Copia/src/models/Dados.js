const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var informacao  = new Schema({
    nome:{
        type:String,
       
    },
    telefone:{
        type:String,
       

    },
    email:{
        type:String,
      
    },
    cpf:{
        type:String,
        maxlength:11,
         
    },
    rg:{
        type:String,
        maxlength:9,
         
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

const Dado = mongoose.model('dados',informacao);
module.exports = Dado;