const agregarRouter = require('express').Router();
const Paquetes = require('../models/paquetes');
const Product = require('../models/products');
const Servicio = require('../models/servicios');
const Galery = require('../models/galeria')
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  
  let upload = multer({ storage: storage });


agregarRouter.get('/', async (request, response) => {

    const rol = request.rol;
        if (rol !=='admin') {

        }

    return response.status(200).json({rol})
});

agregarRouter.post('/', upload.array('imagen', 2), async (request, response) => {
  const imagenes = request.files;
  const categoria = request.body.categoria;

  if (categoria === 'producto' || categoria === 'servicios' || categoria === 'paquetes') {
      // Este bloque maneja los casos donde hay solo una imagen
      const imagen = imagenes[0];
      const titulo = request.body.titulo;
      const descripcion = request.body.descripcion;
      const image = '/' + imagen.destination + '/' + imagen.filename;
      const price = request.body.precio;

      if (categoria === 'producto') {
          const newProduct = new Product({
              titulo: titulo,
              descripcion: descripcion,
              image: image,
              price: price,
          });
          await newProduct.save();
          return response.status(201).json('Se creó un nuevo producto');
      } else if (categoria === 'servicios') {
          const newService = new Servicio({
              titulo: titulo,
              descripcion: descripcion,
              image: image,
              price: price,
          });
          await newService.save();
          return response.status(201).json('Se creó un nuevo servicio');
      } else if (categoria === 'paquetes') {
          const newPack = new Paquetes({
              titulo: titulo,
              descripcion: descripcion,
              image: image,
              price: price,
          });
          await newPack.save();
          return response.status(201).json('Se creó un nuevo paquete');
      }
  } else if (categoria === 'galeria') {
      // Este bloque maneja el caso donde hay dos imágenes
      const imagenBefore = imagenes[0];
      const imagenAfter = imagenes[1];
      const imagenBeforePath = '/' + imagenBefore.destination + '/' + imagenBefore.filename;
      const imagenAfterPath = '/' + imagenAfter.destination + '/' + imagenAfter.filename;
      const newGalery = new Galery({
        imageBefore: imagenBeforePath,
        imageAfter: imagenAfterPath,

      });
      await newGalery.save();
      return response.status(201).json('Se creó una nueva entrada en la galería');
  } else {
      return response.status(400).json('Categoría no válida');
  }
});

module.exports = agregarRouter;
