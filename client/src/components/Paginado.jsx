import React from "react";
import '../css/Paginado.css'

export default function Paginado ({recipePerPage, allRecipe, paginated}){
    const pageNumber = []
    for (let i = 1 ; i <= Math.ceil(allRecipe/recipePerPage) ; i++){
        pageNumber.push(i)
    }

    return(
        <nav className="paginado">
            <ul className="ulPaginado">
            {
                pageNumber?.map( number => (
                    <li className='numeroPaginado' onClick={() => paginated(number)} key={number}>{number}</li>
                ))
            }
            </ul>
        </nav>
    )
}