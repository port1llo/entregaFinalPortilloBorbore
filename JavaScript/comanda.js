// Variables globales
let comanda = [];

/// Función para agregar un producto a la comanda
const agregarComanda = (id) => {
    const productoEnComanda = productos.find(producto => producto.id === id);
    console.log(productoEnComanda);
    if (productoEnComanda && productoEnComanda.cantidad > 0) {
        // Verificar si el producto ya está en la comanda
        const productoExistenteIndex = comanda.findIndex(item => item.id === productoEnComanda.id);
       
        if (productoExistenteIndex !== -1) {
            // Si el producto ya está en la comanda, simplemente aumentar la cantidad
            comanda[productoExistenteIndex].cantidad++;
           
        } else {
            // Si el producto no está en la comanda, agregarlo
            const productoComanda = {
                id: productoEnComanda.id,
                nombre: productoEnComanda.nombre,
                precio: productoEnComanda.precio,
                cantidad: 1 
            };
            comanda.push(productoComanda);
            
        }

        // Decrementar la cantidad disponible del producto
        productoEnComanda.cantidad--;

      


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

    let total = 0;

    comanda.forEach((producto, index) => {
        const li = document.createElement('li');
        const cantidad = producto.cantidad;
        const subtotal = producto.precio * producto.cantidad;
        li.textContent = `${producto.nombre} - ${subtotal} e (${cantidad}x)`;

        // Botón para eliminar el producto de la comanda
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Borrar Línea';
        eliminarBtn.classList.add('boton-borrar-linea');
        eliminarBtn.addEventListener('click', () => eliminarProductoComanda(index));
        li.appendChild(eliminarBtn);

        listaComanda.appendChild(li);
        total += subtotal;
    });

    totalElemento.textContent = total;
};

// Función para eliminar un producto de la comanda
const eliminarProductoComanda = (index) => {
    // Incrementar la cantidad disponible del producto
    const productoAEliminar = comanda[index];
    const productoCorrespondiente = productos.find(producto => producto.id === productoAEliminar.id);
    productoCorrespondiente.cantidad += productoAEliminar.cantidad;

    // Eliminar el producto de la comanda
    comanda.splice(index, 1);

    renderizarComanda();
    actualizarLocalStorage();
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
