import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const Editar = (props) => {
    const [id] = useState(props.match.params.id);
  //  console.log(id);

      const [email,setEmail]=useState('');
      const [telefone,setTelefone]=useState('');
      const [nome,setNome]=useState('');


      const [status,setStatus]=useState({
        type:"",
        mensagem:""
    })


const editContato  = async  e  =>{
    e.preventDefault();
 await fetch('http://localhost/API/testando_api_php/Api/editar.php',{
        method:"POST",
        headers:{
         'Content-Type':'Application/json'
        },
          body:JSON.stringify({id,email,telefone,nome}) 
    }).then((response)=>response.json())
    .then((responseJson)=>{
        if(responseJson)
        {
          setStatus({
              type:"erro",
              mensagem: responseJson.mensagem
          })
        }
        else
        {
            setStatus({
                type:"false",
                mensagem: responseJson.mensagem
            })
        }
       // console.log(responseJson);
    }).catch((err)=>{
        if(err)
        {
         setStatus({
            type:"Error",
            mensagem:"Erro : Tente mais tarde"+err
         })
      }
    
    });   

} 

 


   const buscarContato = async () =>{
    await fetch("http://localhost/API/testando_api_php/Api/visualizar.php?id=" + id)
    .then((response)=> response.json())
    .then((responseJson)=>{
        console.log(responseJson.contato);
        setEmail(responseJson.contato.email);
        setTelefone(responseJson.contato.telefone);
        setNome(responseJson.contato.nome);
        
    })
   } 

   useEffect(()=>{
    buscarContato();
   },[id])










    return(
        <div  className="container">
            <h1 style={{textAlign:"center", background:"blue",color:"white",padding:25 }}>Atualizar Contatos</h1>
            
          <div style={{background:"#000",padding:5,width:"100%", textAlign:"center"}}>
            <span >
              <Link to="/listar" style={{margin:10,textDecoration:"none",color:"white"}}>Voltar</Link>
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
       
          <form onSubmit={editContato}>
          <label>Nome</label>
               <input 
                 type="text" 
                 className="form-control" 
                 value={nome}
                 onChange={ e => setNome(e.target.value)}
                 />




             <label>E-mail</label>
               <input 
                 type="email" 
                 className="form-control" 
                 value={email}
                 onChange={ e => setEmail(e.target.value)}
                 />
     
            <label >Telefone</label>
               <input type="text" 
                      className="form-control"
                      value={telefone}
                      onChange={ e => setTelefone(e.target.value)}
                      />

             
               <input type="submit" className="btn btn-primary m-5" value="Atualizar"/>
        </form>
        </div>
    )





}

export default Editar;