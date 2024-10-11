//import { Tempo } from 'tempo';

const btnAgregar = document.getElementById('btn-producto');
const btnEnviar = document.getElementById('btn-enviar');
const inputProducto = document.getElementById('producto');
const inputValor = document.getElementById('valor');
const carrito = document.getElementById('carrito');
const totalCarrito = document.getElementById('total-carrito');
let productosEnCarrito = [];


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

function calcularTotal() {
    let total = 0;
    productosEnCarrito.forEach(producto => {
        total += parseFloat(producto.valor);
    });
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

btnAgregar.addEventListener('click', () => {
    const producto = inputProducto.value;
    const valor = inputValor.value;

    //Crear un producto solo si los datos son suficientes para su creacion
    if (producto !== '' && valor !== '') {
        // Crear un objeto para representar el producto y su valor
        const nuevoProducto = new Producto(producto, valor)


        // Agregar el nuevo producto al arreglo
        productosEnCarrito.push(nuevoProducto);

        // Limpiar los inputs
        inputProducto.value = '';
        inputValor.value = '';

        //limpia listado "carrito" para no duplicar items en la lista HTML. 
        //El array productosEnCarrito sera quien defina que objetos siguen en la lista y cuales no.
        while (carrito.firstChild) {
            carrito.removeChild(carrito.firstChild);
        }




        // Crear elementos de lista y agregarlos al carrito
        productosEnCarrito.forEach((nuevoProducto, index) => {

            const item = document.createElement('li');
            item.innerHTML = `Nombre: ${nuevoProducto.nombre}, Precio $${nuevoProducto.valor} <button class=btn-remove data-index="${index}">Eliminar</button>`
            carrito.appendChild(item)
            calcularTotal()

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
});
calcularTotal()









// btnEnviar.addEventListener('click',() =>{})


