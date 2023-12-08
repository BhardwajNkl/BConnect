const express = require("express");
const number_generator = require("../services/number_generator");

const router = express.Router()
module.exports = (data)=>{
    router.get("/",(req, res)=>{
        res.render("site_layout.ejs",{message:"",page:"generate", generatedNumber:null});
    });

    // handle post request also
    router.post("/",(req, res)=>{
        const chosenPassword = req.body;
        const generatedNumber = number_generator(chosenPassword.password, chosenPassword.confirmPassword);
        res.render("site_layout.ejs",{message:"",page:"generate", generatedNumber});
    });
        
    return router
}