const users = require("../dummydata")

module.exports = (userCredentials)=>{

    /*
    THE BELOW CODE IS TEMPORARY.
    USE DATABASE FOR STORING USERS.
    AND AFTER VALIDATING USER, GENERATE JWT TOKEN AND SEND IT TO THE USER.
    */

    // check the users array
    const user = users.find(u => u.username == userCredentials.username && u.password == userCredentials.password)
    
    return user ? true: false;
}