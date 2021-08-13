

let socket = io.connect('http://localhost:8000', { forceNew: true });


socket.on('askProduct')

 const sendProduct = (e) => {
    
    console.log('entre')
    const title     = document.getElementById('title')
    const price     = document.getElementById('price')
    const thumbnail = document.getElementById('thumbnail')
    if(title) console.log(title,'si existo')
    const product = { title:title.value, price:price.value , thumbnail:thumbnail.value }
    console.log(title,'asd')
    socket.emit('new-product',product)
    
    
}
const render = (productos) => {
    let html = productos.map(producto=> {
        return  `<tr>
            <td(scope="col")>${producto.title}</td>
            <td(scope="col")>${producto.price}</td>
            <td(scope="col")>${producto.thumbnail}</td>
        </tr>`  
    })
    .join('')
    document.getElementById('table_body').innerHTML = html
}


socket.on('products', (productos)=> {
    
    render(productos);
  });