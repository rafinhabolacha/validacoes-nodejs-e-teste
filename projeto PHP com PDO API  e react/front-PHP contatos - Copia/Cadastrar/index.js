//import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
const Cadastrar = () => {

    return(
     <div  className="container">
       <h1 style={{textAlign:"center", background:"blue",color:"white",padding:25 }}>Novo Contato:</h1>
          
       <div style={{background:"#000",padding:5,width:"100%", textAlign:"center"}}>
          <span >
           <Link to="/listar" style={{margin:10,textDecoration:"none",color:"white"}}>Voltar</Link>
          </span>
      </div>
      <hr/>
         <form>
             <label>E-mail</label>
               <input type="email" className="form-control" />
     
            <label >Telefone</label>
               <input type="password" className="form-control"/>
             
               <button type="submit" className="btn btn-primary m-5">Cadastrar</button>
        </form>
   </div>
    )





}

export default Cadastrar;