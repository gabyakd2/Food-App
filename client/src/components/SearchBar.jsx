import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipeByQuery } from '../actions'
import '../css/SearchBar.css'


function SearchBar ({setCurrentPage}){
    const dispatch = useDispatch();
    const [ name, setName ] = useState('')

    function handleInputChange(e){
      e.preventDefault();
      setName(e.target.value)
    }

    function handleSubmit(e){
      e.preventDefault();
      if(name.length > 0){
        dispatch(getRecipeByQuery(name))
        setName('')
        setCurrentPage(1)
      }else{
        alert('Ingrese un nombre!')
      }
      }


  return (
    <div className='princ'>
      <div className='topnav'>
         <input 
         type='text' 
         placeholder='Nombre de la receta'
         onChange={(e) => handleInputChange(e)}
         value = {name}
         />
        <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
      </div>
    </div>
  )
}


export default SearchBar


//HACER QUE MI BUSQUEDA NO SEA EXACTA, (arreglar llamado del back)