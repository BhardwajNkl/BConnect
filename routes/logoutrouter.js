const express = require("express")
const router = express.Router()

module.exports = (data)=>{
    router.get("/",(req, res)=>{
        if(req.cookies.username){
            res.clearCookie("username");
        }
        res.json();
    });
        
    return router
}