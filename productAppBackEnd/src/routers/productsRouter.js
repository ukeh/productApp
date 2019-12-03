var express = require('express');
var { productsModel } = require('../models/productsModel');
var productsRouter = express.Router();

function route() {

    productsRouter.route('/')
        .get((req, res) => {
            productsModel.find((err, data) => {
                if (err) {
                    res.json({ Status: "Error" });
                }
                else {
                    console.log(data);
                    res.json({products:data});
                }
            });
        });
    productsRouter.route('/add')
        .post((req, res) => {
            console.log(req.body);
            var product = new productsModel(req.body);
            product.save((err, result) => {
                if (err) {
                    res.json({ Status: "Error" });
                }
                else {
                    console.log(result);
                    res.json({Status:"Success"});
                }
            });
        });

    productsRouter.route('/edit')
        .post((req, res) => {
            productsModel.findById(req.body.id, (err, data) => {
                if (err) {
                    res.json({ Status: "Error" });
                }
                else {
                    res.json({ Status: "Success", product: data });
                }
            });
        });
    productsRouter.route('/update')
    .post((req,res)=>{
        console.log(req.body._id);
        productsModel.findByIdAndUpdate(req.body._id,{$set:req.body},
          (err,result)=>{
            if(err)
            {
                res.json({Status:"Error"});
            }
            else{
                res.json({Status:"Success"});
            }
          });
    });

    productsRouter.route('/delete')
    .post((req,res)=>{
        productsModel.findByIdAndDelete(req.body.id,(err,result)=>{
            console.log(req.body.id)
            if(err){
                res.json({Status:"Error"});
            }
            else{
                res.json({Status:"Success"});
            }
        });
    });

    return productsRouter;
}
module.exports = route;