const express = require("express")
const router = express.Router()
const {getContacts} = require("../services/getContacts")
module.exports = (data)=>{
    router.get("/",(req, res)=>{
        const username = req.cookies.username; // logged in user
        const contacts = getContacts(username); // getting contacts of the logged in user to show
        const chatWithUsername = req.query.username; // the contact to which the logged in user wants to chat with.
        /* check if the 'chatWihUsername' exists in the contacts.
        this will be used to allow the user to add this person to his contacts.
        */
        
        // NOTE: using the above, load previous text messages.
        res.render("site_layout.ejs",{contacts, page:"chat", chatWithUsername})
    });
        
    return router
}