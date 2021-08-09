import express from 'express';


import Product from '../Productos'

const products = new Product()
const router = express.Router();



  router.get('/productos/listar', (req, res) => {
  let productos =  products.leerProductos()
     res.json({
      productos 
     });
   });


router.put('/productos/actualizar/:id', (req, res) => {
  const {id} = req.params
  
  const {title,price,thumbnail} = req.body

  const productoActualizado = products.actualizarProducto(title,price,thumbnail,id)

  if(!productoActualizado) return res.json({msg: 'Producto no existe '})
  else{
    res.json({
      productoActualizado
    });

  }
   
});

router.delete('/productos/borrar/:id', (req, res) => {
 const {id}= req.params

  const productoBorrado = products.eliminarProducto(id)

    if( !productoBorrado ) res.json({msg: 'Producto no existe o ya fue eliminado '})
    
     res.json({
       msg:'Usuario Eliminado',
       productoBorrado
     });
});

router.post('/productos/guardar', (req, res) => {
  console.log(req.body)
	const {title,price,thumbnail} = req.body;

  products.guardarProducto(title,price,thumbnail)
	
	res.redirect('/api/productos/vista');
});


router.get('/productos/vista', (req, res) => {
  let productos =  products.leerProductos()
   if(productos ===[] ) res.render("index",{mensaje:'No hay productos'})
   
        res.render("index", {productos} );
})
export default router;