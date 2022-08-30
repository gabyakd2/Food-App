const axios = require('axios');
const { Recipe, Diet } = require('../db')
const { API_KEY } = process.env;


//INFO DE LA API
const getApiInfoRecipe = async() => {
    try{
        const apiUrl = await axios.get(`https://henry-food-api.herokuapp.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const apiInfo = await apiUrl.data.results.map(e => {
            return {
                id: e.id,
                name: e.title,
                image: e.image,
                summary: e.summary.replace(/<[^>]*>?/g, ''),
                healthScore: e.healthScore,
                //steps: e.analyzedInstructions[0]?.steps.map(s => s.step),
                steps: e.analyzedInstructions[0]?.steps.map(s => {
                    return {
                        number: s.number,
                        step: s.step
                    }
                }),
                types: e.diets
            }
        });
        
        //console.log(apiInfo)
        return apiInfo
    }
    catch(error){
        console.log(error)
    }
    };



//INFO DB
const getDbInfoRecipe = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: { attributes: [] }
        }
    })
};




//INFO CONCATENADA
const getInfoTotal = async () => {
    const apiInfoRecipe = await getApiInfoRecipe();
    //console.log(apiInfoRecipe, 'hola')
    const dbInfoRecipe = await getDbInfoRecipe();
    const infoTotal = apiInfoRecipe.concat(dbInfoRecipe);
    return infoTotal
};



//TRAER POR QUERY
const getRecipeByQuery = async (req, res) => {
    const { name } = req.query;
    const getRecipes = await getInfoTotal()
    if(name){
        let recipesFiltered = getRecipes.filter(r => r.name.toLowerCase() == name.toLowerCase())
        recipesFiltered.length ? res.status(200).send(recipesFiltered) : res.status(404).send('No se encontro la receta!')
    }else{
        return res.status(200).send(getRecipes)
    }
};



//TRAER POR PARAMS
const getRecipeByParams = async (req, res) => {
    const { id } = req.params;
    const getRecipes = await getInfoTotal()
    //console.log(getRecipes)
    let recipesFiltered = getRecipes.filter( r => r.id == id )
    if(recipesFiltered.length > 0){
        return res.status(200).send(recipesFiltered)
    }else{
        res.status(404).send('ID no valido!')
    }
};



const recipePost = async (req, res) => {
        let { name, summary, healthScore, steps, image, diet } = req.body;
    
        const recipeObj = { name, summary, healthScore, steps,
             image: image ? image : 'https://i.pinimg.com/564x/69/4d/49/694d49df069be6fd6e660a5e40c5278d.jpg' }
    try {
            const recipeCreated = await Recipe.create(recipeObj)
            let dietDb = await Diet.findAll({
                where:{name: diet}
            })

            recipeCreated.addDiet(dietDb)
            res.status(200).send('Receta creada con exito')
    } catch (error) {
        res.status(404).send('Error')
    }
}
module.exports = {
    getInfoTotal,
    getRecipeByQuery,
    getRecipeByParams,
    recipePost
}