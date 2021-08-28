const Dados = require('../models/Dados');
module.exports ={
    
    //pesquisar
    async pesquisar(req,res){
         const { cpf } = req.params;
          await Dados.findOne({cpf: cpf }).then(()=>{
              if(cpf)
            return res.json({
                error:false,
                mensagem:"cpf ja existe! ",
                cpf: cpf
          });
          return res.json({
            error:true,
            mensagem:"cpf não existe! ",
            
      });
        });
      },



    async insert(req,res){
      //  const [nome,telefone,email,cpf,rg] = req.body;
              
      const emailExiste = await Dados.findOne({email: req.body.email})  
       if(emailExiste){
            return res.json({
                error:true,
                mensagem:"Este email ja esta sendo usado ! ",
           });
           
        }
         if(!req.body.rg || typeof req.body.rg === undefined || req.body.rg === null)
        {
            return res.json({
                error:true,
                mensagem:"É nencessario preencher o campo RG! ",
           });
        }
          else if(!req.body.telefone || typeof req.body.telefone === undefined || req.body.telefone === null)
         {
            return res.json({
                error:true,
                mensagem:"É nencessario preencher o campo TELEFONE! ",
           });
         }

         else if(!req.body.cpf || typeof req.body.cpf === undefined || req.body.cpf === null)
         {
            return res.json({
                error:true,
                mensagem:"É nencessario preencher o campo CPF! ",
           });
         }
            const dados = await Dados.create(req.body,(err)=>{
            if(err) return res.json({
                    error:true,
                    mensagem:"Error: Dados incorretos! ",
               });
                return res.json({
                    error:false,
                    mensagem:" Dados Cadastrado com sucesso!",
                    dados
                });
          });
          
    },
  
  

 
 }   