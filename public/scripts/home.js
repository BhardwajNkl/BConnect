// The chat facility is available on chat page. But, it is still good to indicate to the user if somebody sent some text.
// For this purpose, we need to use socket on this page too. It will deal with login, logout and receiveMessageNotification events.

// Establish a Socket.io connection
const socket = io();
const username = getCookie('username'); // logged in user's username is there in cookies.
socket.emit("registerUserSocket",username);

socket.on("receiveMessage",(messageData)=>{
    // just do something to indicate that someone has sent a message
    const {sender, receiver, message} = messageData;
    alert(sender+": "+message);
})