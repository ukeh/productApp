var express = require('express');
var {signupModel}=require('../models/signupModel');
var loginRouter = express.Router();

function route() {

    loginRouter.route('/')
        .post((req, res) => {
            console.log("login");
            signupModel.findOne({ email: req.body.email, password: req.body.password }, (err, data) => {
                if (err) {
                    res.json({ Status: "Error" });
                }
                else if (!data) {
                    res.json({ Status: "Invalid" });
                }
                else {
                    res.json({ Status: "Success" });
                }
            });

        });
    

    return loginRouter;
}
module.exports = route;
