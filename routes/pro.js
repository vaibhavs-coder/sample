const express = require('express');
const Product = require('../models/Product');
const router = express.Router(); //mini instance/application;


// READ
router.get('/products' , async (req,res)=>{
    let allProducts = await Product.find();
    res.render('product/index' , {allProducts})
})

// SHOW A NEW FORM
router.get('/product/new' , (req,res)=>{
    res.render('product/new');
})


router.post('/products' , async(req,res)=>{
    let {name,img , price , desc} = req.body;
    await Product.create({name,img , price , desc});
    res.redirect('/products');
})


router.get('/products/:id' , async(req,res)=>{
    let {id} = req.params;
    // let foundProduct = await Product.findById(id);
    let foundProduct=await Product.findById(id).populate('reviews'); 
    res.render('product/show' , {foundProduct})

})

router.get('/products/:id/edit' , async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    console.log('sam1',foundProduct,'sam');
    res.render('product/edit' , {foundProduct})
})


router.patch('/products/:id' , async(req,res)=>{
    let {id} = req.params;
    let {name , img , price , desc} = req.body;
    await Product.findByIdAndUpdate( id , {name , img , price , desc});
    res.redirect(`/products/${id}`);
})


router.delete('/products/:id' , async(req,res)=>{
    let {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

module.exports = router;