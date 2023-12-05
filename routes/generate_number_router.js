const express = require("express")
const router = express.Router()
module.exports = (data)=>{
    router.get("/",(req, res)=>{
        res.render("site_layout.ejs",{message:"",page:"generate"});
    });

    // handle post request also
        
    return router
}