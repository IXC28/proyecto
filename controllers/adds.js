const addRouter = require('express').Router();


addRouter.get('/', async (request, response) => {

    const rol = request.rol;
    return response.status(200).json({rol})
});


module.exports = addRouter;