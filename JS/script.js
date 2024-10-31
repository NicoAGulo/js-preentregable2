//import { Tempo } from 'tempo';

//COMANDA por Nicolás Alberto Gulo

//Inicializacion de variables Globales
const btnAgregar = document.getElementById('btn-agregar-producto');
const btnEnviar = document.getElementById('btn-enviar');
const inputProducto = document.getElementById('producto');
const inputValor = document.getElementById('valor');
const carrito = document.getElementById('carrito');
const totalCarrito = document.getElementById('total-carrito');
const cocina = document.getElementById('lista-cocina');

let productosEnCarrito = [];











//Declaracion de objeto de tipo Producto con funcion constructora.
class Producto {
    static contadorProductos = 0;

    constructor(nombre, valor) {
        this.codigo = Producto.contadorProductos++;
        this.nombre = nombre
        this.valor = valor
        let disponible = true

        this.consultarDisponibilidad = function () {
            return disponible;
        }

        this.cambiarDisponibilidad = function () {
            disponible = !disponible;
        }
    }
}

//Suma de los valores de productos ingresados a "productosEnCarrito".
function calcularTotal() {
    console.log('Se ejecuto un calcularTotal()')
    let total = 0;
    productosEnCarrito.forEach(producto => {
        total += parseFloat(producto.valor);
    });
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    console.log(`El total es ${totalCarrito.textContent}`);
}

//Borra contenido HTML del elemento de id "carrito".
function limpiarCarritoHTML() {
    // console.log('Se procedera a limpiar el contenido HTML del carrito')
    while (carrito.firstChild) {
        carrito.removeChild(carrito.firstChild);
    }
    // console.log('Se limpio carrito')
}

//Imprime en consola todos los items del array.
function recorrerContenidoDeArray(arrayARecorrer) {
    arrayARecorrer.forEach((item) => {
        console.log(`Item: ${item}`);
    });
}

//Limpia Inputs
function limpiarInputs() {
    inputProducto.value = '';
    inputValor.value = '';
    // console.log('Inputs limpios');

}

//Limpiar todos los items del carrito.
function limpiarCarritoDeProductos() {
    console.log('Se procede a resetear productos del carrito (array)');

    productosEnCarrito = [];
    console.log('El array "productosEnCarrito[]" se reseteo correctamente');
}

//Limpia todo el sector de recepcion.
function limpiarRecepcion() {
    console.log('Se limpia HTML, Inputs y Array. Ademas se lleva a 0 la cuenta.');

    limpiarCarritoHTML();
    limpiarInputs();
    limpiarCarritoDeProductos();
    calcularTotal();
}

//Organiza el index para que no se borren elementos indebidos
function actualizarIndex() {
    const lista = document.getElementById('carrito')
    const elementosLi = Array.from(lista.children);


    if (elementosLi.length > 0) {
        elementosLi.forEach((li, indice) => {
            const boton = li.getElementsByTagName('button')[0];
            boton.dataset.index = indice;
        });
    }
}

//Agrega un item al pedido
function agregaItemAlPedido(elemento, indice) {
    const item = document.createElement('li');
    item.textContent = `Indice ${indice} --- producto ${elemento.nombre} --- Valor $${elemento.valor}`;

    const botonEliminarItem = document.createElement('button');
    botonEliminarItem.textContent = 'Eliminar';
    botonEliminarItem.dataset.index = indice;

    botonEliminarItem.addEventListener('click', () => {
        const indice = botonEliminarItem.dataset.index;
        productosEnCarrito.splice(indice, 1);
        carrito.removeChild(item);
        actualizarIndex();
        calcularTotal();
    });

    item.appendChild(botonEliminarItem);
    carrito.appendChild(item);

    calcularTotal();
}

//Actualiza el listado de items en el pedido (ejecuta agregaItemAlPedido)
function actualizarPedido() {
    productosEnCarrito.forEach((producto, indice) => {
        agregaItemAlPedido(producto, indice);
    });

}





//Se ejecuta el siguiente codigo cuando se desea ingresar un nuevo producto al carrito
btnAgregar.addEventListener('click', () => {
    console.log('Se agregara un nuevo producto al pedido');
    const producto = inputProducto.value;
    const valor = inputValor.value;

    //Crear un producto solo si los datos son suficientes para su creacion
    if (producto !== '' && valor !== '') {

        // Crea un nuevo objeto para representar el producto y el valor ingresado
        const nuevoProducto = new Producto(producto, valor);

        // El producto nuevo es ingresado al array llamado "productosEnCarrito"
        productosEnCarrito.push(nuevoProducto);
        limpiarInputs();
        limpiarCarritoHTML();
        actualizarPedido();
        calcularTotal();

    }
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