document.addEventListener('DOMContentLoaded', () => {
    initialize();
});

function initialize() {
    // initialize click listener
    getCheckbox().addEventListener('change',
        function () {
            if (activatedCheckbox.checked) {
                chrome.storage.sync.set({'active': true});
            } else {
                chrome.storage.sync.set({'active': false});
            }
        }
    );

    // pull from storage
    pullFromStorage();

    // initialize text box and button
    getSubmit().addEventListener('click',
        function (e) {
            e.preventDefault();  // prevent page from rerendering
            addWebsite(getTextBox().value);
        });

    // initialize clear all button
    getClearAll().addEventListener('click',
        function () {
            chrome.storage.sync.clear();
        });
}

function pullFromStorage() {
    chrome.storage.sync.get(null, (items) => {
        getCheckbox().checked = items.active;
    });
}

function addWebsite(website) {
    // store the website
    chrome.storage.sync.get('websites', function(items) {
        if (Object.keys(items).length === 0 || items.websites.constructor !== Array) {
            items.websites = [];
        }
        items.websites.push(website)
        chrome.storage.sync.set({'websites': items.websites});
    });

    // display the name of the blocked website
    let websiteList = getList();
    let newElement = document.createElement('li');
    newElement.appendChild(document.createTextNode(website));
    websiteList.appendChild(newElement);
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

function getClearAll() {
    return document.querySelector('#clearAll');
}
