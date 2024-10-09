//import { Tempo } from 'tempo';

const btnAgregar = document.getElementById('btn-producto');
const inputProducto = document.getElementById('producto');
const inputValor = document.getElementById('valor');
const carrito = document.getElementById('carrito');
const totalCarrito = document.getElementById('total-carrito');
let productos = [];

btnAgregar.addEventListener('click', () => {
    const producto = inputProducto.value;
    const valor = inputValor.value;

    // Crear un objeto para representar el producto y su valor
    const nuevoProducto = {
        producto: producto,
        valor: valor
    };

    // Agregar el nuevo producto al arreglo
    productos.push(nuevoProducto);

    // Limpiar los inputs
    inputProducto.value = '';
    inputValor.value = '';

    // Crear elementos de lista y agregarlos al carrito
    let listaHTML = '';
    productos.forEach(producto => {
        listaHTML += `<li>${producto.producto} - $${producto.valor}</li>`;
    });
    carrito.innerHTML = listaHTML;

    function calcularTotal() {
        let total = 0;
        productos.forEach(producto => {
            total += parseFloat(producto.valor);
        });
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    }

    calcularTotal()
});