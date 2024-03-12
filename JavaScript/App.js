// Lista de productos de la carta del Cafe, (dividido en secciones)
const secciones = {
    "Cafes": [
        { id: '1', nombre: 'Café Solo', precio: 1.3, cantidad: 100 },
        { id: '2', nombre: 'Cafe Americano', precio: 1.3, cantidad: 80 },
        { id: '3', nombre: 'Cortado', precio: 1.3, cantidad: 100 },
        { id: '4', nombre: 'Cafe con Leche', precio: 1.5, cantidad: 250 },
    ],
    // Agregar más secciones según sea necesario
};

// Variables globales
let comanda = [];

// Función para agregar un producto a la comanda
const agregarComanda = (id) => {
    const productoEnComanda = secciones["Cafes"].find(producto => producto.id === id);

    if (productoEnComanda && productoEnComanda.cantidad > 0) {
        productoEnComanda.cantidad--;

        const productoComanda = {
            id: productoEnComanda.id,
            nombre: productoEnComanda.nombre,
            precio: productoEnComanda.precio
        };

        comanda.push(productoComanda);

        renderizarComanda();
        actualizarLocalStorage();
    } else {
        alert('¡Producto agotado, quiebre de stock!');
    }
};

// Función para renderizar los productos en la carta
const renderizarProductos = () => {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';

    for (const seccion in secciones) {
        const h2 = document.createElement('h2');
        h2.textContent = seccion;
        listaProductos.appendChild(h2);

        secciones[seccion].forEach(producto => {
            const button = document.createElement('button');
            button.classList.add('realizarComanda');
            button.setAttribute('data-id', producto.id);
            button.textContent = producto.nombre;

            const h3 = document.createElement('h3');
            h3.appendChild(button);
            listaProductos.appendChild(h3);
        });
    }
};

// Función para renderizar la comanda
const renderizarComanda = () => {
    const listaComanda = document.getElementById('listaComanda');
    const totalElemento = document.getElementById('total');

    listaComanda.innerHTML = '';

    const terminoBusqueda = document.getElementById('buscar').value.toLowerCase();
    const productosFiltrados = comanda.filter(producto => producto.nombre.toLowerCase().includes(terminoBusqueda));

    if (productosFiltrados.length > 0) {
        productosFiltrados.forEach(producto => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - ${producto.precio} e`;
            listaComanda.appendChild(li);
        });

        const total = productosFiltrados.reduce((sum, producto) => sum + producto.precio, 0);
        totalElemento.textContent = total;
    } else {
        const li = document.createElement('li');
        li.textContent = 'Pregunta qué quieren beber?';
        listaComanda.appendChild(li);
        totalElemento.textContent = '';
    }
};

// Función para vaciar la Comanda
const vaciarComanda = () => {
    comanda = [];
    renderizarComanda();
    actualizarLocalStorage();
};

// Función para realizar la comanda
const realizarComanda = () => {
    alert('Pedido solicitado. ¡Gracias!');
    vaciarComanda();
};

// Función para actualizar el local storage
const actualizarLocalStorage = () => {
    localStorage.setItem('comanda', JSON.stringify(comanda));
};

// Cargar comanda desde el local storage al cargar la página
comanda = JSON.parse(localStorage.getItem('comanda')) || [];

// Eventos
document.getElementById('listaProductos').addEventListener('click', (event) => {
    if (event.target.classList.contains('realizarComanda')) {
        const id = event.target.getAttribute('data-id');
        agregarComanda(id);
    }
});

document.getElementById('vaciarComanda').addEventListener('click', () => {
    vaciarComanda();
});

document.getElementById('realizarComanda').addEventListener('click', () => {
    realizarComanda();
});

document.getElementById('buscar').addEventListener('input', () => {
    renderizarComanda();
});

window.onload = () => {
    renderizarProductos();
    renderizarComanda();
};
