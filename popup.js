document.addEventListener('DOMContentLoaded', () => {
    initialize();
});

DISALLOWED_PUNCTUATION = ['~', '`', '<', '>', '{', '}', '@', '#', '$', '%',
    '^', '&', '*', '(', ')', '-', '_', '+', '=', '\\', '[', ']', '"', '\'']

let TAB_KEY_CODE = 9;

function initialize() {
    let checkBox = getCheckbox();
    let clearAllButton = getClearAll();
    // initialize click listener
    checkBox.addEventListener('change',
        function () {
            if (this.checked) {
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
            getTextBox().value = '';
        });

    // initialize clear all button
    clearAllButton.addEventListener('click',
        function () {
            chrome.storage.sync.clear();
            let ul = getList();
            while (ul.lastChild) {
               ul.removeChild(ul.lastChild);
            }
        });

    // trap focus within chrome extension
    // screen reader users can exit with esc button
    checkBox.addEventListener('keydown', (event) => {
        if (event.keyCode === TAB_KEY_CODE && event.shiftKey === true) {
            event.preventDefault();
            clearAllButton.focus();
        }
    });
    clearAllButton.addEventListener('keydown', (event) => {
        if (event.keyCode === TAB_KEY_CODE && event.shiftKey === false) {
            event.preventDefault();
            checkBox.focus();
        }
    });
}

function pullFromStorage() {
    chrome.storage.sync.get(null, (items) => {
        getCheckbox().checked = items.active;
        if (items.websites == null) {  // nothing to block
            return;
        }
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

        if (!websiteValid(website, items)) {
            return;
        }

        items.websites.push(website);
        items.websites.sort();
        chrome.storage.sync.set({'websites': items.websites});

        displayBlockedSite(website);
    });
}

function websiteValid(website, items) {
    // has tld
    if (!website.includes('.com')) {
        return false;
    }

    // duplicate detection
    for (site of items.websites) {
        if (site === website) {
            return false;
        }
    }

    for (disallowed of DISALLOWED_PUNCTUATION) {
        if (website.includes(disallowed)) {
            return false;
        }
    }

    return true;
}

function displayBlockedSite(website) {
    let websiteList = getList();
    let blockedWebsites = websiteList.children;
    let textElements = [];
    for (x of blockedWebsites) {
        textElements.push(x.firstChild.data);
    }
    pos = getWebsitePosition(website, textElements);

    let wrapperElement = document.createElement('div');
    wrapperElement.className = 'blocked-website-row'
    let newElement = document.createElement('span');
    newElement.appendChild(document.createTextNode(website));
    newElement.className = 'blocked-website-text'
    let closeButton = document.createElement('span');
    closeButton.appendChild(document.createTextNode('x'));
    closeButton.className = 'blocked-website-close-button'
    closeButton.setAttribute('aria-label', 'remove ' + website);
    closeButton.setAttribute('tabindex', '0');
    closeButton.setAttribute('role', 'button');
    wrapperElement.appendChild(newElement);
    wrapperElement.appendChild(closeButton);
    websiteList.insertBefore(wrapperElement, websiteList.childNodes[pos]);

    // add click listener to remove self
    closeButton.addEventListener(
            'click', handleCloseButtonClick);

    closeButton.addEventListener('keydown', (event) => {
        // Only trigger click when space or enter is keyed
        if (event.keyCode === 13 || event.keyCode == 32) {
            handleCloseButtonClick(event);
        }
    });
}

function handleCloseButtonClick(event) {
    let parentNode = event.target.parentElement;
    let websiteToUnblock = '';
    for (let child of parentNode.children) {
        if (child.className === 'blocked-website-text') {
            websiteToUnblock = child.firstChild.data;
        }
        parentNode.removeChild(child);
    }
    parentNode.parentElement.removeChild(parentNode);
    unblockWebsite(websiteToUnblock);
}

function getWebsitePosition(website, textArray) {
    let pos = 0;
    if (textArray.length == 0) {
        return 0;
    }
    while (pos < textArray.length && website.localeCompare(textArray[pos]) == 1) {
        pos += 1;
    }
    return pos;
}

function unblockWebsite(website) {
    chrome.storage.sync.get('websites', function(items) {
        if (Object.keys(items).length === 0 || items.websites.constructor !== Array) {
            return;  // data not valid - don't do anything
        }

        newBlockedList = [];
        for (site of items.websites) {
            if (site !== website) {
                newBlockedList.push(site);
            }
        }
        chrome.storage.sync.set({'websites': newBlockedList});
    });
}

function getCheckbox() {
    return document.querySelector('#activated-checkbox');
}

function getList() {
    return document.querySelector('#website-list');
}

function getTextBox() {
    return document.querySelector('#entry-text-box');
}

function getSubmit() {
    return document.querySelector('#entry-submit');
}

function getClearAll() {
    return document.querySelector('#clear-all');
}
