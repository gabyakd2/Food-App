import React from "react";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from 'react-router-dom';
import { getDiet, postRecipe } from "../actions";
import '../css/RecipeCreated.css'


function validate (input){
    let errors = {}
    if(!input.name || isNaN(input.name) === false) errors.name = 'Ingresar un nombre sin numeros';
    if(!input.summary) errors.summary = 'Agregar un comentario';
    if(!input.healthScore || input.healthScore < 1 || input.healthScore > 100 || isNaN(input.healthScore)) errors.healthScore = 'El puntaje debe ser mayor a 1 y menor que 100 y no debe contener letras o palabras';
    if(!input.steps.length) errors.steps = 'Por favor, detalle los pasos a seguir para su receta';
    return errors
}

export default function RecipeCreate (){
    const dispatch = useDispatch();
    const history = useHistory();
    const dietState = useSelector(state => state.diet);
    
    const [ input, setInput ] = useState({
        name: '',
        summary: '',
        healthScore: '',
        steps: '',
        diet: []
    })
    const [ errors, setErrors ] = useState({})

    useEffect(() => {
        dispatch(getDiet());
    }, [dispatch])


    function handleChange(e){
        if(e.target.name === 'steps'){
            setInput({
                ...input,
                [e.target.name] : [e.target.value]
            })
            setErrors(validate({
                ...input,
                [e.target.name] : e.target.value
            }))
        }else{
            setInput({
            ...input,
                [e.target.name] : e.target.value
            })
            setErrors(validate({
                ...input,
                [e.target.name] : e.target.value
            }))
        }
    }


    //console.log(input)
    function handleSelectDiet (e){
        setInput({
            ...input,
            diet: [...input.diet, e.target.value]
        })
    }


    function handleAlert(e){
        e.preventDefault();
        setErrors(validate(
            input
        ))
        const errorSubmit = validate(input)

        if(Object.values(errorSubmit).length !== 0 || !input.diet.length){
            alert('Datos erroneos o faltantes')
        }else{
        dispatch(postRecipe(input))
        alert('¡Receta creada con exito!')
        setInput({
            name: '',
            summary: '',
            healthScore: '',
            steps: '',
            diet: []
        })
        history.push('/home')
    }    
    }


    function handleDelete(e){
        setInput({
            ...input,
            diet: input.diet.filter(t => t !== e)
        })
    }


    return (
        <div className="recipePri">
            <Link to='/home'><button className="backHome">Volver</button></Link>
            <div className="contForm">
                <form>
                    <div className="formTitle">
                        <h1>¡Crea tu receta!</h1>
                    </div>
                    <div className="form-label">
                        <label>Nombre: </label>
                        <input 
                            placeholder="Nombre de su receta..."
                            className="input-rest"
                            type='text'
                            value={input.name}
                            name='name'
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name && (
                            <p>{errors.name}</p>
                        )}
                    </div>
                    <div className="form-label">
                        <label>Nivel de comida saludable: </label>
                        <input 
                            placeholder="Puntaje de su receta..."
                            className="input-rest"
                            min={0}
                            max={100}
                            type='text'
                            value={input.healthScore}
                            name='healthScore'
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.healthScore && (
                            <p>{errors.healthScore}</p>
                        )}
                    </div>
                    <div className="form-label">
                        <label>Imagen</label>
                        <input 
                            placeholder="URL de su imagen..."
                            className="input-rest"
                            type='text'
                            value={input.image? input.image : ''}
                            name='image'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="form-label">
                        <label>Resumen: </label>
                        <textarea
                            placeholder="Resumen de su receta..."
                            className="input-rest"
                            type='text'
                            value={input.summary}
                            name='summary'
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.summary && (
                            <p>{errors.summary}</p>
                        )}
                    </div>
                    <div className="form-label">
                        <label>Paso a paso: </label>
                        <textarea
                            placeholder="Pasos a seguir..."
                            className="input-rest"
                            type='text'
                            value={input.steps}
                            name='steps'
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.steps && (
                            <p>{errors.steps}</p>
                        )}
                    </div>
                    
                    <select onChange={(e) => handleSelectDiet(e)}>
                        <option key='Todas las dietas'>Elegir una dieta</option>
                        {
                            dietState?.map((dieta, i) => {
                                return(
                                    <option key={i} value={dieta}>{dieta}</option>
                                )
                            })
                        }
                    </select>
                    {
                        input.diet.map( d => (
                            <div>
                                <p>
                                    <button 
                                        value={d}
                                        onClick={() => handleDelete(d)}
                                        >
                                            X
                                    </button>
                                </p>
                            </div>
                        ))
                    }
                    {errors.diet && (
                            <p>{errors.diet}</p>
                        )}
                    <ul><li>{input.diet.map( d => d + ' ,' )}</li></ul>
                </form>
            </div>
                    <button className='btn-submit' type="submit" onClick={(e) => handleAlert(e)}>Crear Receta</button>
        </div>
    )
}