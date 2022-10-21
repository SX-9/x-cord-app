const socket = io('https://x-cord-server.sx9.repl.co', {
	transports: ["websocket", "polling"]
})
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

let name = prompt('Please Enter A Username!')
if (name === "" || name === null) {
	name = "Guest"
}

setInterval(() => document.body.scrollTop = document.body.scrollHeight, 1)

appendMessage('You Joined!')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} Joined!`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} Left!`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
	if (!message) return;
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('p')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}