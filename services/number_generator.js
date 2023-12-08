const dummydata = require("../dummydata");
const crypto = require('crypto');

// two functions

// 1. generate a new number
module.exports = (password, confirm_password)=>{
    if(password == confirm_password){
        // generate a number
        const number = generateRandomNumberString(10);
        if(number.length <= 0){
            // show some error
            return null;
            // or apply some strategy to regenerate the number
        }
        const newUserNumber = number+"@b.connect";
        // save this number in db, before that ensure that this number is not yet assigned to anyone else.
        const isAssigned = dummydata.length == 0 ? false : dummydata.some(user=>user.username == newUserNumber);
        if(!isAssigned){
            save_number_in_db(newUserNumber, password);
            // return to the user
            return newUserNumber;
        } else{
            // show some error to the user asking to try again
            return null;

            // or, try generating in loop until a new number is found or find some other better ways.
        }
    } else{
        // since the user has not created a valid password, we cannot generate the number. show some error.
        return null;
    }
}

// 2. save this number and it's password in db
const save_number_in_db = (number, password) => {
    // temporary access the list and append tis new number
    dummydata.push({username:number, password});
    // console.log(dummydata);
}



// random number string generation
function generateRandomNumberString(length) {
    const buffer = crypto.randomBytes(length);
    const randomString = buffer.toString('base64').replace(/\D/g, '').slice(0, length);
    return randomString;
}

