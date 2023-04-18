import { useEffect, useState } from "react";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'



function Listado(props){
    let token = sessionStorage.getItem('token');

    const [moviesList, setMoviesList] = useState([]);

    useEffect(() => {
        const endPoint =  'https://api.themoviedb.org/3/discover/movie?api_key=ec897955a332278b041e86a97fb088f3&language=en-US';
        axios.get(endPoint)
        .then( response => { 
          const apiData = response.data; 
            setMoviesList(apiData.results)})
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })})
    }, [setMoviesList]);
 
    return(
        <>
        {!token && <Navigate to="/" />}
        <div className="row">

        {
            moviesList.map((movie, idx) => { 
                return(
            <div className="col-3" key={idx}>
              <div className="card my-4">
                 <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..." />
                 <button 
                 className="favorite-btn" 
                 onClick={props.handleChangeState}
                 data-movie-id={movie.id}
                 >🖤</button>
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

            {/* Estructura base */}
            
        </div>
        </>
    )
}
export default Listado;