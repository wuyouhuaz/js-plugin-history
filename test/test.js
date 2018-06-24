// var history = require('../src/history');

init({
    historyBox: '#historyBox',
    searchInput: '#searchInput',
    onClick: function (keyword, e) {
        alert('您点击了当前历史记录');
        return;
    },
});

add('a');
add('b');
// history.remove('b');
// history.clear();