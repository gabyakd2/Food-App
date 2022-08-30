import axios from 'axios'



export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/recipes')
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
};



export function getDiet(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/diets')
        return dispatch ({
            type: 'GET_DIETS',
            payload: json.data
        })
    }
}



export function getRecipeByQuery(name){
    return async function(dispatch){
        try{
        var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        return dispatch ({
            type: 'GET_RECIPE_BY_QUERY',
            payload: json.data
        })
    }catch(error){
        console.log(error)
    }
    }
}




export function filterByDiet (payload){
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}



export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}



export function orderByScore(payload){
    return {
        type: 'ORDER_BY_SCORE',
        payload
    }
}



export function getRecipeByParams(id){
    return async function (dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}



export function cleanDetail(){
    return{
        type: 'CLEAN_DETAIL'
    }
}


export function postRecipe(payload){
    return async function(){
        const json = await axios.post('http://localhost:3001/recipes', payload)
        return json
    }
}



