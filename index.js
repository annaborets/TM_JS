const input = document.querySelector('.input__item');
const list = document.querySelector('.list__container');
const addBtn = document.querySelector('.buttons__item_add');
const removeBtn = document.querySelector('.buttons__item_remove');

let queueItems = [];

function addNewQueueItem(text) {
    if (queueItems.length >= 20) {
        alert('Too much items!')
    } else {
        queueItems.push(text);
        saveToStorage(queueItems)
    }
}

function deleteOldQueueItem(queue) {
    queue.shift();
    saveToStorage(queueItems)
}

function renderItems(items) {
    list.innerHTML = '';
    const containerForQueueItems = document.createElement('ol');
    containerForQueueItems.classList.add('list');
    items.map(item => {
        const queueItem = document.createElement('li');
        queueItem.classList.add('list__item');
        queueItem.innerText = item;
        containerForQueueItems.appendChild(queueItem);
    })
    list.appendChild(containerForQueueItems);
}

function saveToStorage(data) {
    localStorage.setItem("queue", JSON.stringify(data));
}

function rehydrateFromLocalStorage() {
    queueItems = JSON.parse(localStorage.getItem("queue")) ?? [];
    renderItems(queueItems);
}

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text !== '') {
        addNewQueueItem(text);
        renderItems(queueItems);
        input.value = '';
    } else {
        alert('Please type something');
    }
})
removeBtn.addEventListener('click', () => {
    deleteOldQueueItem(queueItems);
    renderItems(queueItems);
})


rehydrateFromLocalStorage()
