const { Router } = require('express');
const { getRecipeByQuery, getRecipeByParams, recipePost } = require('../controllers/recipeController')
const { getApiInfoDiet } = require('../controllers/dietController')
const { Recipe } = require ('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', getRecipeByQuery);

router.get('/recipes/:id', getRecipeByParams);

router.get('/diets', getApiInfoDiet)

router.post('/recipes', recipePost);

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        await Recipe.destroy({
            where: {id}
        })
        res.status(200).send('La receta se borro exitosamente!')
    }catch(error){
        console.log('error')
    }

})

module.exports = router;
