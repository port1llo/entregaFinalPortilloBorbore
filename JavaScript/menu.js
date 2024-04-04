//Variables globales

let productos = [];


// Función para cargar los datos desde el archivo JSON
const cargarDatosDesdeJSON = () => {
    fetch('../JASON/archivo.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            renderizarProductos();
        })
        .catch(error => console.error('Error al cargar los datos desde el archivo JSON:', error));
};

// Función para renderizar los productos en la carta
const renderizarProductos = () => {
    const listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';

    const categorias = {};

    // Organizar productos por categoría
    productos.forEach(producto => {
        if (!categorias[producto.tipo]) {
            categorias[producto.tipo] = [];
        }
        categorias[producto.tipo].push(producto);
    });

    // Renderizar productos por categoría
    for (const categoria in categorias) {
        const divCategoria = document.createElement('div');
        divCategoria.classList.add('categoria');
        divCategoria.dataset.categoria = categoria;

        const h2 = document.createElement('h2');
        h2.textContent = categoria;
        divCategoria.appendChild(h2);

        categorias[categoria].forEach(producto => {
            const button = document.createElement('button');
            button.classList.add('realizarComanda');
            button.setAttribute('data-id', producto.id);
            button.textContent = producto.nombre;

            const img = document.createElement('img');
            img.src = producto.imagen;
            img.alt = producto.nombre;
            img.classList.add('producto-imagen');

            const div = document.createElement('div');
            div.appendChild(img);
            div.appendChild(button);

            const h3 = document.createElement('h3');
            h3.appendChild(div);
            divCategoria.appendChild(h3);
        });

        listaProductos.appendChild(divCategoria);
    }

    // Ocultar todos los productos excepto el de la primera categoría
    const categoriasBotones = document.querySelectorAll('.btn-categoria');
    categoriasBotones.forEach((btn, index) => {
        if (index !== 0) {
            const categoria = btn.dataset.categoria;
            const productosCategoria = document.querySelectorAll(`.categoria[data-categoria="${categoria}"]`);
            productosCategoria.forEach(producto => producto.style.display = 'none');
        }
    });

    // Agregar evento de clic a los botones de categoría
    categoriasBotones.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.dataset.categoria;
            const productosCategoria = document.querySelectorAll(`.categoria[data-categoria="${categoria}"]`);

            // Mostrar solo los productos de la categoría seleccionada
            productosCategoria.forEach(producto => {
                if (producto.style.display === 'none') {
                    producto.style.display = 'block';
                    console.log(producto);
                } else {
                    producto.style.display = 'none';
                }
            });
        });
    });
};

// Agregar evento de clic al botón de búsqueda
document.querySelector('.input-group-append button').addEventListener('click', () => {
    // Obtener el valor ingresado en el campo de búsqueda
    const valorBusqueda = document.getElementById('buscar').value.toLowerCase().trim();

    // Recorrer los productos por categoría
    const productosCategoria = document.querySelectorAll('.categoria');
    productosCategoria.forEach(categoria => {
        const productos = categoria.querySelectorAll('.realizarComanda');
        productos.forEach(producto => {
            // Obtener el nombre del producto y convertirlo a minúsculas para comparar
            const nombreProducto = producto.textContent.toLowerCase();
            // Mostrar solo los productos que coincidan con el texto de búsqueda
            if (nombreProducto.includes(valorBusqueda)) {
                producto.closest('.categoria').style.display = 'block';
            } else {
                producto.closest('.categoria').style.display = 'none';
            }
        });
    });
});



document.getElementById('buscar').addEventListener('input', () => {
    renderizarComanda();
});


// Llamar a cargarDatosDesdeJSON al cargar la página
window.onload = () => {
    cargarDatosDesdeJSON();
    renderizarComanda();
};