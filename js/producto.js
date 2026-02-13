//Autor Mario Leon
//Fecha 12 de febrero del 2026
//Descripcion:scrcrip para realizar peticon a fakeprducts, llenar la tabla con la respuesta y mostrar la imagen del producto buscado por id

//Declarar variables
const idProducto = document.getElementById("idProducto");
const titulo = document.getElementById("titulo");
const precio = document.getElementById("precio");
const descripcion = document.getElementById("descripcion");
const categoria = document.getElementById("categoria");
const totalProducto = document.getElementById('totalProducto');
const precioPromedio = document.getElementById('precioPromedio');
const tbody = document.getElementById('tbody');

const btnBuscar = document.getElementById("btnBuscar");
const pError = document.getElementById("pError");

//Definir funciones
    
//mostrar error
function mostrarError(mensaje, tiempo){
    pError.textContent = mensaje;
    pError.style.display = 'block';
    setTimeout(() => {
        pError.style.display = 'none';
    }, tiempo);
}
//Cargar todos los productos
async function cargarProductos(){
    const url = `https://fakestoreapi.com/products`;
    try {
        const response = await fetch(url, {method: 'get'});
        const data = await response.json();
        mostrarProducto(data);
    } catch (error) {
        mostrarError('Error en la petición', 3000);
    }
}

//Realizar peticion a la api para buscar por ID
async function peticion(){
    const id = idProducto.value;
    if (!id) {
        mostrarError('NO EXISTE ID', 2000);
        return;
    }
    peticionImagen();
}
async function peticionImagen() {
    const id = idProducto.value;
    const url = `https://fakestoreapi.com/products/${id}`;
    try {
        const response = await fetch(url, { method: 'get' });
        if (!response.ok) {
            throw new Error('Producto no encontrado');
        }
        const producto = await response.json();
        document.getElementById('imgProducto').src = producto.image;
    } catch (error) {
        mostrarError('NO EXISTE ID', 3000);
    }
    
}

//llenar tabla dinamicamente
function mostrarProducto(data){
    //recorre el arreglo de productos y por cada producto crea una fila con sus datos y la agrega al tbody
    data.forEach(producto => {
        const fila = document.createElement('tr');
        const tdi = document.createElement('td');
            tdi.textContent = producto.id;
            fila.appendChild(tdi);
        const tdTitulo = document.createElement('td');
            tdTitulo.textContent = producto.title;
            fila.appendChild(tdTitulo);
        const tdPrecio = document.createElement('td');
            tdPrecio.textContent = producto.price;
            fila.appendChild(tdPrecio);
        const tdDescripcion = document.createElement('td');
            tdDescripcion.textContent = producto.description;
            fila.appendChild(tdDescripcion);
        const tdCategoria = document.createElement('td');
            tdCategoria.textContent = producto.category;
            fila.appendChild(tdCategoria);
        tbody.appendChild(fila);
    });

    //Total de productos es igual a la longitud del areglo de productos
    totalProducto.textContent = `Total de productos: ${data.length}`;    

    //Calcular total de productos y precio promedio
    const totalPrecio = data.reduce((acc, producto) => acc + producto.price, 0);//filtra el arreglo de productos y suma el precio de cada producto al acumulador, iniciando en 0
    const Promedio = totalPrecio / data.length;
    precioPromedio.textContent = `Precio promedio: ${Promedio.toFixed(2)}`;
}

//Eventos
btnBuscar.addEventListener('click', peticion);

//Definir funcion principal
function main(){
    cargarProductos();
}
//llamar a la funcion principal
main();


