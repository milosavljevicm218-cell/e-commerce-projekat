const PRODUCT1_NAME = "Teapot";
const PRODUCT1_PRICE = 12.99;
const PRODUCT1_QTY = 1;

const PRODUCT2_NAME = "Vase";
const PRODUCT2_PRICE = 8.99;
const PRODUCT2_QTY = 1;

const PRODUCT3_NAME = "Set Teapot and Cups";
const PRODUCT3_PRICE = 20.99;
const PRODUCT3_QTY = 1;

const PRODUCT4_NAME = "Flower Pot";
const PRODUCT4_PRICE = 10.99;
const PRODUCT4_QTY = 1;

const VAT_RATE = 0.2; 
const CURRENCY = "$";
const USD_PER_EUR = 1.16;
const VALID_COUPON = ["SAVE10", "SAVE15", "FREESHIP"];

const allProducts = [
    { name: "Teapot", price: 12.99, qty: 15 },
    { name: "Vase", price: 8.99, qty: 20 },
    { name: "Set Teapot and Cups", price: 20.99, qty: 5 },
    { name: "Flower Pot", price: 10.99, qty: 12 },
    { name: "Zinnia", price: 7.99, qty: 8 },
    { name: "Jar", price: 10.99, qty: 25 },
    { name: "Pot", price: 30.99, qty: 3 },
    { name: "Fireproof Pot", price: 15.99, qty: 10 },
    { name: "Vase Luxury", price: 13.99, qty: 7 },
    { name: "Ceramic Plate", price: 5.99, qty: 30 }
];

let totalAmount = 0; 

function isValidCoupon(code) {
    if (VALID_COUPON.includes(code)) {
        return true;
    } else {
        return false;
    }
}

function calculateStockValue() {
    let totalValue = 0;
    for (let product of allProducts) {
        let productTotal = product.price * product.qty;
        totalValue += productTotal;
    }
    console.log("Total stock value: " + totalValue.toFixed(2) + " " + CURRENCY);
}

function findProductByName(list, searchName) {
    const normalizedSearch = searchName.toLowerCase().trim();
    for (let product of list) {
        const normalizedProductName = product.name.toLowerCase().trim();
        if (normalizedProductName === normalizedSearch) {
            return product; 
        }
    }
    return null;
}

function normalizeCoupon(code) {
    let withoutSpace = code.trim();
    let upperCase = withoutSpace.toUpperCase();
    return upperCase;
}

function validateAndNotify() {
    const promoInput = document.getElementById('promo-input');
    if (!promoInput) return;

    const code = normalizeCoupon(promoInput.value);

    if (code === "") {
        alert('Please enter a coupon code first!');
        return;
    }

    if (isValidCoupon(code)) {
        if (code === "SAVE10") {
            alert("Your coupon brings you a 10% discount!");
        } else if (code === "SAVE15") {
            alert("Your coupon brings you a 15% discount!");
        } else if (code === "FREESHIP") {
            alert("Your coupon gives you free shipping!");
        }
    } else {
        alert("Invalid coupon code. Please try again.");
        promoInput.classList.add('is-invalid');
        promoInput.classList.remove('is-valid');
    }
}

function addToTotal(price) {
    totalAmount += price;
    console.log("Added price: $" + price);
    console.log("Current total amount: $" + totalAmount);
}

function openCart() {
    alert("Current total order amount is: $" + totalAmount);
}

function login(user, pass) {
    if (user === "admin" && pass === "admin") {
        return true;
    } else {
        return false;
    }
}

function checkLogin(event) {
    if (event) event.preventDefault(); 
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    if (!emailField || !passwordField) return;

    const emailValue = emailField.value.trim();
    const passwordValue = passwordField.value.trim();

    if (login(emailValue, passwordValue)) {
        alert('Login successful!');
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

console.log("Testing coupon 'SAVE10':", isValidCoupon("SAVE10"));
console.log("Testing coupon 'SAVE15':", isValidCoupon("SAVE15"));
console.log("Testing coupon 'FREESHIP':", isValidCoupon("FREESHIP"));
console.log("Testing coupon 'HELLO':", isValidCoupon("HELLO"));


console.log("All products on stock:", allProducts);
calculateStockValue();

const lowStock = [];
for (let product of allProducts) {
    if (product.qty < 10) {
        lowStock.push(product);
    }
}
console.log("Low stock items (less than 10 units):", lowStock);


const searchResult1 = findProductByName(allProducts, "VASE");
const searchResult2 = findProductByName(allProducts, "non-existent");
console.log("Search result for 'VASE':", searchResult1);
console.log("Search result for 'non-existent':", searchResult2);


console.log("Type of PRODUCT1_NAME:", typeof PRODUCT1_NAME); 
console.log("Type of PRODUCT1_PRICE:", typeof PRODUCT1_PRICE);
console.log("Type of VAT_RATE:", typeof VAT_RATE);


addToTotal(12.99);
addToTotal(8.99);
addToTotal(20.99);


const paymentForm = document.getElementById('payment-form');
if (paymentForm) {
    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const shippingFields = ['first-name', 'last-name', 'address', 'country', 'city', 'zip-code'];
        const paymentFields = ['cardholder-name', 'card-number', 'month', 'year', 'cvc'];

        let isShippingValid = true;
        let isPaymentValid = true;

        shippingFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                if (element.value.trim() === "") {
                    element.classList.add('is-invalid');
                    element.classList.remove('is-valid');
                    isShippingValid = false;
                } else {
                    element.classList.remove('is-invalid');
                    element.classList.add('is-valid');
                }
            }
        });

        paymentFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                if (element.value.trim() === "") {
                    element.classList.add('is-invalid');
                    element.classList.remove('is-valid');
                    isPaymentValid = false;
                } else {
                    element.classList.remove('is-invalid');
                    element.classList.add('is-valid');
                }
            }
        });

        const cardNumber = document.getElementById('card-number');
        if (cardNumber && cardNumber.value.length < 16 && cardNumber.value !== "") {
            cardNumber.classList.add('is-invalid');
            isPaymentValid = false;
            alert('Card number must be at least 16 digits');
        }

        if (isShippingValid && isPaymentValid) {
            alert('SUCCESS! Both Shipping and Payment information are valid.');
        } else {
            alert('ERROR: Please fill in all fields correctly.');
        }
    });
}

document.addEventListener('click', function (event) {
    if (event.target.innerText === '+' || event.target.innerText === '-') {
        const quantitySpan = event.target.parentElement.querySelector('span');
        if (quantitySpan) {
            let currentQuantity = parseInt(quantitySpan.innerText);
            if (event.target.innerText === '+') {
                currentQuantity++;
            } else if (event.target.innerText === '-' && currentQuantity > 1) {
                currentQuantity--;
            }
            quantitySpan.innerText = currentQuantity;
        }
    }
});