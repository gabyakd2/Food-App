const { Router } = require('express');
const { getRecipeByQuery, getRecipeByParams, recipePost, filterHs } = require('../controllers/recipeController')
const { getApiInfoDiet } = require('../controllers/dietController')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', getRecipeByQuery);

router.get('/recipes/:id', getRecipeByParams);

router.get('/diets', getApiInfoDiet)

router.post('/recipes', recipePost);


module.exports = router;
