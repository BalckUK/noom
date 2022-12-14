//alert("hello!");
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);


function makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}


socket.addEventListener("open", () => {
    console.log("Connected to Server");
})


socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
})

socket.addEventListener("close", () => {
    console.log("Disconnected from Server");
})


/*setTimeout(() => {
    socket.send("hello from browser!");
}, 5000);*/

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    //socket.send(input.value);
    socket.send(makeMessage("new message", input.value));
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    //socket.send(input.value);
   /* socket.send({
        type : "nickname",
        payload : input.value
    });*/
    socket.send(makeMessage("nickname", input.value));
    input.value="";
}

messageForm.addEventListener("submit",handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);