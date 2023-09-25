const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  rol: {
    type: String,
    default: 'cliente',
  },
  verified : {
    type: Boolean,
    default: false,
  },
  carrito: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrito',
  },
});

userSchema.set('toJSON', {
  transform :(document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;