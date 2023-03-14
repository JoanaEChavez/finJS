//capturas:
const contenedorProductos = document.getElementById(`contenedorProductos`)
const btnBuscador = document.getElementById (`btnBuscador`)
const buscador = document.getElementById ("buscador")
const carritoContenedor = document.getElementById (`carritoContenedor`)
const botonVaciar = document.getElementById (`vaciarCarrito`);
const contador = document.getElementById ("contador");
const botonCarrito = document.getElementsByClassName ("botonCarrito")
const precioTotal = document.getElementById ("precioTotal")
const botonProcesarCompra = document.getElementById ("procesarCompra")


let carrito = JSON.parse(localStorage.getItem ("carrito")) || [];



    productos.forEach  ((productos) => {
        const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <div id="${productos.id}"  class="card") style="width: 16rem;">
    <div class="card-img-top img-fluid">
    <img src="${productos.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
            <h5 class="card-title">${productos.nombre}</h5>
            <p class="card-text">Modelo: ${productos.modelo}</p>
            <p class="card-title" "precioProducto> Precio  ${productos.precio}</p>            
            <button id="agregar${productos.id}" class="btn btn-primary" id="botonAgregar">Agregar al carrito</button>
</div>`

contenedorProductos.appendChild(div)


const boton =  document.getElementById (`agregar${productos.id}`)

boton.addEventListener(`click`, () => {
    agregarAlCarrito(productos.id)
    
    })
})

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId) 
    if (existe){ 
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
    
    const item = productos.find((prod) => prod.id === prodId)
    
    carrito.push(item)
}
contadorCarrito()
actualizarCarrito() 
saveLocal()

}

function eliminarDelCArrito  (prodId) {
    const item = carrito.find((producto) => productos.id === prodId)
    const indice = carrito.indexOf(item)

    carrito.splice(indice,1)

    contadorCarrito()
    saveLocal()
    actualizarCarrito()
    

}


botonVaciar.addEventListener(`click`, () => {
    carrito. length  = 0
    contadorCarrito()
    saveLocal()
    actualizarCarrito ()
})

const actualizarCarrito = () => {
    carritoContenedor.innerHTML = ""


    carrito.forEach ((productos)=>{
        const div = document.createElement (`div`)
        div.className = (`productoEnCarrito`)
        div.innerHTML =`
        <div>
        <img class="img-fluid imgCarrito" src="${productos.imagen}" alt="...">
        </div>
        <div>
        <p>Nombre: ${productos.nombre}</p>
        <p>Modelo: ${productos.modelo}</p>
        <p>Precio: ${productos.precio}</p>
        <p>Cantidad: <span id="cantidad">${productos.cantidad}</span></p>
        <button onclick = "eliminarDelCArrito(${productos.id})" class ="botonEliminar">
        <i class="fas fa-trash-alt"></i></button>
        </div>`

        carritoContenedor.appendChild(div)
        

        
        
    })
        



    const total = carrito.reduce ((acc, productos) => 
        acc + productos.precio * productos.cantidad,0)

    precioTotal.innerHTML=`${total}`;

}


const contadorCarrito = () => {
    contador.style.display = "block";

    const  carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    contador.innerText = JSON.parse(localStorage.getItem ("carritoLength"));
}
contadorCarrito()
actualizarCarrito()

function procesarCompra () {
    Swal.fire({
        title: '¿Desea finalizar la compra?',
        icon: 'question',
        iconHtml: '؟',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'green',
                text: `Muchas gracias por su compra! Ha adquirido nuestros productos. `,
            })
            productosEnCarrito = []
            localStorage.removeItem("carrito")
        }else{
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `La compra no se ha completado! Sus productos estan en el carrito`,
                confirmButtonColor: 'green',
                timer:2500
            })
} actualizarCarrito()
    }
    )
}

botonProcesarCompra.addEventListener("click", () => {
    procesarCompra();
});







const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};


