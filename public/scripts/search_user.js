// we read the input box 'search-contact'
const searchContact = document.querySelector("#search-contact");
const searchResult = document.querySelector("#search-result");
// on each change, we send a post request to the server and load exact match user
searchContact.addEventListener("keyup",()=>{
    const searchInput = searchContact.value;
    // if the input is empty, just clear the search-result div
    if(searchContact.length == 0){
        searchResult.innerHTML = "";
    }
    // make a post request
    fetch(
        "/search",
        {
            "method":"post",
            "headers":{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({searchInput})
        }
    ).then(res => res.json())
    .then(data => {
        console.log(data);
        const chatLink = "chat?username="+data.username;
        let res = "";
        // show the result in search-result div
        if(data.type === "contact"){
           res = "<a class='contact-name' href='" + chatLink+ "'>"+data.saved_name + "</a>";
        } else if(data.type === "unknown"){
            // provide a button to create contact
            res = "<a class='contact-name' href='" + chatLink+ "'>"+data.username + "</a>";
        } else{
            res = "<p>No Match Found</p>";
        }

        searchResult.innerHTML = res;
    })
    .catch(error =>{
        console.log(error);
        alert("some error")
    })
    // show the output in the search-result div
});