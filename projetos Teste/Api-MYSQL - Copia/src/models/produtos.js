const Sequelize =  require('sequelize');
const db = require('./db');


const Produto =db.define('produtos',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    Nome:{
        type:Sequelize.STRING,
        allowNull:false,

    },
    Valor:{
        type:Sequelize.DOUBLE,
        allowNull:false,
    },
    Quantidade:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
});
//cria a tabela
// antes de cadastrar o segundo desativa essa opcao 
//Anuncio.sync({force:true});
//depois deixe assim 
//Produto.sync();
module.exports = Produto;