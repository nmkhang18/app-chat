console.log('chat.js file loaded!')
getDateTime = () => {
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1);
    var time = today.getHours() + ":" + today.getMinutes()
    var dateTime = date + ' ' + time;

    return dateTime
}

// IMPORTANT! By default, socket.io() connects to the host that
// served the page, so we dont have to pass the server url
var socket = io.connect()

// FILE /client/chat.js

console.log('chat.js file loaded!')

// IMPORTANT! By default, socket.io() connects to the host that
// served the page, so we dont have to pass the server url
var socket = io.connect()

//prompt to ask user's name
const username = prompt('Welcome! Please enter your name:')

// emit event to server with the user's name
socket.emit('new-connection', { username })

// captures welcome-message event from the server
socket.on('welcome-message', (data) => {
    console.log('received welcome-message >>', data)
})

socket.on('welcome-message', (data) => {
    console.log('received welcome-message >>', data)
    // adds message, not ours
    addMessage(data, false)
})

// receives two params, the message and if it was sent by yourself
// so we can style them differently
function addMessage(data, isSelf = false) {
    const div = document.createElement('div')
    const div1 = document.createElement('div')
    div.classList.add('d-flex', 'flex-row')
    div.append(div1)

    if (isSelf) {
        div.classList.add('justify-content-end')
        const p1 = document.createElement('p')
        const p2 = document.createElement('p')
        p1.classList.add('small', 'p-2', 'me-3', 'mb-1', 'text-white', 'rounded-3', 'bg-primary')
        p1.innerText = `${data.message}`
        p2.classList.add('small', 'me-3', 'mb-3', 'rounded-3', 'text-muted')
        p2.innerText = getDateTime()
        div1.append(p1)
        div1.append(p2)
        // div.innerText = `${data.message}`
    } else {
        if (data.user === 'server') {
            // message is from the server, like a notification of new user connected
            // div.classList.add('others-message')
            div.innerText = `${data.message}`
        } else {
            // message is from other user
            div.classList.add('justify-content-start')
            const p1 = document.createElement('p')
            const p2 = document.createElement('p')
            p1.classList.add('small', 'p-2', 'ms-3', 'mb-1', 'rounded-3')
            p1.innerText = `${data.user}: ${data.message}`
            p1.style.backgroundColor = '#9e9c98'
            p2.classList.add('small', 'ms-3', 'mb-3', 'rounded-3', 'text-muted', 'float-end')
            p2.innerText = getDateTime()
            div1.append(p1)
            div1.append(p2)
        }
    }
    // get chatContainer element from our html page
    const chatContainer = document.getElementById('chatContainer')

    // adds the new div to the message container div
    chatContainer.append(div)
}

const messageForm = document.getElementById('messageForm')

messageForm.addEventListener('submit', (e) => {
    // avoids submit the form and refresh the page
    e.preventDefault()

    const messageInput = document.getElementById('messageInput')

    // check if there is a message in the input
    if (messageInput.value !== '') {
        let newMessage = messageInput.value
        //sends message and our id to socket server
        socket.emit('new-message', { user: socket.id, message: newMessage })
        // appends message in chat container, with isSelf flag true
        addMessage({ message: newMessage }, true)
        //resets input
        messageInput.value = ''
    } else {
        // adds error styling to input
        messageInput.classList.add('error')
    }
})

socket.on('broadcast-message', (data) => {
    console.log('📢 broadcast-message event >> ', data)
    // appends message in chat container, with isSelf flag false
    addMessage(data, false)
})