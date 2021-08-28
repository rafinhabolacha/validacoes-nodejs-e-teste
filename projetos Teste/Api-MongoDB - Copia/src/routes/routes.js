const express = require('express');
const routes = express.Router();
const livroController = require('../controllers/livrosControllers');

//rotas
routes.post('/livros',livroController.insert);
routes.get('/',livroController.listar_todos);
routes.get('/livros/:id',livroController.listar_detalhes);
routes.put('/livros/:id',livroController.atualizar_livros);
routes.delete('/livros/:id',livroController.delete);




const dadoController = require('../controllers/dadosControllers');
//rotas
routes.post('/informacoes',dadoController.insert);
routes.get('/informacoes/:cpf',dadoController.pesquisar);


module.exports = routes;