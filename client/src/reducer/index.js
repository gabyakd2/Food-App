const initialState = {
    recipe: [],
    allRecipe: [],
    diet: [],
    detail: []
}



function rootReducer (state = initialState, action) {
    switch(action.type){
        case 'GET_RECIPES':
            return {
                ...state,
                recipe: action.payload,
                allRecipe: action.payload
            }
        
        case 'FILTER_BY_DIET':
            const allRecipe = state.allRecipe.map(r => ({
                id: r.id,
                name: r.name,
                image: r.image,
                summary: r.summary,
                healthScore: r.healthScore,
                types: r.types ? r.types.map(d => d) : r.diets.map(e => e.name)
            }))
            const dietsFiltered = allRecipe.filter(d => d.types.includes(action.payload))
            return{
                ...state,
                recipe: dietsFiltered
            }
            
            case 'GET_DIETS':
                return{
                    ...state,
                    diet: action.payload
                }
            
            case 'GET_RECIPE_BY_QUERY':
                return{
                    ...state,
                    recipe: action.payload
                }

            case 'POST_RECIPE':
                return{
                    ...state,
                    recipe: action.payload
                }

            case 'GET_DETAIL':
                return{
                    ...state,
                    detail: action.payload
                }

            case 'CLEAN_DETAIL':
                return{
                    ...state,
                    detail: []
                }

            case 'ORDER_BY_NAME':
                let orderedName = action.payload === 'asc' ?
                state.recipe.sort(function (a, b) {
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0
                }) :
                state.recipe.sort(function (a, b) {
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    recipe: orderedName
                }

            case 'ORDER_BY_SCORE':
                let orderedScore = action.payload === 'asc' ?
                state.recipe.sort(function (a, b) {
                    if(a.healthScore > b.healthScore){
                        return 1;
                    }
                    if(b.healthScore > a.healthScore){
                        return -1;
                    }
                    return 0
                }) :
                state.recipe.sort(function (a, b) {
                    if(a.healthScore > b.healthScore){
                        return -1;
                    }
                    if(b.healthScore > a.healthScore){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    recipe: orderedScore
                }
            default: return state
    }
}


export default rootReducer