const express= require('express');
var app= new express();
const chalk=require('chalk');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));


const loginRouter=require('./src/routers/loginRouter')();
const signupRouter=require('./src/routers/signupRouter')();
const productsRouter=require('./src/routers/productsRouter')();


app.use(express.static(path.join(__dirname,"/public")));
app.use('/products',productsRouter);
app.use('/login',loginRouter);
app.use('/signup',signupRouter);



mongoose.connect("mongodb://localhost:27017/Products");
mongoose.set('useFindAndModify', false);
var db=mongoose.connection;
db.on('error',(error)=>{
    console.log(error);
});
db.once('open',()=>{
    console.log("Success");
})

app.listen(process.env.PORT|| 3001,()=>{
    console.log("listening to port "+chalk.green('3001'));
});
