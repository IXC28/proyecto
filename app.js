const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { userExtractor } = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');
const { MONGO_URI } = require('./config');
const carritoRouter = require('./controllers/carrito');
const productRouter = require('./controllers/product');
const { role } = require('./middleware/role');
const navRouter = require('./controllers/navs');
const addRouter = require('./controllers/adds');
const agregarRouter = require('./controllers/agregar');


(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('conecto a mongo db');
  } catch (error) {
    console.log(error);
  }
})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// rutas Frontend

app.use('/', express.static(path.resolve('view', 'home')));
app.use('/signup', express.static(path.resolve('view', 'signup')));
app.use('/login', express.static(path.resolve('view', 'login')));
app.use('/carrito', express.static(path.resolve('view', 'carrito')));
app.use('/products', express.static(path.resolve('view', 'productos')));
app.use('/agregar', express.static(path.resolve('view', 'agregar')));

app.use('/styles', express.static(path.resolve('view', 'styles')));
app.use('/components', express.static(path.resolve('view', 'components')));
app.use('/verify/:id/:token', express.static(path.resolve('view', 'verify')));


app.use('/utils', express.static(path.resolve(__dirname, 'utils')));
app.use('/img', express.static(path.resolve('img')));
app.use('/uploads', express.static(path.resolve('uploads')));

app.use(morgan('tiny'));

// rutas Backend

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);

app.use('/api/navs', userExtractor, navRouter);
app.use('/api/adds', userExtractor, role, addRouter);
app.use('/api/agregar', userExtractor, role, agregarRouter);
app.use('/api/carrito', userExtractor, carritoRouter);
app.use('/api/products', userExtractor, role, productRouter);



module.exports = app;