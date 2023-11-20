let bar = document.querySelector('#bar');
let close = document.querySelector('#close');
let nav = document.querySelector('#navbar');
let body = document.querySelector('body');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');


if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', (e) => {
        nav.classList.remove('active');
        e.preventDefault();
    })
}

let products = [
    {
        id: 1,
        name: 'Product Name 1',
        image: 'pr1.jpg',
        price: 2000
    },
    {
        id: 2,
        name: 'Product Name 2',
        image: 'pr2.jpg',
        price: 3000
    },
    {
        id: 3,
        name: 'Product Name 3',
        image: 'pr3.jpg',
        price: 4000
    },
    {
        id: 4,
        name: 'Product Name 4',
        image: 'pr4.jpg',
        price: 5000
    },
    {
        id: 5,
        name: 'Product Name 5',
        image: 'pr5.jpg',
        price: 9000
    },
    {
        id: 6,
        name: 'Product Name 6',
        image: 'pr6.jpg',
        price: 7000
    },
    {
        id: 7,
        name: 'Product Name 7',
        image: 'pr7.jpg',
        price: 200
    },
    {
        id: 8,
        name: 'Product Name 8',
        image: 'pr8.jpg',
        price: 600
    },
];


let listCarts = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
        <img src="img/${value.image}">
        <div class="des">
            <span>Product</span>
            <h5 class="title">${value.name}</h5>
            <div class="star">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <h4 class="price">\u20A6 ${value.price.toLocaleString()}</h4>
        </div>
        <button onclick="addToCart(${key})"><i class="fal fa-shopping-cart cart"></i></button>
        `;
        list.appendChild(newDiv);
    })
}
initApp();


function addToCart(key){
    if(listCarts[key] == null){
        listCarts[key] = JSON.parse(JSON.stringify(products[key]));
        listCarts[key].quantity = 1;
    }
    reloadCart();
}


function reloadCart(){
    listCart.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCarts.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <h5>${value.name}</h5>
                <h4>\u20A6 ${value.price.toLocaleString()}</h4>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCart.appendChild(newDiv);
        }
    })
    total.innerText = `Sub-total = \u20A6 ${totalPrice.toLocaleString()}`;
    quantity.innerText = count;
}

function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCarts[key];
    } else {
        listCarts[key].quantity = quantity;
        listCarts[key].price = quantity * products[key].price;
    }
    reloadCart();
}