const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Produto = require('./src/models/produtos');

app.use(express.json());

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");     
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER,Content-Type,Authorization");
  app.use(cors())
  next();    
});

app.get('/Listar_produtos',validartoken, async (req,res)=>{
    await Produto.findAll({
      //condiçionais
       order:[ ['id', 'DESC']     
      ]
    })
    .then((produtos)=>{
      return res.json({
        error:false,
          produtos
         });
    }).catch(()=>{
      return res.status(400).json({
        error:true,
        mensagem:"Nenhum produto encontrado!"
        });
    });
});
app.get('/Listar_um_produto/:id', async (req,res)=>{
  const {id} = req.params;
  await Produto.findByPk(id)
  .then((produto)=>{
    return res.json({
      error:false,
        produto
       });
  }).catch(()=>{
    return res.status(400).json({
      error:true,
      mensagem:"Nenhum produto encontrado!"
      });
  });
});
app.put('/editar_produto',async (req,res)=>{
  const {id} = req.body;
   await Produto.update(req.body,{where:{id: id}})
  .then(()=>{
    return res.json({
      error:false,
      mensagem:"Produto Editado Com sucesso!"
       });
  }).catch(()=>{
    return res.status(400).json({
      error:true,
      mensagem:"Error: Produto  não Editado Com sucesso!"
      });
  });
   //console.log(req.body);
  //res.send('Editar produtos');
});
app.delete('/apagar_produto/:id',async(req,res)=>{
   const { id } = req.params;
     await Produto.destroy({where:{id: id}})
   .then(()=>{
    return res.json({
      error:false,
      mensagem:"Produto deletado Com sucesso!"
       });
  }).catch(()=>{
    return res.status(400).json({
      error:true,
      mensagem:"Error: Produto  não deletado com sucesso!"
      });
   });
});
app.post('/Cadastrar_produto', async (req,res)=>{
    await Produto.create(req.body).then(()=>{
        return res.json({
          error:false,
          mensagem:"Produto cadastrado Com sucesso!"
           });
      }).catch((err)=>{
        return res.status(400).json({
          error:true,
          mensagem:"Error: Produto  não Cadastrado Com sucesso!"+err,
          });
      });
});
//===================================== Login ========================
const Login = require('./src/models/Login');

app.get('/listar_users',async (req,res)=>{
  await Login.findAll({
    //condiçionais
    attributes:['id','Name','email'],
     order:[ ['id', 'DESC']     
    ]
  })
  .then((usuarios)=>{
    return res.json({
      error:false,
        usuarios
       });
  }).catch(()=>{
    return res.status(400).json({
      error:true,
      mensagem:"Nenhum usuario encontrado!"
      });
  });
  
});
app.get('/Listar_um_users/:id', async (req,res)=>{
  const {id} = req.params;
  await Login.findByPk(id)
  .then((user)=>{
    return res.json({
      error:false,
        user
       });
  }).catch(()=>{
    return res.status(400).json({
      error:true,
      mensagem:"Nenhum usuario encontrado!"
      });
  });
});

app.post('/cadastrar_users',async (req,res)=>{
     var dados = req.body;

   dados.password = await bcrypt.hash(dados.password, 8)

  await Login.create(dados).then(()=>{
    return res.json({
      error:false,
      mensagem:"usuario cadastrado Com sucesso!"
       });
  }).catch(()=>{
    return res.status(400).json({
      error:true,
      mensagem:"Error: usuario  não Cadastrado Com sucesso!"
      });
  });
 // res.send("Users - Cadastrado"); 
})

app.put('/editar_users',async (req,res)=>{
  const {id} = req.body;
  const dados = req.body;
  //criptografada a senha
  dados.password = await bcrypt.hash(dados.password, 8)
  await Login.update(dados,{where:{id: id}})
 .then(()=>{
   return res.json({
     error:false,
     mensagem:"Dados Atualizado Com sucesso!"
      });
 }).catch(()=>{
   return res.status(400).json({
     error:true,
     mensagem:"Error: dados não Atualizado Com sucesso!"
     });
 });
 
 
 
  // res.send("Users - Editados"); 
})

app.delete('/apagar_users/:id',async (req,res)=>{
 
  const { id } = req.params;
     await Login.destroy({where:{id: id}})
   .then(()=>{
    return res.json({
      error:false,
      mensagem:"Usuario  Deletado Com sucesso!"
       });
  }).catch(()=>{
    return res.status(400).json({
      error:true,
      mensagem:"Error: Usuario não deletado com sucesso!"
      });
   });
 // res.send("Users - Deletado"); 
});
//validando  login e com senha criptografada
app.post('/login', async (req,res)=>{
   const user = await Login.findOne({
     attributes:['id','Name','email','password'],
     //condição
     where:{
       email: req.body.email
     }
   })
   if(user === null){
        return res.status(400).json({
          error:true,
          mensagem:"Erro : usuario ou senha não encontrado!"
        })
   }
//validando senha enviada com a senha que esta no banco 

 if(!(await bcrypt.compare(req.body.password , user.password))){
      return res.status(400).json({
        error:true,
        mensagem:"Erro :  usuario ou senha não encontrado!"
      })
  }
//validando token e Gerando  o token e sua chave

  var token = jwt.sign({id: user.id},'d41d8cd98f00b204e9800998ecf8427e');
  
   return res.status(400).json({
    error:false,
    mensagem:"E-mail  encontrado com Sucesso!",
    token
  })
})

async function validartoken(req,res,next){
    const recebeToken = req.headers.authorization;
   //separando o Bearer do token
   //bearer(' ')token
   //split('')
   //[bearer,token]
   //[,token]
   const [,token] = recebeToken.split('')
   if(!token){
     return res.status(400).json({
       erro:true,
       mensagem:"Erro : token não encontrado!"
     })
   }
   return next();
   // return res.status(400).json({
     // Token_recebido: recebeToken,
     // token
    //})      
}

app.listen(8086,function(){
  console.log('servidor rodando !');
})



