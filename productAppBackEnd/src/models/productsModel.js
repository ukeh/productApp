const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    productId : Number,
    productName : String,
    productCode : String,
    releaseDate : String,
    description : String,
    price : Number,
    starRating :Number,
    imageUrl : String
});

var productsModel = mongoose.model('products', productSchema);                        //UserData is the model and NewBookData is the schema
module.exports = {productsModel};