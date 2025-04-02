const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
appendMessage('You joined', 'right');
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`, 'left');
});

socket.on('user-connected', name => {
    appendMessage(`${name} connected`, 'left');
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`, 'left');
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message !== '') {
        appendMessage(`You: ${message}`, 'right'); // Your messages appear on the right
        socket.emit('send-chat-message', message);
        messageInput.value = '';
    }
});

function appendMessage(message, position) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message', position);
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}