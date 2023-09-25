const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  image: String,
  price: Number,
});

productSchema.set('toJSON', {
  transform :(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;