WEBSITES_TO_BLOCK = [
    'thehill.com',
    'facebook.com',
    'cnn.com',
    'washingtonpost.com',
    'nytimes.com',
    'wsj.com',
    'xkcd',
    'www.realclearpolitics.com',
    'foxnews.com',
    'vox.com',
    'youtube.com',
    'twitter.com',
    'espn.com'
]

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

    // checkbox should display accurate state
    initializeCheckBoxState();

    // initialize list
    for (let website of WEBSITES_TO_BLOCK) {
        addWebsite(website);
    }
}

function initializeCheckBoxState() {
    chrome.storage.sync.get('active', (items) => {
        console.log(items.active);
        getCheckbox().checked = items.active;
    });
}

function addWebsite(website) {
    let ul = getList();
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(website));
    ul.appendChild(li);
}

function getCheckbox() {
    return document.querySelector('#activatedCheckbox');
}

function getList() {
    return document.querySelector('#websiteList');
}

