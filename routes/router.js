const express = require("express")
const homerouter = require("./homerouter")
const chatrouter = require("./chatrouter")
const login = require("../services/loginservice")
const authentication = require("../services/authentication")
const logoutrouter = require("./logoutrouter")


const router = express.Router()

module.exports = (data)=>{
    router.get("/",(req, res)=>{
        res.render("login.ejs",{message:""})
    });

    router.post("/",(req, res)=>{
        // get user data
        const {username, password} = req.body;
        const authenticated = login({username, password})
        if(authenticated){
            res.cookie("username",username)
            res.redirect("home")
        } else{
            res.render("login.ejs",{message:"login failed!"})
        }
        
    })

    router.use("/home", authentication, homerouter())
    router.use("/chat", authentication, chatrouter())
    router.use("/logout", logoutrouter())

    return router
}