const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./src/routes/routes')
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.use(routes);

mongoose.connect('mongodb://localhost/Informacoes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(()=>{
   console.log('conexão com mongodb realizada com sucesso!')
  }).catch((erro)=>{
    console.log('Error: com mongodb não foi realizada com sucesso!')
  });
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");     
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER,Content-Type,Authorization");
  app.use(cors())
  next();    
});

app.listen(8086,function(){
  console.log('servidor rodando !');
})



