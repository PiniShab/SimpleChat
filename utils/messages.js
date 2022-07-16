const moment = require('moment');
const formatMessage = (username, text, color, id) => { 
    return {
        username,
        text,
        time: moment().format('h:mm A'),
        color,
        id
    };
}

module.exports = formatMessage;
