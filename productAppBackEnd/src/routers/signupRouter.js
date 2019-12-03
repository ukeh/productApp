var express= require('express');
var {signupModel}=require('../models/signupModel');
var signupRouter=express.Router();

function route(){

    signupRouter.route('')
    .post((req,res)=>{
        signupModel.findOne({email:req.body.email},(err,data)=>{
            if(err){
                throw err;
            }
            else{
                console.log(data);
                console.log(req.body);
                if(!data){
                    var add=signupModel(req.body);
                    add.save((err,result)=>{
                        if(err){
                            res.json({Status:"Error"});
                        }
                        else{
                            res.json({Status:"Success"});
                        }
                    });
                }
                else{
                    res.json({Status:"Invalid"});
                }
            }
        })



       
    });

    return signupRouter;
}
module.exports=route;