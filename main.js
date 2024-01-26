/** @format */

let name;
let selectedProduct;
let quantity;
let selectTerm;

let productsArray = [
    { name: "Echo Dot 1° generación $999.00", precio: 999, id: 1 },
    { name: "Echo Dot 3° generación $1,600.00", precio: 1600, id: 2 },
    { name: "Echo Dot 5° generación $2,500.00", precio: 2500, id: 3 },
    { name: "Generador de hologramas $1,999.00", precio: 1999, id: 4 },
    { name: "Luz RGB $300.00", precio: 300, id: 5 },
    { name: "Enchufe inteligente $400.00", precio: 400, id: 6 },
    { name: "Quiero buscar mi producto por el nombre", id: 7 },
];

function saludar() {
    name = prompt("¡¡Hola!! Veo que quieres comprar algo, ¿cómo te llamas?");
    alert(
        "Hola " +
            name +
            ", selecciona el producto que te interesa con el número del producto"
    );
}

function selectProduct() {
    let productOptions = "";
    for (let i = 0; i < productsArray.length; i++) {
        productOptions += i + 1 + ". " + productsArray[i].name + "\n";
    }

    let selectedProductId = prompt(
        "¿Cuál de los siguientes productos te interesa comprar?\n" +
            productOptions
    );

    selectedProductId = parseInt(selectedProductId);
    if (selectedProductId >= 1 && selectedProductId <= 7) {
        if (selectedProductId === 7) {
            filterProducts();
            selectProduct();
        } else {
            selectedProduct = productsArray[selectedProductId - 1];
            alert(name + " seleccionaste " + selectedProduct.name);
            enterQuantity();
        }
    } else {
        alert("Seleccionaste un número de producto no válido.");
    }
}

function filterProducts() {
    const searchProduct = prompt("Escribe el nombre del producto que buscas:");

    const foundProducts = productsArray.filter((product) => {
        return product.name.toLowerCase().includes(searchProduct.toLowerCase());
    });

    if (foundProducts.length > 0) {
        let message = "Los productos encontrados son:\n";
        foundProducts.forEach((product) => {
            message += `${product.id}. ${product.name}\n`;
        });
        alert(message);
    } else {
        alert("No se encontraron productos con ese nombre.");
    }
}

function enterQuantity() {
    quantity = prompt(
        "¿Cuántos productos de " +
            selectedProduct.name +
            " te interesa comprar?"
    );

    quantity = parseInt(quantity);
    if (isNaN(quantity) || quantity <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        enterQuantity();
        return;
    }

    alert("Perfecto, el total será $" + selectedProduct.precio * quantity);
    calculateTerm();
}

function calculateTerm() {
    let amountPayable = selectedProduct.precio * quantity;

    if (amountPayable >= 1 && amountPayable <= 999) {
        selectTerm = 2;
    } else if (amountPayable >= 1000 && amountPayable <= 2000) {
        selectTerm = 3;
    } else if (amountPayable >= 2001 && amountPayable <= 3500) {
        selectTerm = 6;
    } else if (amountPayable >= 3501 && amountPayable <= 5000) {
        selectTerm = 9;
    } else if (amountPayable >= 5001) {
        selectTerm = 12;
    }

    enterTerm();
}

function enterTerm() {
    let chosenTerm = prompt(
        "Selecciona el plazo de pago entre " + selectTerm + " y 1"
    );

    chosenTerm = parseInt(chosenTerm);

    if (isNaN(chosenTerm) || (chosenTerm !== selectTerm && chosenTerm !== 1)) {
        alert("Por favor, ingresa un plazo válido: " + selectTerm + " o 1.");
        enterTerm();
    } else {
        alert(
            "Perfecto, pagarás en " +
                chosenTerm +
                " mensualidades de un monto de $" +
                (selectedProduct.precio * quantity) / chosenTerm
        );
    }
}

saludar();
selectProduct();
