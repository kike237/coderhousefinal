let CuponInputDescuento = document.getElementById("Cuponinput");
let totalcheckout = document.getElementById("totalcheckout");
let subtotal = document.getElementById("Subtotal");
let descuento = document.getElementById("descuento");
let listadeitems = document.getElementById("itemlist");
let divpokemon = document.getElementById("divdecierreporqueestoycansado");

function aplicarcupon() {
  let cuponAMinuscula = CuponInputDescuento.value.toLowerCase();

  let totalConDescuentoxd = subtotal.innerHTML;
  if (cuponAMinuscula == "navidad25") {
    descuento.innerHTML = "$" + redondear(subtotal.innerHTML * 0.25);
    totalConDescuentoxd = redondear(subtotal.innerHTML * 0.75);
  }

  totalcheckout.innerHTML = totalConDescuentoxd;
}

let itemsRecoveredJSON = localStorage.getItem("productosAlCheckout");

let itemsRecovered = JSON.parse(itemsRecoveredJSON);

function redondear(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function printCart() {
  if (itemsRecovered.length == 0) {
    return;
  } else {
    let element = document.getElementById("itemlist");
    element.innerHTML = "";
    let subTotalValue = 0;
    itemsRecovered.forEach((product) => {
      let currentProduct = itemsRecovered.find((x) => x.id == product.id);
      element.innerHTML =
        element.innerHTML +
        "<div class='checkoutelement'><div class='checkoutinfo'><h3>" +
        currentProduct.nombre +
        "</h3><p>" +
        currentProduct.cantidad +
        "x $" +
        redondear(currentProduct.precio) +
        "</p></div></div>";
      subTotalValue += redondear(
        currentProduct.precio * currentProduct.cantidad
      );
    });
    subtotal.innerHTML = subTotalValue;
    aplicarcupon();
  }
}

function testing(){console.log("testing")};

printCart();

function completarcompra() {
  if (itemsRecovered.length == 0) {
    Toastify({
      text: "Amigo, que vas a pagar si no tienes nada en el carro xd?",
      duration: 3000,
      newWindow: true,
      position: "center",
      close: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    var pokemon;
    let randomNumber = Math.floor(Math.random() * 905) + 1;

    fetch("https://pokeapi.co/api/v2/pokemon/" + randomNumber)
      .then((response) => response.json())
      .then((data) => {
        pokemon = data;
      })
      .then(() => {
        listadeitems.innerHTML =
          
          `<center><br><p>Gracias por perder tu tiempo en tienda ficticia, ten estos datos inutiles de una API de pokemon:</p>

          <img src=${pokemon["sprites"]["front_default"]}></img>
            
          <p>Nombre: ${pokemon["name"]}</p>

          <p>Numero: ${pokemon["id"]}</p>

          <p>Peso: ${pokemon["weight"]}</p>

          <p>Altura: ${pokemon["height"]}</p>
          
          <p>Recuerde calificar esta entrega con la mayor nota, funciona perfecto (y)</p>
          
          <a href="ProductPage.html"><button type="button"  onclick="limpiarStore()"class="botonfinalcheckout">Volver a la tienda</button></a></center>
`;
      });
  }
}
