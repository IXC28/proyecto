const mongoose = require('mongoose');

const galeriaSchema = new mongoose.Schema({
  imageBefore: String,
  imageAfter: String,

});

galeriaSchema.set('toJSON', {
  transform :(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Galery = mongoose.model('Galery', galeriaSchema);

module.exports = Galery;