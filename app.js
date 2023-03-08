const express = require("express")
const ProductManager= require("./productManager.js")
let manager=new ProductManager("./products.json")

const app=express()
app.listen(8080,()=>{console.log("listening on port 8080")})

app.get("/",(req,res)=>{res.send ("Pagina Principal")})

app.get("/products/",async(req,res)=>{
    let {limit}=req.query
    if(!limit)
    {
        res.send(await manager.getProducts().then(r=>r))
    }
    else{
        res.send(await manager.getProducts().then(r=>r.slice(0,limit)))
    }

})

app.get("/products/:pid",async(req,res)=>{
    let id=parseInt(req.params.pid)
    res.send(await manager.getProductById(id).then(r=>r))})