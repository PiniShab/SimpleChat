const users = [];

const userJoin = (id, username) => {
    const user = {id, username};
    user.color = `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;
    users.push(user);

    return user;
};

const getCurrentUser = (id) => {
    return users.find(user => user.id === id);
};

const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUsers = () => {
    return users;
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getUsers
};
