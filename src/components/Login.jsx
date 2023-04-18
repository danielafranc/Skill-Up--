import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate, Navigate } from "react-router-dom";

function Login(){

    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(email === "" || password === ""){
            Swal.fire({
                title: 'Los campos no pueden estar vacíos!'
              })
            return;
        }


        if(email !== "" && !regexEmail.test(email)){
            console.log("Debes escribir una direccion de correo electronico valida")
            return;
        
        }

        if(email !== "challenge@alkemy.org" || password !== "react"){
            console.log('credenciales invalidas')
            Swal.fire({
                title: 'Credenciales Invalidas!'
              })
        }
        console.log('Estamos listos para despegar!')
        axios
        .post('http://challenge-react.alkemy.org', {email, password})
        .then(resp => {
            Swal.fire({ title: 'Ingresaste existosamente!'})
            const tokenRecibido = resp.data.token;
            sessionStorage.setItem('token', tokenRecibido);
            navigate('/listado');
        })
    }
    let token = sessionStorage.getItem('token');


    return(
        <>
        {token && <Navigate to="/listado"/> }
        <h2>Formulario</h2>
       <form onSubmit={submitHandler}>
        <label>
             <span>Correo electronico:</span>
                <input type="text" name="email"/>
        </label>
        <br />
        <label>
            <span>Contraseña</span>
             <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Ingresar</button>
       </form>
       </> 
    )
}

export default Login;