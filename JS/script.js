//import { Tempo } from 'tempo';

//COMANDA por Nicolás Alberto Gulo

//Inicializacion de variables Globales
const btnAgregar = document.getElementById('btn-agregar-producto');
const btnEnviar = document.getElementById('btn-enviar');

const inputProducto = document.getElementById('producto');
const inputValor = document.getElementById('valor');
const inputNombre = document.getElementById('nombre-cliente')
const inputTime = document.getElementById('time')
const inputComentarios = document.getElementById('comentarios-cliente')

const carrito = document.getElementById('carrito');
const totalCarrito = document.getElementById('total-carrito');
const cocina = document.getElementById('lista-cocina');
var codigoDePedido = 0;

//Inicializacion de arrays Globales
let productosEnCarrito = [];
let pedido = [];
let listaPedidosEnCocina = []
let listaPedidosDespachados = []


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

//Declaracion de objeto de tipo Pedido con funcion constructora.
class Pedido {
    static contadorPedidos = 0;

    constructor(nombreCliente, horarioDespachoPedido, arrayDeProductos, valorTotal, comentariosDelPedido) {

        this.codigoDePedido = Pedido.contadorPedidos++;
        this.nombreCliente = nombreCliente;
        this.horarioDespachoPedido = horarioDespachoPedido;
        this.arrayDeProductos = arrayDeProductos;
        this.valorTotal = valorTotal;
        this.comentariosDelPedido = comentariosDelPedido;
    }
}

//Atajos segun combinacion de teclas
document.addEventListener("keydown", (event) => {
    if (event.altKey && event.key >= '1' && event.key <= '9') {
        event.preventDefault();

        const indice = parseInt(event.key) - 1; // Convertimos la tecla a un número y restamos 1 para obtener el índice

        const botonEliminar = document.querySelector(`[data-id="eliminar-${indice}"]`);

        if (botonEliminar) {
            botonEliminar.click();
            // actualizarIndex();
            actualizarIndexDeCarrito();
            calcularTotal();
        } else {
            console.log('No se encontró un botón para el índice especificado.');
        }
    }




    //CTRL ALT + → FOCUS EN INPUT NOMBRE PRODUCTO
    if (event.key === "+" && event.ctrlKey && event.altKey) {
        event.preventDefault();
        inputProducto.focus();
    }

    //CTRL ALT 1 → INGRESAR PRODUCTO A CARRITO
    if (event.key === "1" && event.ctrlKey && event.altKey) {
        event.preventDefault();
        btnAgregar.click();
    }

    //CTRL ALT 0 → ENVIAR PEDIDO A COCINA
    if (event.key === "0" && event.ctrlKey && event.altKey) {
        event.preventDefault();
        btnEnviar.click();
    }

    //CTRL ALT 0 → ENVIAR PEDIDO A COCINA
    if (event.key === "0" && event.ctrlKey && event.altKey) {
        event.preventDefault();
        btnEnviar.click();
    }
});



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


//Limpiar Inputs de pedido
function limpiarInputsPedido() {
    inputProducto.value = '';
    inputValor.value = '';
    inputNombre.value = '';
    inputTime.value = '';
    inputComentarios.value = '';
}

