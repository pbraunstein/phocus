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
    initializeCheckBoxState();
}

function initializeCheckBoxState() {
    chrome.storage.sync.get('active', (items) => {
        console.log(items.active);
        getCheckbox().checked = items.active;
    });
}

function getCheckbox() {
    return document.querySelector('#activatedCheckbox');
}
