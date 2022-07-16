const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getUsers} = require('./utils/users');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = 'Chat Bot';

// Setting the static folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

    socket.on('joinChat', ({ username }) => {
        const user = userJoin(socket.id, username);
        socket.join();
        
        socket.emit('message', formatMessage(botName, 'Welcome to the chat!', 'initial', user.id));

        socket.broadcast.to().emit('message', formatMessage(botName, `${user.username} has joined.`, 'initial', user.id));
        // Send users info as an event payload to the frontend
        io.emit('chatUsers', {            
            users: getUsers()
        });
    });

    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.emit('message', formatMessage(user.username, msg, user.color, user.id ));
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.emit('message', formatMessage(botName, `${user.username} has left the chat.`, user.color, user.id));
            io.emit('chatUsers', {                
                users: getUsers()
            });
        }
    });
});

const port = process?.env?.PORT || 3000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
