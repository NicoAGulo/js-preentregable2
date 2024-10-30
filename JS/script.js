//import { Tempo } from 'tempo';

const btnAgregar = document.getElementById('btn-agregar-producto');
const btnEnviar = document.getElementById('btn-enviar');
const inputProducto = document.getElementById('producto');
const inputValor = document.getElementById('valor');
const carrito = document.getElementById('carrito');
const totalCarrito = document.getElementById('total-carrito');
const cocina = document.getElementById('lista-cocina');

let productosEnCarrito = [];

//Objeto que sera consultado para saber su nombre, su valor y su disponibilidad
class Producto {
    constructor(nombre, valor) {
        this.nombre = nombre
        this.valor = valor
        let disponible = true

        this.estaDisponible = function () {
            return disponible;
        }

        this.cambiarDisponibilidad = function () {
            disponible = !disponible;
        }
    }
}

//suma de los valores de productos ingresados a "productosEnCarrito"
function calcularTotal() {
    let total = 0;
    productosEnCarrito.forEach(producto => {
        total += parseFloat(producto.valor);
    });
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}


//Borra contenido HTML del elemento de id "carrito"
function limpiarCarritoHTML() {
    while (carrito.firstChild) {
        carrito.removeChild(carrito.firstChild);
    }
}


function limpiarInputs() {
    inputProducto.value = '';
    inputValor.value = '';
}

function limpiarCarritoDeProductos() {
    productosEnCarrito = [];
}

function limpiarRecepcion() {
    limpiarCarritoHTML();
    limpiarInputs();
    limpiarCarritoDeProductos();
    calcularTotal();
}

//Se ejecuta el siguiente codigo cuando se desea ingresar un nuevo producto al carrito
btnAgregar.addEventListener('click', () => {
    const producto = inputProducto.value;
    const valor = inputValor.value;

    //Crear un producto solo si los datos son suficientes para su creacion
    if (producto !== '' && valor !== '') {
        // Crea un nuevo objeto para representar el producto y el valor ingresado
        const nuevoProducto = new Producto(producto, valor)


        // El producto nuevo es ingresado al array llamado "productosEnCarrito"
        productosEnCarrito.push(nuevoProducto);

        // Limpiar los inputs
        limpiarInputs();

        //limpia listado "carrito" para no duplicar items en la lista HTML. 
        //El array productosEnCarrito sera quien defina que objetos siguen en la lista y cuales no.
        limpiarCarritoHTML();




        // Crear elementos de lista y agregarlo al listado de tipo CARRITO
        productosEnCarrito.forEach((nuevoProducto, index) => {

            const item = document.createElement('li');
            item.innerHTML = `Nombre: ${nuevoProducto.nombre}, Precio $${nuevoProducto.valor} <button class=btn-remove="${index}">Eliminar</button>`;
            carrito.appendChild(item);
            calcularTotal();

            //Se determina cuales son los botones que sirven para eliminar alguno de los productos de la lista
            botonesEliminar = document.querySelectorAll('.btn-remove');

            //Se utiliza el listener para que el boton que es clickeado referencie al index del elemento y de esta manera con ese dato eliminar el producto.
            carrito.addEventListener('click', (event) => {
                if (event.target.classList.contains('btn-remove')) {
                    const boton = event.target;
                    const indice = boton.dataset.index;

                    // Eliminar el producto del array
                    productosEnCarrito.splice(indice, 1);
                    boton.parentNode.remove();

                    // Actualizar los índices de los botones restantes
                    actualizarIndices();

                    //Calcular nuevamente el valor total de la lista de productos
                    calcularTotal();

                }

                // Función para actualizar los índices de los botones
                function actualizarIndices() {
                    botonesEliminar = document.querySelectorAll('.btn-remove');
                    botonesEliminar.forEach((boton, nuevoIndice) => {
                        boton.dataset.index = nuevoIndice;
                    });
                }
            });
        });
    }
    calcularTotal()
});


//2da parte -> Llevar un pedido con el boton de ENVIAR PEDIDO a una nueva lista englobado en un div para que se despache con otro boton de la pestaña COCINA


btnEnviar.addEventListener('click', () => {
    const nuevoPedido = document.getElementById('carrito');

    let contenedorDePedidoACocinar = document.createElement('div');
    contenedorDePedidoACocinar.innerHTML = nuevoPedido.innerHTML;
    contenedorDePedidoACocinar.innerHTML += `<button>PEDIDO FINALIZADO</button>`;



    cocina.appendChild(contenedorDePedidoACocinar);


    limpiarRecepcion();
});


