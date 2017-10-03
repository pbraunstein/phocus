document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#activatedCheckbox').addEventListener('change',
        function () {
            if (activatedCheckbox.checked) {
                console.log('beep!');
            } else {
                console.log('boop!');
            }
        }
    );
    chrome.storage.sync.set({'active': 'true'});
});

