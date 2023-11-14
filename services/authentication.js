module.exports = (req, res, next) =>{
    /*
    THE BELOW CODE IS TEMPORARY.
    FOR AUTHENTICATION, THE JWT TOKEN AND VERIFY IT.
    */
   
    // get the username cookie
    const username = req.cookies.username;
    if(username){
        next();
    }
    else{
        res.redirect("/");
    }
}