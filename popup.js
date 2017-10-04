document.addEventListener('DOMContentLoaded', () => {
    initialize();
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

    // pull from storage
    pullFromStorage();

    // initialize text box and button
    getSubmit().addEventListener('click',
        function () {
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
        console.log(items);
        getCheckbox().checked = items.active;
    });
}

function addWebsite(website) {
    chrome.storage.sync.get('websites', function(items) {
        if (Object.keys(items).length === 0 || items.websites.constructor !== Array) {
            items.websites = [];
        }
        items.websites.push(website)
        chrome.storage.sync.set({'websites': items.websites});
    });
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
