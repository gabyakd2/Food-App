import React from "react";

export default function Paginado ({recipePerPage, allRecipe, paginated}){
    const pageNumber = []
    for (let i = 1 ; i <= Math.ceil(allRecipe/recipePerPage) ; i++){
        pageNumber.push(i)
    }

    return(
        <nav>
            <ul>
            {
                pageNumber?.map( number => (
                    <button onClick={() => paginated(number)} key={number}>{number}</button>
                ))
            }
            </ul>
        </nav>
    )
}