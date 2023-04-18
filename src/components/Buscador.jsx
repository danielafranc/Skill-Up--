import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Buscador(props) {

    const navigate = useNavigate();

    const submitHandler = event =>  {
        event.preventDefault();
        const keyword = event.currentTarget.keyword.value.trim();
         if(keyword.length === 0){
             Swal.fire({title: 'Oops debes escribir algo'})
            }else if(keyword.length < 4){
                Swal.fire({title: 'Oops debes escribir más de 4 carácteres'})
            }else{
                event.currentTarget.keyword.value = "";
                navigate(`/resultados?keyword=${keyword}`)
            }
    }
    return (
        <> 
        <form className="d-flex  align-items-center" onSubmit={submitHandler}>
        <label className='form-label mb-0'>
            <input type="text" name="keyword"  placeholder='Buscar...'/>
        </label> 
        <button type="submit" className='btn btn-success ms-4'>Buscar</button>
       </form>
        </>
    );
}

export default Buscador;