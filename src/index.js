const express = require('express')
const configViewEngine = require('./configs/viewEngine')
const bodyParser = require('body-parser')
const db = require('./configs/connectDB')
require('dotenv').config()
//app & port
const app = express()
const port = process.env.PORT || 5000
const http = require('http');
const server = http.createServer(app)
//config body-parser
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//config views
configViewEngine(app)
app.use(express.static('public'))

const authRouter = require('./routes/auth.route')
//routes
app.get('/', (req, res) => {
    res.render('chat/chat')
})
app.post('/', (req, res) => {
    console.log(req.body);
})
app.use('/auth', authRouter)

server.listen(port, () => {
    console.log(`Listening to port ${port}`);
})
//end config
//socket io
var users = {}
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('New socket connected! >>', socket.id)
})
io.on('connection', (socket) => {
    console.log('👾 New socket connected! >>', socket.id)

    // handles new connection
    socket.on('new-connection', (data) => {
        // captures event when new clients join
        console.log(`new-connection event received`, data)
        // adds user to list
        users[socket.id] = data.username
        console.log('users :>> ', users)
        // emit welcome message event
        socket.emit('welcome-message', {
            user: 'server',
            message: `Welcome to this Socket.io chat ${data.username}. There are ${Object.keys(users).length
                } users connected`,
        })
    })

    // handles message posted by client
    socket.on('new-message', (data) => {
        console.log(`👾 new-message from ${data.user}`)
        // broadcast message to all sockets except the one that triggered the event
        socket.broadcast.emit('broadcast-message', {
            user: users[data.user],
            message: data.message,
        })
    })
})