import { writeToDatabase } from "../utilities";

interface obj {
    [keys: string]: string | string[]
}

type identity = {
    [keys:string]: number
}

let products = require("../../data/product")

//Creating get request
    export function findItAll(){
        return new Promise((resolve, reject) => {
            resolve(products)
        })
    }

    function generateId(){
        let id;
        if(products.length === 0){
            id = 1;
        }else{
            id = +(products[products.length - 1].id) + 1
        }
        return id
    }

    export function findById(id:number){
        return new Promise((resolve , reject) => {
            const product = products.find((elem:identity) => elem.id === id);
            resolve(product)
        })
    }

     //POST REQUEST
    export function create(item:obj[]){
        return new Promise((resolve, reject) => {
            const newItems = {id:generateId(),...item}
            products.push(newItems)
            writeToDatabase('./data/product.json', products)
            resolve(newItems)
        })
    }

   //UPDATE REQUES
   export function update(id:number, product:obj){
       return new Promise((resolve,reject) => {
        const j = products.findIndex((i:identity) => i.id === id)
        products[j] ={id, ...product} as any
        writeToDatabase('./data/product.json', products)
        resolve(products[j])
       })
   }

   //DELETE REQUEST

   export function idDelete(id:number){
       return new Promise((resolve, reject) => {
           products = products.filter((ele:any) => ele.id !== id)
           writeToDatabase("./data/Products.json", products);
           resolve(null);
       })
   }

