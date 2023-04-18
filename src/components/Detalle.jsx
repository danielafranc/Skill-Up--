import React, {useEffect, useState}  from 'react';
import {Navigate} from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';




function Detalle() {
    const [movie, setMovie] = useState(null);

    let token = sessionStorage.getItem('token');

    let query =  new URLSearchParams(window.location.search);
    let movieID =  query.get('movieID');

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=ec897955a332278b041e86a97fb088f3&language=es-ES`;
        console.log(endPoint);
        axios.get(endPoint)
        .then( response => { 
          const movieData = response.data; 
          setMovie(movieData);
           })
            .catch(error => {  Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La dirección de la película no existe',
              })})}, [movieID]);

    return (
        <>
        {!token && <Navigate to="/" />}
            {!movie && <p>Cargando...</p>}
            {movie && <> 
            <div className="row">
                <div className="col-4">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie poster" />
                </div>
                <div className="col-8">
                    <h5>Título: {movie.title}</h5>
                    <h5>Fecha de estreno: {movie.release_date}</h5>
                    <h5>Reseña:</h5>
                    <p>{movie.overview}</p>
                    <h5>Rating: {movie.vote_average}</h5>
                    <h5>Géneros:</h5>
                    <ul> 
                    {movie.genres.map((oneGenre, idx) => <li key={idx} >{oneGenre.name}</li>)}
                    </ul>


                </div>
            </div> 
            </>}
        </>
    );
}

export default Detalle;