import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
const Detalhe = (props) => {
       const [data ,setData] = useState([])
       const [id] = useState(props.match.params.id);
      // console.log(id);
        const buscarContato = async () =>{
        await  fetch('http://localhost/API/testando_api_php/Api/visualizar.php?id=' + id).then((response)=>response.json())
          .then((responsejson)=>{
              //console.log(responsejson.contato);
              setData(responsejson.contato);
          })
        }
       useEffect(()=>{
          buscarContato();
       },[])

    return (
      <div className="container">
        <h1 style={{textAlign:"center", background:"blue",color:"white",padding:25 }}>Detalhes do contato</h1>
        <hr/>
        <div style={{background:"#000",padding:5,width:"100%", textAlign:"center"}}>
         <Link to="/listar" style={{margin:10,textDecoration:"none",color:"white"}}>Voltar</Link>
       </div>
         <div className="container " >
                 
       <table  className="table">
          <thead>
            <tr style={{textAlign:"center"}} >
                <td>ID</td>
               <td>E-mail</td>  
               <td >Telefone</td>  
           </tr>
        </thead>
        <tbody>
            <tr style={{textAlign:"center"}}>
               <td>{data.id}</td>
               <td>{data.email}</td>
               <td>{data.telefone}</td>
              
            </tr>
        </tbody>
     </table>
    </div>
  </div>
    );
  }
  
  export default Detalhe;