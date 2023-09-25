const carritoRouter = require('express').Router();
const Carrito = require('../models/carrito');
const Product = require('../models/products');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

carritoRouter.get('/', async (request, response) => {
    const logiado = request.login; 
    try {
        
    
    if (!logiado) {
        return response.status(401).json({error: 'Debes iniciar sesion'});
    }
    const user = request.user;
    const carritoId = user.carrito;
    const carrito = await Carrito.findById(carritoId);
    const products = carrito.products;
    
    const buscarProductosPorIds = async (arrayOfObjectIds) => {
        try {
          const productos = await Product.find({ _id: { $in: arrayOfObjectIds } }).exec();
          return productos
        } catch (error) {
         return error;
        }
      };
      const productosEncontrados = await buscarProductosPorIds(products);

      return response.status(200).json(productosEncontrados);

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: 'Error del servidor' });
    }
});

carritoRouter.post('/:id', async (request, response) => {
    const logiado = request.login; 
    
    if (!logiado) {
    return response.status(401).json({error: 'Debes iniciar sesion'});
    }

    const productId = request.params.id;

    const user = request.user;
    const carritoId = user.carrito;
    const carrito = await Carrito.findById(carritoId);
    const producto = await Product.findById(productId);
    carrito.products.push(producto);

    await carrito.save();

});

carritoRouter.delete('/:id', async (request, response) => {
    try {
        const user = request.user;
        const carritoId = user.carrito;
        const carrito = await Carrito.findById(carritoId);
        
        const productIdToDelete = request.params.id.toString();
        carrito.products = carrito.products.filter(product => product.toString() !== productIdToDelete);    

        await carrito.save();
      
        return response.sendStatus(204);      
  }catch(error){
    console.log(error);
  }
});


module.exports = carritoRouter;