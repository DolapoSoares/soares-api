import http, { IncomingMessage, ServerResponse } from 'http';
import { getData } from '../utilities';
import { findItAll, findById, create , update, idDelete } from '../models/modelsGoods';


interface Oj{
    [key: string]: string | number | {[key:string] : string }
}

export async function getProduct( req: IncomingMessage, res : ServerResponse){
    try{
        const products = await findItAll();
        res.writeHead(200, { "Content-Type" : "application/json"});
        res.end(JSON.stringify(products));
    }catch (error) {
        res.end("Products was not found in the database")
    }
}

export async function getOneProduct(
    req: IncomingMessage,
    res: ServerResponse,
    id:number
){
    try{
        const product = await findById(id);
        if (!product) {
            res.writeHead(404, { "Content-Type" : "application/json"});
            res.end(JSON.stringify({ message: " product absent"}))
        }else{
            res.writeHead(200,{ "Content-Type" : "application/json"});
            res.end(JSON.stringify(product))
        }
    }catch(error){
        console.error(error)
    }
}

export async function createProduct(req: IncomingMessage,res: ServerResponse){
    try{
        const body = (await getData(req)) as string;
        const { productName, productDescription, productColor , productQuantity , productPrice} = JSON.parse(body);
        const product:any = {
            productName,
            productDescription,
            productColor , 
            productQuantity , 
            productPrice,
            dateUploaded: new Date().toISOString(),
            dateEnded: new Date().toISOString()
        };
        const newProduct = await create(product);
        res.writeHead(201, { "Content-Type" : "application/json"});
        return res.end(JSON.stringify(newProduct))
    }catch(error){
        console.error(error)
    }
}

export async function  updateProducts(
    req: IncomingMessage,
    res: ServerResponse,
    id:number
){
    try{
        const product : any = await findById(id);
        if(!product){
            res.writeHead(404, { "Content-Type" : "application/json"});
            res.end(JSON.stringify({message: "Organization not found"}));
        }else{
            const body: any = await getData(req);
            const { productName, productDescription, productColor , productQuantity , productPrice} = JSON.parse(body);
            const productData: any = {
                productName: productName || product.productName,
                productDescription: productDescription || product.productDescription,
                productColor: productColor || product.productColor,
                productQuantity: productQuantity || product.productQuantity,
                productPrice: productPrice || product.productPrice,
                dateUploaded : product.dateUploaded,
                dateEdited: new Date().toISOString(),
            };
            const upProducts = await update(id, productData);
            res.writeHead(200, { "Content-Type" : "application/json"});
            return res.end(JSON.stringify(upProducts));
        }
    }catch(error){
        console.log(error)
    }
}

export async function deleteProduct(
    req: IncomingMessage,
    res: ServerResponse,
    id:number
){
    try{
        const product = await findById(id);
        if(!product) {
            res.writeHead(400, { "Content-Type" : "application/json"});
            res.end(JSON.stringify({message: "Product not found"}))
        }else{
            await idDelete(id);
            res.writeHead(200, { "Content-Type" : "application/json"});
            res.end(JSON.stringify({message: `Product ${id} removed`}))
        }
    }catch(error){
        console.error(error)
    }
}