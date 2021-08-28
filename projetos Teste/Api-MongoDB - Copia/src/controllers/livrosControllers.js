const Livro = require('../models/livros');
module.exports ={
    async insert(req,res){
        const livros = await Livro.create(req.body,(err)=>{
            if(err)return res.status(400).json({
                    error:true,
                    mensagem:"Error: Livro não Cadastrado  com sucesso!",
               });
                return res.json({
                    error:false,
                    mensagem:" Livro Cadastrado com sucesso!",
                    livros
                });
          });
    },
 async listar_todos(req,res){
   await Livro.find({}).then((livros)=>{
       return res.json({
           error:false,
           mensagem:"Livros que estão Disponiveis",
           Livros: livros
       });
   }).catch((err)=>{
        return res.status(400).json({
            error:true,
            mensagem:"Nenhum livro encontrado!"
        });
    });
 },
 async listar_detalhes(req,res){
         await Livro.findOne({_id: req.params.id}).then((livro)=>{
            return res.json({
                Erro:false,
                mensagem:"Livro Encontrado:",
                livro
            })   
        }).catch((err)=>{
            return res.status(400).json({
                error:true,
                mensagem:"Nenhum Livro encontrado!"
            });
        });
    },
  async atualizar_livros(req,res){
           await Livro.updateOne({_id: req.params.id },req.body,(err)=>{
            if(err)  return res.status(400).json({
                error:true,
                mensagem:"erro: Na Atualização !"
                
            });
            return res.json({
                error:false,
                mensagem:"Livro  Atualizado com sucesso!",
                
            });
        });  
  },
 async delete(req,res){
            await Livro.deleteOne({_id: req.params.id},(err)=>{
                if(err) return res.status(400).json({
                    error:true,
                    mensagem:"Erro: não foi possivel Deletar este livro"
                });
             
                return res.json({
                    error:false,
                    mensagem:"livro apagado com Sucesso!"
                });
            });
        },
   }