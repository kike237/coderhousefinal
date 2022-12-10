class Producto {
  constructor(nombre, precio, id, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
    this.cantidad = cantidad;
  }
}

const toallas = new Producto("Toallas Microfibra", 19.99, 0, 0);
const wax = new Producto("Spray Wax", 24.95, 1, 0);
const fqc = new Producto("Fortify Quick Coat", 15.95, 2, 0);
const ptg = new Producto("Pristine Tire Gel", 19.99, 3, 0);

let itemsOncart = [];

// let subTotalCarrito = itemsOncart.reduce(
//   (acumulador, currentvalue) => acumulador + currentvalue.precio,
//   0
// );

const products = [toallas, wax, fqc, ptg];

let botonCarritoComprarYa = document.getElementById("compraryacarrito");
let botonCarritoAgregarMas = document.getElementById("agregarmascarrito");
let botonAplicarDescuento = document.getElementById("aplicardescuentoboton");
let botonAgregarWax = document.getElementById("botonagregarwax");
let botonAgregarFqc = document.getElementById("botonagregarfqc");
let botonAgregarPtg = document.getElementById("botonagregarptg");
let botonAgregarMain = document.getElementById("agregarcarritomain");
let subtotal = document.getElementById("subtotal");
let limpiarcarrito = document.getElementById("limpiarcarrito");

function toggleCart() {
  let element = document.getElementById("CarritoImprovisado");
  element.classList.toggle("show");
}

let productosAlCheckout = [];

// Lista de productos en el carrito por ID

function addToCart(id) {
  let currentItem = itemsOncart.find((element) => element.id == id);
  if (currentItem) {
    currentItem.total += 1;
  } else {
    itemsOncart.push({
      id: id,
      total: 1,
    });
  }
  localStorage.setItem("itemsOncart", JSON.stringify(itemsOncart));
  printCart();
  
  Toastify({
    text: "Producto Agregado Al Carrito Con Exito",
    duration: 3000,
    newWindow: true,
    position: "right",
    close: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}

function printCart() {
  let element = document.getElementById("element-list");
  element.innerHTML = "";
  let subTotalValue = 0;
  itemsOncart.forEach((product) => {
    let currentProduct = products.find((x) => x.id == product.id);
    element.innerHTML =
      element.innerHTML +
      "<div class='arreglar'><div class='element'><div class='info'><h3>" +
      currentProduct.nombre +
      "</h3><p>" +
      product.total +
      "x $" +
      redondear(currentProduct.precio * product.total) +
      "</p></div></div><hr></div>";
    subTotalValue += currentProduct.precio * product.total;
  });
  subtotal.innerHTML = redondear(subTotalValue);
}

function handleClick(id) {
  addToCart(id);

  let validacionCarrito = productosAlCheckout.find((element) => element.id == id);

  if (validacionCarrito) {
    validacionCarrito["cantidad"]++;
    console.log(productosAlCheckout);
  } else {
    productosAlCheckout.push(products[id]);
    productosAlCheckout.find((element) => element.id == id)["cantidad"]++;
  }
}

// productosAlCheckout.push(function (){
//   if(validacionCarrito)
//   validacionCarrito[cantidad]++;

document.addEventListener("DOMContentLoaded", function () {
  let caca = localStorage.getItem("itemsOncart");
  if (caca) {
    itemsOncart.push(...JSON.parse(caca));
    printCart();
  }
});

function limpiarCarritoDelStorage() {
  localStorage.clear();
  itemsOncart = [];
  printCart();
}

let productinCarrito = [];

function redondear(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

// localStorage.setItem("productosAlCheckout",JSON.stringify(productosAlCheckout));

function irAPagar () {
  localStorage.setItem("productosAlCheckout",JSON.stringify(productosAlCheckout));
}

