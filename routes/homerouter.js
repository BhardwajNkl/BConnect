const express = require("express")
const router = express.Router()
const {getContacts} = require("../services/getContacts")
module.exports = (data)=>{
    router.get("/",(req, res)=>{
        const username = req.cookies.username;
        const contacts = getContacts(username);
        // temporary: we make every other user the contact of a user.
        res.render("site_layout.ejs",{contacts, page:"home"});
    });
        
    return router
}