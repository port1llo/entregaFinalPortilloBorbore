// Variables globales
let comanda = [];

// Función para agregar un producto a la comanda
const agregarComanda = (id) => {
    const productoEnComanda = productos.find(producto => producto.id === id);

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
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Pedido solicitado. ¡Gracias!",
        showConfirmButton: false,
        timer: 1500
    });

    // Limpiar la comanda después de realizar el pedido
    setTimeout(() => {
        vaciarComanda();
    }, 1500); // Tiempo de espera antes de limpiar la comanda (en milisegundos)
};

// Función para actualizar el local storage
const actualizarLocalStorage = () => {
    localStorage.setItem('comanda', JSON.stringify(comanda));
};

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

