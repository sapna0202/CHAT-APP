const socket = io('http://localhost:8000');



// ALL Query Selectors

const form = document.getElementById('send_container');
const messageInput = document.getElementById('messageInp');
const messageContainer1 = document.querySelector('.container1');
var active_Users = document.querySelector(".active_Users");
var users_count = document.querySelector(".users_count");
const messageContainer = document.querySelector('.container2');
var audio = new Audio('MUSIC/ting.m4r');




// Taking Input of User Name

let name;

do{
    name = prompt('ENTER YOUR FULL NAME NAME TO JOIN');
}while(!name);

socket.emit('new-user-joined',name);




// Notify User Left And Join

const userJoinLeft = (name)=>{
    var div = document.createElement('div');
    div.classList.add('user_joined');
    let content=`<b>${name}</b>`;
    div.innerHTML=content;
    messageContainer.appendChild(div);
    messageContainer.scrollTop = messageContainer.scrollHeight;

};

socket.on('user-joined',name=>{
    userJoinLeft(`${name} joined the chat`);
});

socket.on('left',name=>{
    userJoinLeft(` ${name} left the chat `);
});




// Display The Name Of Joined User And Count Of The Users

socket.on('user_list', name =>{
    active_Users.innerHTML ='';
   let users_arr =Object.values(name);
    for(i=0;i<users_arr.length;i++){
        let p=document.createElement('p');
        p.innerText = users_arr[i];
        active_Users.appendChild(p);
    };
    users_count.innerHTML = users_arr.length;
});





// Message Sending Form INPUT

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(message){
    append(`You: ${message}`,'left');
    socket.emit('send',message);
    };
    messageInput.value = '';

});




// Display The Incoming And Outgoing Message

const append = (message, position)=>{
    var messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    messageContainer.scrollTop = messageContainer.scrollHeight;

   if(position == 'right'){
    audio.play();
   };
};

socket.on('receive',data=>{
    append(` ${data.name}:${data.message} ` ,'right');
});