//Limpiar Inputs de producto
function limpiarInputsProducto() {
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

//Limpiar todos los pedidos de cocina.
function limpiarPedidosDeCocina() {
    while (cocina.firstChild) {
        cocina.removeChild(cocina.firstChild);
    }
}

//Limpia todo el sector de recepcion.
function limpiarRecepcion() {
    console.log('Se limpia HTML, Inputs de y Array. Ademas se lleva a 0 la cuenta.');

    limpiarCarritoHTML();
    limpiarInputsPedido();
    limpiarCarritoDeProductos();
    calcularTotal();
}

//Borra contenido HTML para no superponer valores antigüos con los nuevos.
function limpiarCarritoHTML() {
    while (carrito.firstChild) {
        carrito.removeChild(carrito.firstChild);
    }
}

//Imprime en consola todos los items del array. (Funcion para inspecionar).
function actualizarIndexDeCarrito() {
    productosEnCarrito.forEach((item, indice) => {
        item.codigo = indice;
    });
}

//Organiza el index para que no se borren elementos indebidos
function actualizarIndex() {
    const lista = document.getElementById('carrito')
    const elementosLi = Array.from(lista.children);


    if (elementosLi.length > 0) {
        elementosLi.forEach((li, indice) => {
            const boton = li.getElementsByTagName('button')[0];
            boton.dataset.index = indice;
            boton.dataset.id = `eliminar-${indice}`;

            li.innerHTML.textContent = `Indice ${indice} --- producto ${li.nombre} --- Valor $${li.valor}`;

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
    botonEliminarItem.dataset.id = `eliminar-${indice}`;

    botonEliminarItem.addEventListener('click', () => {
        const indice = botonEliminarItem.dataset.index;
        productosEnCarrito.splice(indice, 1);
        carrito.removeChild(item);

        limpiarInputsProducto();
        limpiarCarritoHTML();
        actualizarPedido();
        actualizarIndexDeCarrito();
        calcularTotal();
    });

    item.appendChild(botonEliminarItem);
    carrito.appendChild(item);

    calcularTotal();
}


//Funcion para agregar el pedido al listado HTML
function agregarPedidoACocina(pedido) {

    const item = document.createElement('li');
    item.innerHTML = `
    Pedido N°: ${pedido.codigoDePedido} 
    Nombre: ${pedido.nombreCliente}
    Hora: ${pedido.horarioDespachoPedido}
    ${pedido.valorTotal}
    Comentarios: ${pedido.comentariosDelPedido}
    `;

    pedido.arrayDeProductos.forEach((producto) => {
        const itemDelProducto = document.createElement('li');
        itemDelProducto.innerHTML = `Codigo: ${producto.codigo}   Nombre: ${producto.nombre}   Valor: $${producto.valor}`;

        item.appendChild(itemDelProducto);
    })

    cocina.appendChild(item);
    limpiarRecepcion();
}

//Actualiza el listado de items en el pedido (ejecuta agregaItemAlPedido)
function actualizarPedido() {
    productosEnCarrito.forEach((producto, indice) => {
        agregaItemAlPedido(producto, indice);
        actualizarIndexDeCarrito();
        // actualizarIndex();

    });

}


//Se ejecuta el siguiente codigo cuando se desea ingresar un nuevo producto al carrito
btnAgregar.addEventListener('click', () => {

    //Crear un producto solo si los datos son suficientes para su creacion
    if (producto !== '' && valor !== '') {

        console.log('Se agregara un nuevo producto al pedido');
        const producto = inputProducto.value;
        const valor = inputValor.value;

        // Crea un nuevo objeto para representar el producto y el valor ingresado
        const nuevoProducto = new Producto(producto, valor);

        // El producto nuevo es ingresado al array llamado "productosEnCarrito"
        productosEnCarrito.push(nuevoProducto);

        limpiarInputsProducto();
        limpiarCarritoHTML();
        actualizarPedido();
        actualizarIndexDeCarrito();
        calcularTotal();

    }
});


//2da parte -> Llevar un pedido con el boton de ENVIAR PEDIDO a una nueva lista englobado en un div para que se despache con otro boton de la pestaña COCINA
btnEnviar.addEventListener('click', () => {
    if (productosEnCarrito.length !== 0) {
        console.log('Se agrega un nuevo pedido a cocina')

        //Se guarda en variables los datos de la compra y el cliente
        const cliente = inputNombre.value;
        const hora = inputTime.value;
        const compra = productosEnCarrito;
        const totalCompra = totalCarrito.innerHTML;
        const comentarios = inputComentarios.value;


        //crear instancia de objeto de tipo Pedido para agregar al listado de pedidos en Cocina
        const nuevoPedido = new Pedido(cliente, hora, compra, totalCompra, comentarios);

        //Agrega el nuevo pedido a la lista
        listaPedidosEnCocina.push(nuevoPedido);

        //Agrega el nuevo pedido a la lista HTML
        agregarPedidoACocina(nuevoPedido);

        //Se limpia el contenido del carrito para agregar el proximo pedido con productos
        limpiarCarritoDeProductos();

        //Se limpia inputs para habilitar la nueva toma de pedidos
        limpiarRecepcion();
    }
});