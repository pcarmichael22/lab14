/* global Product, Cart */

var allProducts = [];
var selectElement = document.getElementById('items');
var myShoppingCart = [];

'use strict';

// Set up an empty cart for use on this page.
var cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

    //TODO: Add an <option> tag inside the form's select for each product
    for (var i in Product.allProducts) {
        var currentProduct = document.createElement("option");
        currentProduct.textContent = Product.allProducts[i].name;
        selectElement.appendChild(currentProduct);
    }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
    event.preventDefault(); //UPDATED BY JON
    var myProduct = event.target.items.value; //Grabs the current selected product name
    var myQuantity = event.target.quantity.value;



    // Do all the things ...
    addSelectedItemToCart(myProduct, myQuantity)

    // TODO: Prevent the page from reloading

    // Do all the things ...
    cart.saveToLocalStorage();
    updateCounter();
    updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart(myProduct, myQuantity) {
    var myItems = `name: ${myProduct}, quantity: ${myQuantity}`;
    cart.items.push(myItems);
    var selectedItem = JSON.stringify(cart);
    localStorage.setItem('product', selectedItem);

    // TODO: using those, add one item to the Cart
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {

    // TODO: Get the item and quantity from the form
    var getProduct = localStorage.getItem('product');
    var parsedProduct = JSON.parse(getProduct);
    console.log(parsedProduct)
        // TODO: Add a new element to the cartContents div with that information
    var ulEl = document.createElement('ul');
    var cartDivEl = document.getElementById('cartContents');
    cartDivEl.appendChild(ulEl);
    console.log('made it');

    // for (var i = 0; i < cart.items.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = parsedProduct;
    ulEl.appendChild(liEl);
    // console.log(i);
    // }
    console.log('past the for loop');
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
var catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();