const socket=io('http://localhost:8000');
const form= document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');
const messageContainer= document.querySelector(".container");
var audio= new Audio('beep-02.mp3');

const append=(message, position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
     if(position==='left'){
        audio.play();
    
     }
    
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`you: ${message}`, 'right')
    socket.emit('send',message);
    messageInput.value='';
})

const name= prompt("enter your name to join");

socket.emit('new-user-joined', name);
socket.on('user-joined', (name)=>{
  append(`${name} join chat`,'right');
})

socket.on('receive', data=>{
    append(` ${data.name}: ${data.message}`,'left');
    //socket.emit('send',message);
  })

  socket.on('left', name=>{
      console.log('left the chat');
    append(` ${data.name} left the chat`,'left');
    //socket.emit('send',message);
  })