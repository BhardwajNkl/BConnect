const express = require("express")
const authentication = require("../services/authentication");
const {getContacts, searchUser} = require("../services/getContacts")
const router = express.Router()

module.exports = (data)=>{
    router.post("/",(req, res)=>{
        const username = req.cookies.username;
        const searchInput = req.body.searchInput;
        // search in the contacts first and if not found search in all users
        // const username = req.cookies.username;
        const searchResult = searchUser(username,searchInput);
        if(searchResult) {
            res.send(searchResult);
        } else{
            res.status(400).send({"type":"error"});
        }
    });
        
    return router
}