// old: we returned every other user as a contact
const {users,contactMap} = require("../dummydata")
// module.exports = (username)=>{
//     contacts = users.filter(user => user.username != username)
//     return contacts;
// }

// new: contacts are fetched from the contacts map

const getContacts = (username) =>{
    // since there is dummy data in the map with username as "username", we use that only here.
    const contacts = contactMap.get(username);
    if(contacts){
        return contacts;
    }
    return [];
    // the above is a list of objects {saved_names, user_name}, so change the code accordingly wherever required.
    // only the template requires a modification
}

const addContact = (username, contactDetails) => {
    if (!contactMap.has(username)) {
        contactMap.set(username, []);
    }
    const contacts = contactMap.get(username);
    contacts.push(contactDetails);
}

const searchUser = (username, searchInput)=>{
    const contacts = getContacts(username);
    let result = contacts.find(contact => contact.saved_name === searchInput);
    if(result){
        // to indicate that the found user is a contact and based on this, we only show the name
        result["type"] = "contact";
        return result;
    } else{
        result = users.find(user => user.username === searchInput);
        if(result){
            result["type"] = "unknown";
            return result;
        }
    }

    return null;
}

module.exports = {getContacts, searchUser, addContact};