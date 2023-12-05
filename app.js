const express = require("express")
const socketIo = require("socket.io")
const http = require("http")
const router = require("./routes/router")
const ejs = require("ejs")
const path = require("path")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

// express app
const app = express()

// socket.io server
const server = http.createServer(app)
const io = socketIo(server);
userSockets = {}

// setting static path
app.use(express.static(path.join(__dirname,"public")))

// setting view engine
app.set("view engine", ejs)
app.set("views", path.join(__dirname,"templates"))

// body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// cookie parser
app.use(cookieParser())

// handling requests
app.use("/",router())

// handing socket connection requests
  
io.on('connection', (socket) => {
    socket.on("registerUserSocket", (username)=>{
        socket.username = username; // When a socket disconnect event happens, we can find the username associated with the socket and delete it then.
        userSockets[username] = socket; // saving the socket such that it can be identified using username.
    })

    socket.on("logout",(username)=>{
        delete userSockets[username];
    })
    
    socket.on("sendMessage",(messageData)=>{
        // get the sender and receipient usernames and the message
        const {receiver} = messageData
        // get receiver's socket
        const receiverSocket = userSockets[receiver]
        // emit a receiveMessage event to the recepient's socket by sending the message as data.
        if(receiverSocket){
            receiverSocket.emit("receiveMessage", messageData);
        } else{
            // the receiver is off line.
            console.log("user is offline")
        }
    })

    socket.on("disconnect",()=>{
        if(socket.username){
            delete userSockets[socket.username];
        }
    })

  });  

server.listen(4000 ,()=>{
    console.log("server started on 4000")
})