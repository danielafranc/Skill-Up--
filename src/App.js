//Librerías
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';

//Estilos
import './App.css';


//Componentes
import Header from './components/Header';
import Listado from './components/Listado';
import Login from './components/Login';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';

function App() {

  const [favoritos, setFavoritos] = useState([]);

 useEffect(() => {
    const favsInLocal = localStorage.getItem('favs');
    console.log(favsInLocal);

    if(favsInLocal != null){
        const favsArray = JSON.parse(favsInLocal);
        console.log(favsArray);
        setFavoritos(favsArray)
    }
 }, []);

const handleChangeState = e => {

  const favMovies = localStorage.getItem('favs');
  let tempMoviesInFavs;

  if (favMovies === null || !Array.isArray(JSON.parse(favMovies))){
    tempMoviesInFavs = [];
  } else {
    tempMoviesInFavs = JSON.parse(favMovies);
  }
  console.log(tempMoviesInFavs);

  const btn =  e.currentTarget;
  const parent = btn.parentElement;
  const imageURL = parent.querySelector('img').getAttribute('src');
  const title = parent.querySelector('h5').innerText;
  const overview = parent.querySelector('p').innerText;

  const movieData = {
    imageURL, title, overview,
    id: e.currentTarget.dataset.movieId
  };

  let movieInArray = tempMoviesInFavs.find(movie => { 
    return movie.id === movieData.id});

 
  if(!movieInArray){
    tempMoviesInFavs.push(movieData);
    localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));
    setFavoritos(tempMoviesInFavs);
    console.log('Se agrego la pelicula')  
  } else {
    let moviesLeft = tempMoviesInFavs.filter(movie => {return movie.id !== movieData.id});
    localStorage.setItem('favs', JSON.stringify(moviesLeft));
    setFavoritos(moviesLeft);

    console.log('Se elimino la pelicula')  
};
};  


  return (
    <>
    <Header favoritos={favoritos}/>
    <Routes> 
      <Route exact path="/" element={<Login/>}/>
      <Route path="/listado" element={<Listado handleChangeState={handleChangeState}/>}/>
      <Route path="/detalle" element={<Detalle/>}/>
      <Route path="/resultados" element={<Resultados/>}/>
      <Route path="/favoritos" element={<Favoritos favoritos={favoritos} handleChangeState={handleChangeState} />}/>



    </Routes>
      

     
    </> 
  );
}

export default App;
