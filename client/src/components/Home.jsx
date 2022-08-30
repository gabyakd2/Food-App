import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByDiet, getDiet, getRecipes, orderByName, orderByScore } from '../actions'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import Card from './Card'
import Paginado from './Paginado'
import '../css/Home.css'
import loading from '../css/imagenes/cocina.gif'



export default function Home (){
    const dispatch = useDispatch();

    const allRecipe = useSelector(state => state.recipe)
    const allDiet = useSelector(state => state.diet)

    const [ order, setOrder ] = useState('')
    const [ score, setScore ] = useState('')
    const [ currentPage, setCurrentPage] = useState(1)
    const [ recipePerPage, setRecipePerPage ] = useState(9)
    
    const indexOfLastRecipe = currentPage * recipePerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
    const currentRecipe = allRecipe.slice(indexOfFirstRecipe, indexOfLastRecipe);

    function paginated (pageNumber){
        setCurrentPage(pageNumber) // ESTA FUNCION SIRVE PARA CAMBIAR EL NUMERO DE PAGINA(CAMBIAR EL ESTADO DE LA PAGINA)
    };

    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiet());
    },[dispatch])


    function handleClick(e){
        e.preventDefault()
        dispatch(getRecipes())
    }

    function handleFilterByDiet(e){
        if(e.target.value === 'all'){
            dispatch(getRecipes())
        }else{
            dispatch(filterByDiet(e.target.value))
        }
    }

    function handleOrderByName(e){
        if(e.target.value === 'all'){
            dispatch(getRecipes())
        }else{
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`('Ordenado', ${e.target.value})`)
        }
    }

    function handleOrderByScore(e){
        if(e.target.value === 'all'){
            dispatch(getRecipes())
        }else{
        e.preventDefault();
        dispatch(orderByScore(e.target.value));
        setCurrentPage(1);
        setScore(`('Ordenado', ${e.target.value})`)
        }
    }
    
    
    return (
        <div className='contPri'>
            <div className='navBar'>
                <h1>La Cucina Di Un Ragazzo</h1>
                <Link to='/createRecipe' className='linkHome'>Crear Receta</Link>
                <button onClick={(e) => {handleClick(e)}} className='botonCargar'>Cargar todas las recetas</button>
                <SearchBar setCurrentPage={setCurrentPage}/>
            </div>

            <div>
                <h2>Filtrar Recetas</h2>
                <select onChange={e => handleOrderByName(e)}>
                    <option value='all'>Todos sin orden</option>
                    <option value='asc'> A - Z </option>
                    <option value='desc'> Z - A </option>
                </select>
                <select onChange={e => handleFilterByDiet(e)}>
                    <option value='all'> Todas las dietas </option>
                    {
                        allDiet.map(dieta =>{
                            return (
                                <option key={dieta}>{dieta}</option>
                                )
                            })
                        }
                </select>
                <select onChange={e => handleOrderByScore(e)}>
                    <option value='all'>Todos los puntos</option>
                    <option value='asc'>Mas saludable</option>
                    <option value='desc'>Menos saludable</option>
                </select>
            <Paginado 
                recipePerPage={recipePerPage}
                allRecipe={allRecipe.length}
                paginated={paginated}
            />
                <div className='countainercards'>
                    {
                        currentRecipe.length > 0  ? currentRecipe.map( r => {
                            return(
                                <div key={r.id} className='cartas'>
                                    <Link to={'/recipe/' + r.id} className='linkCard'>
                                    <Card image={r.image} name={r.name} types={r.types? r.types: r.diets.map(e => e.name)} />
                                    </Link>
                                </div>
                            )
                        }) : (
                            <div className='loading'>
                                <h1>Cargando...</h1>
                                <img src={loading} alt="Cargando" className='imgloading'/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}