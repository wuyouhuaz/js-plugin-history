var list = [],
    historyBox, onClick, searchInput;

// const output = {
//     init,
//     add,
// };

function init(config) {
    historyBox = document.querySelector(config.historyBox);
    searchInput = document.querySelector(config.searchInput);
    onClick = config.onClick;
    onInputClicked();
    onInputBlur();
    getStorageList();
    render();
}
//历史记录框显示
function onInputClicked() {
    searchInput.addEventListener('click', function () {
        historyBox.hidden = false;
        getStorageList();
        render();
    });
}

//历史记录框隐藏
function onInputBlur() {
    document
        .documentElement
        .addEventListener('click', function (e) {
            let target = e.target;
            let inSearchInput = target.closest('#searchInput'),
                inhistoryList = target.closest('#historyBox');
            if (inSearchInput || inhistoryList)
                return;
            historyBox.hidden = true;
        });
}

function render() {
    historyBox.innerHTML = '';
    list.forEach(function (keyword) {
        let elHistory = document.createElement('div');
        elHistory.classList.add('history');
        elHistory.dataset.history = keyword;
        elHistory.innerHTML =
            `<div class="text">${keyword}</div>
                        <div class="tool">
                        <span class="delete">删除</span>
                        </div>`;
        historyBox.appendChild(elHistory);
        let elDelete = elHistory.querySelector('.delete');
        elHistory.addEventListener('click', function (e) {
            if (onClick) {
                keyword = searchInput.value = this.dataset.history;
                onClick(keyword, e);
            }
        });
        elDelete.addEventListener('click', function (e) {
            e.stopPropagation();
            let temp = this.closest('.history'),
                kwd = temp.dataset.history;
            remove(list, kwd);
            setStorageList(list);
            setTimeout(function () {
                render();
            }, 0);

            if (!list.length) {
                historyBox.hidden = true;
            } else {
                historyBox.hidden = false;
            }
        });
    });
}

function getStorageList() {
    list = JSON.parse(localStorage.getItem('historykey')) || [];
}

function setStorageList() {
    localStorage.setItem('historykey', JSON.stringify(list));
}

function add(keyword) {
    findDelete(list,keyword);
    list.unshift(keyword);
    render();
    setStorageList();
}

function remove(list, keyword) {
    var index = list.indexOf(keyword);
    if (index == -1)
        return;
    list.splice(index, 1);
    render();
    setStorageList();
}


function clear() {
    historyBox.hidden = true;
    list = [];
    render();
    setStorageList();
}
function findDelete(arr, element) {
    let index = arr.indexOf(element);
    if (index == -1) {
        return false;
    } else {
        arr.splice(index, 1);
        return true;
    }
}
// module.exports = output;