//target all the element has the same class
let carts = document.querySelectorAll('.add-cart');
var flag = false;
var check = 0;
//create and store product information
let product = [
    {
        name: 'Cake 1',
        tag: 'cake1',
        price: 10,
        inCart: 0
    },
    {
        name: 'Cake 2',
        tag: 'cake2',
        price: 20,
        inCart: 0
    },
    {
        name: 'Cake 3',
        tag: 'cake3',
        price: 30,
        inCart: 0
    },
    {
        name: 'Cake 4',
        tag: 'cake4',
        price: 40,
        inCart: 0
    },


]
//load products in the cart for the first time
onLoadCartNumbers();
//display the cart
displayCart();

//add a cart event for each product
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(product[i], 1);
        onLoadCartNumbers();
        totalCost(product[i], 1);
    });

}


//count number of the product has been clicked
function cartNumbers(product, check) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    //if the first time click on cart set the productNumber to 1 else plus 1
    if (productNumbers) {
        if (check == 1) {
            localStorage.setItem('cartNumbers', productNumbers + 1);
            //document.querySelectorAll('.cart span').textContent = productNumbers + 1;
        } else if (check == 0) {
            localStorage.setItem('cartNumbers', productNumbers - 1);
        }
    } else {
        localStorage.setItem('cartNumbers', 1);
        //document.querySelectorAll('.cart span').textContent = 1;
    }
    setItem(product, check);
}

//store the product has been click to the localStorage
function setItem(product, check) {
    //get all the product int the cart
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    //if the first time purchase the product the inCart set to 1 
    //else inCart increase by 1
    if (cartItems != null) {
        //if purchase another product the product will store in cartItems
        //along with the rest of product purchase before
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        if (cartItems[product.tag].inCart != 0) {
            if (check == 0) {
                if (cartItems[product.tag].inCart == 1) {
                    console.log(cartItems[product.tag].price);
                    selectedDelItems(cartItems, product);

                } else {
                    cartItems[product.tag].inCart -= 1;
                }
            }
            else if (check == 1) {
                cartItems[product.tag].inCart += 1;
            }
        } else {
            product.inCart = 1;
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

//load number of products in cart into the interface 
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


//store the total of all the product has been purchase
function totalCost(product, check) {
    //get the totalCost in localStorage
    var total = localStorage.getItem('totalCost');
    //parse from string into integer
    total = JSON.parse(total);
    //if is the first time purchase the total set to product price
    //else get total price of all product
    if (total == null) {
        total = product.price;
    } else {
        if (check == 1) {
            total += product.price;
        } else if (check == 0) {
            total -= product.price;
        }
    }
    localStorage.setItem('totalCost', total);
}


//Display all the product has been purchase to the cart.htm
function displayCart() {
    //get productsInCart and totalCost in the localStorage
    let cartItems = localStorage.getItem("productsInCart");
    let cartCost = localStorage.getItem("totalCost");
    cartItems = JSON.parse(cartItems);

    //get the element has a class of .product in home.htm
    let productContainer = document.querySelector('.products');

    //if the cartItems and productContainer is existed 
    //then display the product to the cart
    if (cartItems && productContainer) {
        //set the innerHTML of the .products to be empty
        productContainer.innerHTML = '';
        //check all of the items in the cartItems
        Object.values(cartItems).map(item => {
            //concat the information of each product to the cart.htm
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon class="delete ${item.tag}" name="close-circle"></ion-icon>
                <img src="/img/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease ${item.tag}" name="arrow-back-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase ${item.tag}" name="arrow-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">$${item.inCart * item.price},00</div>
            `;
        });
        //this is for the total price you need to pay for all the products
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
            </div>
        `
        addCart(cartItems);
        deleteCart(cartItems);
    }
}




//select item and delete if press the delete button or product in cart equal to 0
function selectedDelItems(productLocal, productDel) {
    //get all the information in the localStorage
    var productNumber = localStorage.getItem('cartNumbers');
    var totalCost = localStorage.getItem('totalCost');
    var inCartDel = productLocal[productDel.tag].inCart;
    var costCartDel = productDel.price * inCartDel;
    // console.log(productLocal);
    // console.log(productDel);
    //delete the item selected
    delete productLocal[productDel.tag];
    localStorage.setItem('productsInCart', JSON.stringify(productLocal));
    //set the cartNumber and totalCost after selected product delete if user click on the delete button
    if (flag) {
        localStorage.setItem('cartNumbers', productNumber - inCartDel);
        localStorage.setItem('totalCost', totalCost - costCartDel);
        flag = false;
    }
}
//delete the item in the cart
function deleteCart(productLocal) {

    let deleteCart = document.querySelectorAll('.delete');
    //Add each of the delete button a new event
    for (let i = 0; i < deleteCart.length; i++) {
        deleteCart[i].addEventListener('click', () => {
            for (let j = 0; j < product.length; j++) {
                if (deleteCart[i].classList[1] == product[j].tag) {
                    flag = true;
                    selectedDelItems(productLocal, product[j]);
                    onLoadCartNumbers();
                    displayCart();   
                }
            }
        })

    }

}
//increase or decrease the item in the cart
function addCart(productLocal) {

    let increaseCart = document.querySelectorAll('.increase');
    let decreaseCart = document.querySelectorAll('.decrease');

    //add event +1 product for each increase button
    for (let i = 0; i < increaseCart.length; i++) {
        increaseCart[i].addEventListener('click', () => {
            for (let j = 0; j < product.length; j++) {
                if (increaseCart[i].classList[1] == product[j].tag) {
                    cartNumbers(productLocal[product[j].tag], 1);
                    onLoadCartNumbers();
                    totalCost(productLocal[product[j].tag], 1);
                    displayCart();
                }
            }
        });
    }

    //add event -1 product for each decrease button
    for (let i = 0; i < decreaseCart.length; i++) {
        decreaseCart[i].addEventListener('click', () => {
            for (let j = 0; j < product.length; j++) {
                if (increaseCart[i].classList[1] == product[j].tag) {
                    cartNumbers(productLocal[product[j].tag], 0);
                    onLoadCartNumbers();
                    totalCost(productLocal[product[j].tag], 0);
                    displayCart();
                }
            }
        });
    }
}

