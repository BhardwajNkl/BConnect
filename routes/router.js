const express = require("express")
const homerouter = require("./homerouter")
const chatrouter = require("./chatrouter")
const generate_number_router = require("./generate_number_router")
const login = require("../services/loginservice")
const authentication = require("../services/authentication")
const logoutrouter = require("./logoutrouter")
const search_router = require("./search_router")
const saveContact_router = require("./saveContact_router")

const router = express.Router()

module.exports = (data)=>{
    router.get("/",(req, res)=>{
        res.render("site_layout.ejs",{message:"", page:"login"})
    });

    router.post("/",(req, res)=>{
        // get user data
        const {username, password} = req.body;
        const authenticated = login({username, password})
        if(authenticated){
            res.cookie("username",username)
            res.redirect("home")
        } else{
            res.render("site_layout.ejs",{message:"login failed!", page:"login"})
        }
        
    })

    router.use("/generate", generate_number_router())
    router.use("/home", authentication, homerouter())
    router.use("/chat", authentication, chatrouter())
    router.use("/logout", logoutrouter())
    router.use("/search", authentication, search_router())
    router.use("/saveContact",authentication, saveContact_router());

    return router
}