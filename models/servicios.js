const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  image: String,
  price: Number,

});

servicioSchema.set('toJSON', {
  transform :(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Servicio = mongoose.model('Servicio', servicioSchema);

module.exports = Servicio;