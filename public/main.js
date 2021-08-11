
let socket = io.connect();



socket.on('askProduct')

export const sendProduct = (e) => {
    const title = document.getElementById('title')
    const price = document.getElementById('price')
    const thumbnail = document.getElementById('thumbnail')
    const product = { title:title.value, price:price.value , thumbnail:thumbnail.value }

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