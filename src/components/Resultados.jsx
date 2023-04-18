import React, {useEffect, useState}  from 'react';
import axios from "axios";
    import {Link, Navigate} from "react-router-dom";
import Swal from 'sweetalert2';




function Resultados() {
        let token = sessionStorage.getItem('token');
        let query =  new URLSearchParams(window.location.search);
        let keyword =  query.get('keyword');

        const [moviesResult, setMoviesResult] = useState([]);

        useEffect(() => {

            const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=ec897955a332278b041e86a97fb088f3&language=es-ES&query=${keyword}`;
          
            axios.get(endPoint).then( response => { 
              const moviesArray = response.data.results; 

              if(moviesArray.length === 0){
                Swal.fire({title: `Oops, no hemos podido encontrar nada con el nombre de ${keyword}`})
              }

              setMoviesResult(moviesArray);
              
               })
                .catch(error => console.log(error))
                }, [keyword]);
             
    return (
        <>
         {!token && <Navigate to="/" />}
         <h2>Estos son los resultados para <em>{keyword}</em></h2> 

         {
            moviesResult.length === 0 && <h3>No hay resultados</h3>
         }

         <div className="row">

        {
            moviesResult.map((movie, idx) => {
                return(
            <div className="col-4" key={idx}>
              <div className="card my-4">
                 <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text">{movie.overview.substring(0, 100)}...</p>
                        <Link to={`/detalle?movieID=${movie.id}`} className="btn btn-primary">Go somewhere</Link>
             </div>
                </div>
            </div>
                )
            })
        }            
        </div>
        </>
    );
}
 
export default Resultados;    