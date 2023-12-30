const express = require("express")
const {addContact} = require("../services/getContacts")
const router = express.Router()

module.exports = (data)=>{
    router.post("/",(req, res)=>{
        const newContact = req.body;
        const username = req.cookies.username;
        addContact(username, newContact);
        res.status(201).send();
    });
    
    return router
}