const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ecom').then(()=>{console.log("db connected")}).catch(()=>{console.log("db disconnected")});
let scheme=mongoose.Schema(
    {
name:{type:String,
trim:true,
required:true},
img:{
    type:String,
    trim:true
},
price:{
    type:Number,
    min:0,
    required:true
},
desc:{
    type:String,
    trim:true
}
    }
);
let product=mongoose.model('Products',scheme);
module.exports=product;