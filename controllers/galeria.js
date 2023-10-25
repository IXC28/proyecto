const galeriaRouter = require('express').Router();
const Galery = require('../models/galeria');

const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  
  const upload = multer({ storage: storage });

  galeriaRouter.get('/', async (request, response) => {

    const logiado = request.login;
    const rol = request.rol;

    const galeria = await Galery.find();
    return response.status(200).json({logiado ,rol, galeria})

});

galeriaRouter.delete('/:id', async (request, response) => {
    try {
      const user = request.user;
      const imgName1 = request.body.imgName1;
      const imgName2 = request.body.imgName2;
      const filePath1 = path.join(__dirname, '..', 'uploads', imgName1);
      const filePath2 = path.join(__dirname, '..', 'uploads', imgName2);

      if (fs.existsSync(filePath1)) {
        fs.unlink(filePath1, (err) => {
          if (err) {
            console.error('Error al eliminar el archivo:', err);
            return response.status(500).send('Error al eliminar la imagen.');
          }
          console.log('Archivo eliminado con éxito.');
        });
      } else {
        console.log('El archivo no existe en la ubicación especificada.');
      }


      if (fs.existsSync(filePath2)) {
        fs.unlink(filePath2, (err) => {
          if (err) {
            console.error('Error al eliminar el archivo:', err);
            return response.status(500).send('Error al eliminar la imagen.');
          }
          console.log('Archivo eliminado con éxito.');
        });
      } else {
        console.log('El archivo no existe en la ubicación especificada.');
      }
  
      await Galery.findByIdAndDelete(request.params.id);
      return response.sendStatus(204);
    } catch (error) {
      console.log(error);
      return response.status(500).send('Error al eliminar el producto o la imagen.');
    }
  });
  
module.exports = galeriaRouter;