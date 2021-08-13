import express from 'express';
import path from 'path';
import * as http from 'http';
import io from 'socket.io';

import Product from './Productos'
import prod from './routes/productos';


/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8000;

app.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));


app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);


const myServer = http.Server(app);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

myServer.listen(puerto, () => console.log('Server up en puerto', puerto));


app.use('/api', prod)


const myWSServer = io(myServer);


const products = new Product()
let listaProductos = products.leerProductos()

myWSServer.on('connect', socket => {

   socket.on('new-product',product => {
     const {title,price,thumbnail} = product
     products.guardarProducto(title,price,thumbnail)

     myWSServer.emit('products', listaProductos);
   })

   socket.on('askProduct', (productos) => {
    
    socket.emit('products', listaProductos);
  });
})

