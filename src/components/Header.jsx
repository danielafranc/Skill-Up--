import { Link } from "react-router-dom";
 
//Components
import Buscador from "./Buscador";


function Header(props){
return(
    <header>
       <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Home</Link>
    <div>
      <ul className="navbar-nav d-flex flex-row">
        <li className="nav-item mx-4">
          <Link className="nav-link active" aria-current="page" to="/listado">Listado</Link>
        </li>
        <li className="nav-item mx-4">
          <Link className="nav-link" to="/contacto">Contacto</Link>
        </li>
        <li className="nav-item mx-4">
          <Link className="nav-link" to="/favoritos">Favoritos</Link>
        </li>
        <li className="nav-item d-flex align-items-center">
          <span className="text-success">
            {props.favoritos > 0 && <> Peliculas en Favoritos: {props.favoritos.length}</>}
        </span>
        </li>
      </ul>
    </div>
    <Buscador/>
  </div>
</nav>
        {/* <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li> <Link to="/listado">Listado</Link></li>
                <li> <Link to="/contacto">Contacto</Link></li>

            </ul>
        </nav> */}
    </header>
)
}
export default Header;