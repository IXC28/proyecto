const agregarRouter = require('express').Router();
const Product = require('../models/products');
const Servicio = require('../models/servicios');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  
  const upload = multer({ storage: storage });


agregarRouter.get('/', async (request, response) => {

    const rol = request.rol;
        if (rol !=='admin') {

        }

    return response.status(200).json({rol})
});

agregarRouter.post('/', upload.single('imagen'), async (request, response) => {

    if(request.body.categoria === 'producto'){
        const  titulo = request.body.titulo;
        const descripcion  = request.body.descripcion;
        const  image = '/'+ request.file.destination +'/'+ request.file.filename;
        const  price = request.body.precio;


        const newProduct = new Product({
            titulo: titulo,
            descripcion: descripcion,
            image: image,
            price: price,
        })

        await newProduct.save();

        return response.status(201).json('Se creo un nuevo producto');

    }else if(request.body.categoria === 'servicios'){
      const  titulo = request.body.titulo;
      const descripcion  = request.body.descripcion;
      const  image = '/'+ request.file.destination +'/'+ request.file.filename;
      const  price = request.body.precio;


      const newService = new Servicio({
          titulo: titulo,
          descripcion: descripcion,
          image: image,
          price: price,
      })

      await newService.save();

      return response.status(201).json('Se creo un nuevo servicio');
  }
});

module.exports = agregarRouter;