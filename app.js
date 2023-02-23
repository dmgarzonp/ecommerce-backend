'use strict'
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const {mongoose } = require("mongoose");
mongoose.set('strictQuery', true);
const port = process.env.PORT || 4201

const clienteRoute = require('./routes/cliente');
const adminRouter = require('./routes/admin');



mongoose.connect('mongodb://127.0.0.1:27017/farma_db',{useNewUrlParser: true, useUnifiedTopology: true}, (err,res) => {
    if (err) {
        console.log(err);
    } else {        
        app.listen(port, function(){
            console.log('Servidor corriendo en el puerto ' + port);
        })
    }
})

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit:'50mb',extended: true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api',clienteRoute);
app.use('/api',adminRouter);

module.exports = app;