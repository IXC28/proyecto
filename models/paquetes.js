const mongoose = require('mongoose');

const paqueteSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  image: String,
  price: Number,

});

paqueteSchema.set('toJSON', {
  transform :(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Paquetes = mongoose.model('Paquetes', paqueteSchema);

module.exports = Paquetes;