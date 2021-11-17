"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProducts = exports.createProduct = exports.getOneProduct = exports.getProduct = void 0;
const utilities_1 = require("../utilities");
const modelsGoods_1 = require("../models/modelsGoods");
async function getProduct(req, res) {
    try {
        const products = await modelsGoods_1.findItAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));
    }
    catch (error) {
        res.end("Products was not found in the database");
    }
}
exports.getProduct = getProduct;
async function getOneProduct(req, res, id) {
    try {
        const product = await modelsGoods_1.findById(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: " product absent" }));
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product));
        }
    }
    catch (error) {
        console.error(error);
    }
}
exports.getOneProduct = getOneProduct;
async function createProduct(req, res) {
    try {
        const body = (await utilities_1.getData(req));
        const { productName, productDescription, productVarieties } = JSON.parse(body);
        const product = {
            productName,
            productDescription,
            productVarieties,
            dateUploaded: new Date().toISOString(),
            dateEnded: new Date().toISOString()
        };
        const newProduct = await modelsGoods_1.create(product);
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newProduct));
    }
    catch (error) {
        console.error(error);
    }
}
exports.createProduct = createProduct;
async function updateProducts(req, res, id) {
    try {
        const product = await modelsGoods_1.findById(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Organization not found" }));
        }
        else {
            const body = await utilities_1.getData(req);
            const { productName, productDescription, productVarieties } = JSON.parse(body);
            const productData = {
                productName: productName || product.productName,
                productDescription: productDescription || product.productName,
                productVarieties: productVarieties || product.productVarieties,
                dateUploaded: product.dateUploaded,
                dateEdited: new Date().toISOString(),
            };
            const upProducts = await modelsGoods_1.update(id, productData);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(upProducts));
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.updateProducts = updateProducts;
async function deleteProduct(req, res, id) {
    try {
        const product = await modelsGoods_1.findById(id);
        if (!product) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Organization not found" }));
        }
        else {
            await modelsGoods_1.idDelete(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Product ${id} removed` }));
        }
    }
    catch (error) {
        console.error(error);
    }
}
exports.deleteProduct = deleteProduct;
