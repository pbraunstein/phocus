document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#activatedCheckbox').addEventListener('change',
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
    getIsActivated();
});

function getIsActivated() {
    chrome.storage.sync.get('active', (items) => {
        console.log("just logged items");
        console.log(items);
    });
}
