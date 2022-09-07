import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanDetail, getRecipeByParams } from "../actions";
import { useEffect } from 'react'
import loadingRat from '../css/imagenes/ratatuil.gif'
import '../css/Detail.css'


export default function Detail({id}){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipeByParams(id))
    }, [dispatch])

    useEffect(() => {
        return function (){
            dispatch(cleanDetail())
        }
    },[dispatch])

    const recipe = useSelector ((state) => state.detail)

    return (
        <div className="contPriDetail">
            {
                recipe.length > 0 ?
                <div>
                    <Link to='/home'>Volver</Link>
                    <div className="containercarddetail">
                        <h1>{recipe[0].name}</h1>
                        <img src={ recipe[0].image ? recipe[0].image : recipe[0].image } alt='img no encontrada'/>
                        <div>
                            <h2>Resumen del plato</h2>
                            <p>{recipe[0].summary}</p>
                        </div>
                        <h4>Nivel de comida saludable: {recipe[0].healthScore}</h4>
                        <h4>
                            Paso a paso: { !recipe[0].steps ? 'Formula secreta, no se puede mostrar'
                            : recipe[0].steps.length > 1 ? recipe[0].steps.map((p, i) => {
                                return(
                                    <li key={i}>{p.number}: {p.step}</li>
                                )
                            }) : recipe[0].steps[0] }
                        </h4>
                        <h4>Dietas del plato: {recipe[0].types ? recipe[0].types.map( d => d ) : recipe[0].diets.map(e => e.name + ', ')}</h4>
                    </div>
                </div> : (
                    <div>
                        <img src={loadingRat} alt='cargando'/>
                        <br />
                        <h2>Cargando...</h2>
                    </div>
                )
            }
        </div>
    )
}