import React from "react";
import '../css/Card.css'


export default function Card ({image, name, types, id}){
    return (
            <div className="card">
                <img src={image} alt="img no encontrada" width='auto' height='250px' />
                <div className="contenido">
                    <h3>Nombre: {name}</h3>
                    <h4>Dieta: {types + ' '}</h4>
                </div>
            </div>
    )
}