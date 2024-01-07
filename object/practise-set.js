/*
let product = {
    name: "Jeans",
    size: "S",
    fit: "Slim fit",
    'delivery-time':'same-day-delivery',
}

let copyProduct = product;
console.log(product)
copyProduct.name = 'new';
console.log(product)
copyProduct.size = 'new';
console.log(product)
copyProduct.fit = 'new';
console.log(product)
console.log(product['delivery-time'])
*/


let obj = {
    message: "Good Job",
    status: "active"
}
const {message, status} = obj;
console.log(message)
console.log(status)


function isIdenticalProduct(product1, product2) {
    if (typeof product1 !== 'object' || typeof product2 !== 'object') return false;
    if (product1 === product2) return true;
    return (product1.name === product2.name && product1.size === product2.size && product1.fit === product2.fit);
}

let product1 = {
    name: "Cloth",
    size: "S",
    fit: "Slim fit",
}
let product2 = {
    name: "Cloth",
    size: "M",
    fit: "Slim fit",
}
let product3 = {
    name: "Cloth",
    size: "S",
    fit: "Slim fit",
}

console.log("Is product identical:" + isIdenticalProduct(product1, product2))
console.log("Is product identical:" + isIdenticalProduct(product1, product3))
console.log("Is product identical:" + isIdenticalProduct(product1, ""))
console.log("Is product identical:" + isIdenticalProduct(product1, undefined))