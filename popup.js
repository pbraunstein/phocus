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
            // TODO: Clear text entry box
            // TODO: Close suggestion box on clear
        });

    // initialize clear all button
    // TODO: Add functionality to individually delete sites
    getClearAll().addEventListener('click',
        function () {
            chrome.storage.sync.clear();
            let ul = getList();
            while (ul.lastChild) {
               ul.removeChild(ul.lastChild);
            }
        });
}

function pullFromStorage() {
    chrome.storage.sync.get(null, (items) => {
        console.log(items);
        getCheckbox().checked = items.active;
        for (site of items.websites) {
            displayBlockedSite(site);
        }
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
    displayBlockedSite(website);
}

function displayBlockedSite(website) {
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
