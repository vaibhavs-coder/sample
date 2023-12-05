const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const productRoute = require('./routes/ProductRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const methodOverride = require('method-override')


mongoose.set('strictQuery' , true); 
mongoose.connect('mongodb://127.0.0.1:27017/baigan') 
.then(()=>{console.log("DB CONNECTED")})
.catch((err)=>{console.log("error in DB" , err)})


app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true})) 
app.use(methodOverride('_method'))


app.use(productRoute);
app.use(reviewRoutes);

seedDB();
const PORT = 8080;
app.listen(PORT , ()=>{
    console.log(`server connected at port: ${PORT}`);
})