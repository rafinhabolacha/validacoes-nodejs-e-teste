import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
//import api from '../../Api/config';
function Listar() {
        const [data ,setData]= useState([]);
      const pegarContato =  async () =>{
       // await  api.get('/listar.php')
    await  fetch('http://localhost/API/testando_api_php/Api/listar.php')
            .then((response) => response.json()).then(responsejson=>(
            //  console.log(responsejson),
               setData(responsejson.contatos)
            ));
             
        }
       useEffect(()=>{
         pegarContato();
       },[])


       const [status,setStatus]=useState({
        type:"",
        mensagem:""
    })


       //apagar contato
       const Apagar = async (idcontato)=>{
         // console.log(idcontato);
    await fetch('http://localhost/API/testando_api_php/Api/apagar.php?id='+ idcontato)
        .then((response)=>response.json())
        .then(responsejson=>{
          console.log(responsejson);
          if(responsejson){
          setStatus({
            type:"erro",
            mensagem: responsejson.mensagem
          })
        }else{
          setStatus({
            type:"false",
            mensagem: responsejson.mensagem
          })
         
        }
         }).catch((err)=>{
           if(err)
          setStatus({
            type:"Error",
            mensagem:"Erro : Tente mais tarde"+err
          })
         }) 

       }

      

 return (
    <div className="container">
          <h1 style={{textAlign:"center", background:"blue",color:"white",padding:25 }}>Listar de contatos</h1>
          <Link style={{
                         textAlign:"center",
                          margin:"10px",
                          textDecoration:"none",
                          background:"green",
                          padding:4,
                          borderRadius:3,
                          color:"white",
                          fontSize:"18px"
                        }}
                    to="/cadastrar" >Cadastrar</Link>
            <hr/>
            
         <div style={{background:"#000",padding:5,width:"100%", textAlign:"center"}}>
      <span >
      <Link to="/" style={{margin:10,textDecoration:"none",color:"white"}}>Voltar</Link>
      
      </span>
      
      </div>
      {status.type === 'erro' ? 
     <p style={{background:"#ccc",color:'green',padding:'5px',borderRadius:'5px',margin:"10px"}} >
     {status.mensagem}</p>:''} 

     {status.type === 'false' ? 
     <p style={{background:"#ccc",color:'red',padding:'5px',borderRadius:'5px',margin:"10px"}} >
     {status.mensagem}</p>:''} 

     {status.type === 'Error' ? 
     <p style={{background:"#ccc",color:'red',padding:'5px',borderRadius:'5px',margin:"10px"}} >
     {status.mensagem}</p>:''} 

        <table  className="table">
          
          <thead className="thead-dark">
             <tr style={{textAlign:"center"}} >
               <td>id</td>  
               <td >Nome</td>  
               <td >Acões</td>
              
             </tr>
             </thead>
               <tbody>
                  {Object.values(data).map(contato =>(
                 <tr key={contato.id} style={{textAlign:"center",fontSize:"18px"}}>
                    <td style={{textAlign:"center"}}>{contato.id}</td>   
                    <td style={{textAlign:"center"}}>{contato.nome}</td>

                    <td style={{textAlign:"center"}}> 
              <Link style={{
                    textAlign:"center",
                    margin:"10px",
                    textDecoration:"none",
                    background:"green",
                    padding:4,
                    borderRadius:3,
                    color:"white",
                    fontSize:"18px"
                            }}
                            to={"/editar/"+ contato.id} >Atualizar</Link>
              <Link style={{
                      textAlign:"center",
                      margin:"10px",
                      textDecoration:"none",
                      background:"green",
                      padding:4,
                      borderRadius:3,
                      color:"white",
                      fontSize:"18px"
                      }}
                      to={"/visualizar/"+ contato.id} >Visualizar</Link>
                 <Link style={{
                         textAlign:"center",
                          margin:"10px",
                          textDecoration:"none",
                          background:"green",
                          padding:4,
                          borderRadius:3,
                          color:"white",
                          fontSize:"18px"
                        }}
                    to={"#"+contato.id} onClick={()=>Apagar(contato.id)} >Apagar</Link>
               </td>
            </tr>
              ))}
        </tbody>
     </table>
   </div>
  );
}

export default Listar;