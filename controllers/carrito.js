const carritoRouter = require('express').Router();
const Carrito = require('../models/carrito');
const Product = require('../models/products');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');
const User = require('../models/user') ;



carritoRouter.get('/', async (request, response) => {
    const logiado = request.login; 
    try {
        
    
    if (!logiado) {
        return response.status(200).json({logiado});
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










carritoRouter.patch('/', async (request, response) => { 

  try {
    

  const { ref, phone ,montoApagar } = request.body;
  const user = request.user;

  const carritoId = user.carrito;
  const carrito = await Carrito.findById(carritoId);
  const products = carrito.products;
    
  const buscarProductosPorIdsTitulo = async (arrayOfObjectIds) => {
      try {
        const productos = await Product.find({ _id: { $in: arrayOfObjectIds } }).exec();
        return productos.map(producto => producto.titulo);  
          } catch (error) {
       return error;
      }
    };

  const productosEncontrados = await buscarProductosPorIdsTitulo(products);
  console.log(productosEncontrados);

  console.log(ref,phone,montoApagar);

  if (!ref || !phone ) {
    return response.status(400).json({ error: 'Todos los espacios son requeridos' });
  }


 

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: '¡Verificación de Pago Mobil!',
    text: `Se ha enviado un pago porfavor verifiquelo`,
    html: `
        <div class="bg-blue-500 text-white p-6 rounded-lg">
           <h1 class="text-2xl mb-4 text-blue-700">enviado por de ${user.name}(${user.email})</h1>   
            <h1 class="text-2xl mb-4">Verificacion de la compra de:</h1>
            <h2 class="mb-4">los siguientes productos: ${productosEncontrados}</h2>

            <h3 class="mb-4">Ref: ${ref}</h3>
            <h3 class="mb-4">Numero de telefono: ${phone}</h3>
            <h3 class="mb-4">Monto: Bs.${montoApagar}</h3>

            <a href="${PAGE_URL}/renvio/${user.email}" class="h-auto w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">Renviar correo</a>
        </div>
    `,

    
});

//   return response.status(201).json('Usuario creado. Porfavor verifica tu correo');
} catch (error) {
    console.log(error);
}
});



module.exports = carritoRouter;