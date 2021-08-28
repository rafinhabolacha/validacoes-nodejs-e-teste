const Sequelize =  require('sequelize');
const db = require('./db');


const Login =db.define('Logins',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    Name:{
        type:Sequelize.STRING,
        allowNull:false,

    },
    email:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    password:{
        type:Sequelize.TEXT,
        allowNull:false,
    }
});
//cria a tabela
// antes de cadastrar o segundo desativa essa opcao 
//Anuncio.sync({force:true});
//depois deixe assim 
//Login.sync();
module.exports = Login;