"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idDelete = exports.update = exports.create = exports.findById = exports.findItAll = void 0;
const utilities_1 = require("../utilities");
let products = require("../../data/product");
//Creating get request
function findItAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}
exports.findItAll = findItAll;
function generateId() {
    let id;
    if (products.length === 0) {
        id = 1;
    }
    else {
        id = +(products[products.length - 1].id) + 1;
    }
    return id;
}
function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((elem) => elem.id === id);
        resolve(product);
    });
}
exports.findById = findById;
//POST REQUEST
function create(item) {
    return new Promise((resolve, reject) => {
        const newItems = { id: generateId(), ...item };
        products.push(newItems);
        utilities_1.writeToDatabase('./data/product.json', products);
        resolve(newItems);
    });
}
exports.create = create;
//UPDATE REQUES
function update(id, product) {
    return new Promise((resolve, reject) => {
        const j = products.findIndex((i) => i.id === id);
        products[j] = { id, ...product };
        utilities_1.writeToDatabase('./data/product.json', products);
        resolve(products[j]);
    });
}
exports.update = update;
//DELETE REQUEST
function idDelete(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((ele) => ele.id !== id);
        utilities_1.writeToDatabase("./data/Products.json", products);
        resolve(null);
    });
}
exports.idDelete = idDelete;
