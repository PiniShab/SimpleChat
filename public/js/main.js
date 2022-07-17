const socket = io();

// Get user name from location params
const {username} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket.emit('joinChat', { username});

// Listen for the event and Get users from server
socket.on('chatUsers', (({ users }) => {
    
    // Updating the users list on the sidebar
    const usersList = document.querySelector('#users');
    usersList.innerHTML = users.map(user => `<li><i class="fa-solid fa-user" style="color: ${user.color};"></i> ${user.username}</li>`).join('');
}));

const outputMessages = (msg) => {
    const messageContainer = document.querySelector('.chat-messages');
    const isCurrentUser = username === msg.username && socket.id === msg.id; // Support identical names
    const className = `message${isCurrentUser ? ' myMessage' : ''}`;
    let html = '';
    html += `<div class="${isCurrentUser ? 'myMessageWrapper' : ''}">`;
    html += `<div class="${className}">`;
    html += '<div class="meta">';
    if (!isCurrentUser) {
        html += `<span dir="ltr" style="color:${msg.color};">${msg.username}</span>`;
    }
    html += '<span class="chatTime"> ' + msg.time + '</span></div>';
    html += '<div class="chatText">' + msg.text +'</div>';
    html += '</div>';

    messageContainer.insertAdjacentHTML('beforeend', html);

    messageContainer.scrollTop = messageContainer.scrollHeight;
};

socket.on('message', message => {
    outputMessages(message);
});

document.getElementById('chat-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg;
    socket.emit('chatMessage', msg.value);
    msg.value = '';
    msg.focus(); // For mouse click on Send
});

document.getElementById('settings').addEventListener('click', toggleSettingsOptions);
document.getElementById('favBgColor').addEventListener('change', setFavoriteBgColor);
document.getElementById('decreaseFontSize').addEventListener('click', setFontSize);
document.getElementById('increaseFontSize').addEventListener('click', setFontSize);
