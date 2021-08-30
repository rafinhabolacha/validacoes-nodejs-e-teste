import React from 'react';
import {Link} from 'react-router-dom';
function Home() {
  return (
    <div className="container">
      
      <h1 style={{textAlign:"center", background:"blue",color:"white",padding:25 }}>Sistema Agenda Eletrônica</h1>
    


      <hr/>
      
      <div style={{background:"#000",padding:5,width:"100%", textAlign:"center"}}>
        
       <span >
            <Link to="/listar" style={{margin:10,textDecoration:"none",color:"white"}}>Listar de contatos</Link>
       </span>
      </div>
   </div>
  );
}

export default Home;