import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const Apagar = (props) => {
    const [id] = useState(props.match.params.id);
    console.log(id);
  

    return (
        <div>
            <h1>Apagar contatos</h1>
        </div>
    )

}

export default Apagar;