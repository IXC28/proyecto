const renvioRouter = require('express').Router();
const User = require('../models/user') ;
const Carrito = require('../models/carrito') ;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config');


renvioRouter.post('/:email', async (request, response) => {

    try {
      const email = request.params.email;
  
        // Enviar el email
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
            from: process.env.EMAIL_USER, // sender address
            to: email, // list of receivers
            subject: 'Su pago ha sido verificado',
            text: 'Tu pago fue verificado:', // plain text body
            html: `<h1 class="mb-4"> Contactenos para retirar sus productos al 0424-2410187 con la captura de pantalla del pago enviado</h1>`, // html body
      
          });
  
  
  
    } catch (error) {
  

        console.log(error);
  
      return response.status(400).json({ error: 'Error al renviar el email' });

    }
  
  
  });
  module.exports = renvioRouter;