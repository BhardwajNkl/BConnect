const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.onclick = function(){
    socket.emit("logout", username);
    // also make a logout request
    fetch("/logout", {
        method: 'GET',
        credentials: 'same-origin',
      }).then((data)=>{
        window.location.href = "/";
    }).catch(error=>{
        console.log(error)
    })
}