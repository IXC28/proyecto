const navRouter = require('express').Router();


navRouter.get('/', async (request, response) => {

    const logiado = request.login;

return response.status(200).json({logiado})
});


module.exports = navRouter;