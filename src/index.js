import express from 'express';
import path from 'path';

import productos from './routes/productos';

/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
console.log('Server up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));




app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);


app.use('/api', productos);