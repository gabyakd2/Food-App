const axios = require('axios');
const { Recipe, Diet } = require('../db')
const { API_KEY } = process.env;



const getApiInfoDiet = async (req, res) => {
    try {
        let findDietDb = await Diet.findAll() //busco en mi tabla Diet y que me guarde todo el dato en la variable findDietDb

        if (findDietDb.length > 0) {
            res.status(200).send(findDietDb.map(d => d.name))

        }else{
            const apiInfoDiet = await axios.get(`https://henry-food-api.herokuapp.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
            let apiInfoMap = await apiInfoDiet.data.results.map( d => d.diets).flat(Infinity)
            
            let apiInfoForEach = apiInfoMap.forEach(d => { //almacena la info en la db
                 Diet.findOrCreate({
                    where: {name: d}
                 })
             })
             
             const otraInfo = await Diet.findAll()
            res.status(200).send(otraInfo.map(d => d.name))
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getApiInfoDiet
}