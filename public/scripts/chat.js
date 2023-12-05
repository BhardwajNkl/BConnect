const socket = io();
const username = getCookie('username'); // getting the logged user's username from cookies.
socket.emit("registerUserSocket",username);

const displayMessageArea = document.querySelector("#display-message-area");
const sendMessageBtn = document.querySelector("#send-message-btn");

sendMessageBtn.onclick = function(){
    const chatWithUsername = this.getAttribute("data-chatWithUsername");
    const message = document.querySelector("#message-input").value;
    console.log(message)
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
        alert(sender+": "+message)
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