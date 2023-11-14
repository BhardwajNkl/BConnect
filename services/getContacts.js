const users = require("../dummydata")
module.exports = (username)=>{
    contacts = users.filter(user => user.username != username)
    return contacts;
}