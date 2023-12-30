const socket = io();
const username = getCookie('username'); // getting the logged user's username from cookies.
socket.emit("registerUserSocket",username);

const displayMessageArea = document.querySelector("#display-message-area");
const sendMessageBtn = document.querySelector("#send-message-btn");

const addContactBtn = document.getElementById("add-contact");

sendMessageBtn.onclick = function(){
    const chatWithUsername = this.getAttribute("data-chatWithUsername");
    const message = document.querySelector("#message-input").value;
    const messageData = {sender:username, receiver:chatWithUsername, message}
    socket.emit("sendMessage", messageData);
    appendMessage("Me: "+message);
}

socket.on("receiveMessage",(messageData)=>{
    const {sender, receiver, message} = messageData;
    // If the user is chatting with the sender then display the chat in chat window, otherwise, just indicate that there is a new message.
    const chatWithUsername = sendMessageBtn.getAttribute("data-chatWithUsername");
    if(sender==chatWithUsername){
        // code to display the message
        appendMessage(sender+": "+message);
    } else{
        // code to indicate
        // alert(sender+": "+message)
        const chatLink = "chat?username="+sender;
        const newMessageElement = document.createElement("a");
        newMessageElement.setAttribute("class","contact-name");
        newMessageElement.setAttribute("href",chatLink);
        newMessageElement.innerHTML = "<b>"+sender+"</b>:"+message;
        const newMessagePersonDiv = document.getElementById("new-message-person");
        newMessagePersonDiv.appendChild(newMessageElement);
    }
})


function appendMessage(message){
    const messageNode = document.createElement("p");
    messageNode.innerHTML = message;
    displayMessageArea.appendChild(messageNode);
    scrollToBottom();
}

// Function to scroll the div to the bottom
function scrollToBottom() {
    displayMessageArea.scrollTop = displayMessageArea.scrollHeight;
}

// add contact
if(addContactBtn){
    addContactBtn.addEventListener("click",()=>{
        // hide add contact button
        addContactBtn.style.display = "none";
        // show input field and save contact button
        const newContactNameInput = document.getElementById("new-contact-name");
        const saveContactBtn = document.getElementById("save-contact");
        newContactNameInput.style.display = "inline";
        saveContactBtn.style.display="inline"
        // bind eventlistener to save
        saveContactBtn.addEventListener("click",()=>{
            // call the contact save api below:
            const chatWithUsername = sendMessageBtn.getAttribute("data-chatWithUsername");
            saveContact(chatWithUsername, newContactNameInput.value);
            // change the name being shown in chat header
            const chatUserDisplayName = document.getElementById("chat-user-display-name");
            chatUserDisplayName.innerHTML = "<b>"+newContactNameInput.value+"</b>";
            // remove input field and save button
            newContactNameInput.style.display = "none";
            saveContactBtn.style.display = "none";
        })
    })
}

function saveContact(username, contactName){
        // also make a logout request
        fetch(
            "/saveContact",
            {
                "method":"post",
                "headers":{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({"username":username, "saved_name":contactName})
            }
        ).then((data)=>{
            //alert("SAVED");
        }).catch(error=>{
            alert("SOME ERROR");
            console.log(error)
        })
}