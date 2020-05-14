//target all the element has the same class
let carts = document.querySelectorAll('.add-cart');


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
//add a cart event for each product
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(product[i]);
        onLoadCartNumbers();
        totalCost(product[i]);
    });

}


//count number of the product has been clicked
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    //if the first time click on cart set the productNumber to 1 else plus 1
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        //document.querySelectorAll('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        //document.querySelectorAll('.cart span').textContent = 1;
    }

    setItem(product);


}
//store the product has been click to the localStorage
function setItem(product) {
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
        cartItems[product.tag].inCart += 1;
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



function totalCost(product) {
    var total = localStorage.getItem('totalCost');

    if (total == null) {
        total = JSON.parse(total);
        total = product.price;
    } else {
        total += product.price;
    }

    localStorage.setItem('totalCost', total);
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    let cartCost = localStorage.getItem("totalCost");
    cartItems = JSON.parse(cartItems);
    
    let productContainer = document.querySelector('.products');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="/img/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <ion-icon name="arrow-back-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="arrow-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">$${item.inCart * item.price},00</div>
            `;
        });

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
    }
}
displayCart();