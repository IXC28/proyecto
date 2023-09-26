const serviciosRouter = require('express').Router();
const Servicio = require('../models/servicios');

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

serviciosRouter.get('/', async (request, response) => {

    const logiado = request.login;
    const rol = request.rol;

    const service = await Servicio.find();

    return response.status(200).json({logiado ,rol, service});

});
serviciosRouter.delete('/:id', async (request, response) => {
    try {
      const user = request.user;
      const imgName = request.body.imgName;
  
      const filePath = path.join(__dirname, '..', 'uploads', imgName);
  
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error al eliminar el archivo:', err);
            return response.status(500).send('Error al eliminar la imagen.');
          }
          console.log('Archivo eliminado con éxito.');
        });
      } else {
        console.log('El archivo no existe en la ubicación especificada.');
      }
  
      await Servicio.findByIdAndDelete(request.params.id);
      return response.sendStatus(204);
    } catch (error) {
      console.log(error);
      return response.status(500).send('Error al eliminar el servicio o la imagen.');
    }
  });
module.exports = serviciosRouter