document.addEventListener('DOMContentLoaded', () => {
    initialize();
    chrome.storage.sync.get(null, (items) => console.log(items));
});

function initialize() {
    // initialize click listener
    getCheckbox().addEventListener('change',
        function () {
            if (activatedCheckbox.checked) {
                console.log('beep!');
                chrome.storage.sync.set({'active': true});
            } else {
                console.log('boop!');
                chrome.storage.sync.set({'active': false});
            }
        }
    );

    // checkbox should display accurate state
    initializeCheckBoxState();

    // initialize text box and button
    getSubmit().addEventListener('click',
        function () {
            addWebsite(getTextBox().value);
        });
}

function initializeCheckBoxState() {
    chrome.storage.sync.get('active', (items) => {
        console.log(items.active);
        getCheckbox().checked = items.active;
    });
}

function addWebsite(website) {
    chrome.storage.sync.set({'website': website});
//    let ul = getList();
//    let li = document.createElement('li');
//    li.appendChild(document.createTextNode(website));
//    ul.appendChild(li);
}

function getCheckbox() {
    return document.querySelector('#activatedCheckbox');
}

function getList() {
    return document.querySelector('#websiteList');
}

function getTextBox() {
    return document.querySelector('#entryTextBox');
}

function getSubmit() {
    return document.querySelector('#entrySubmit');
}
