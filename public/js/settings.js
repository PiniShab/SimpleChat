const toggleSettingsOptions = (e) => {
    const settingsStyle = document.getElementById('settingsOptionsWrapper').style;
    const display = settingsStyle.display;
    const isHidden = display === '' || display === 'none';
    settingsStyle.display = isHidden ? 'inline-block' : 'none';
};

const setFavoriteBgColor = function(e)  {
    document.querySelector('.chat-messages').style.backgroundColor = this.value;
};

const setFontSize = function(e) {    
    let currSize = window.getComputedStyle(document.querySelector('.chatText')).fontSize;
    currSize = currSize ? +currSize.replace('px', '') : 16;
    currSize = this.id === 'decreaseFontSize' ? currSize - 1 : currSize + 1;

    let headStyle = document.head.querySelector('#fontsUserSize');
    if (headStyle) {
        headStyle.remove(); 
    }
    const html = `<style id="fontsUserSize" type="text/css"> .chatText { font-size: ${currSize}px;}</style>`;
    document.body.insertAdjacentHTML('beforeend', html);
};
