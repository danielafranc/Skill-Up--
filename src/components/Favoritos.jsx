import React from 'react';
import {Navigate} from "react-router-dom";


function Favoritos(props) {
    let token = sessionStorage.getItem('token');

    return (
        
        <>
        {!token && <Navigate to="/" />}
        <h2>Sección de favoritos</h2>
         <div className="row">
            {!props.favoritos.length && <div className='col-12 text-danger'> No has seleccionado tu peli favorita aún</div>}

{
    props.favoritos.map((movie, idx) => { return(
    <div className="col-3" key={idx}>
      <div className="card my-4">
         <img src={movie.imageURL} className="card-img-top" alt="..." />
         <button 
         className="favorite-btn" 
         onClick={props.handleChangeState}
         data-movie-id={movie.id}
         >🖤</button>
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">{movie.overview.substring(0, 100)}...</p>
                {/* <Link to={`/detalle?movieID=${movie.id}`} className="btn btn-primary">Go somewhere</Link> */}
     </div>
        </div> 
    </div>
        )
    })
}

    {/* Estructura base */}
    
</div>
        </>
    );
}

export default Favoritos;