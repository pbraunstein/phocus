function main() {
    chrome.storage.sync.get(null, (items) => {
        // if something is wrong -- make no modifications to the page
        if (chrome.runtime.lastError || items === null) {
            return;
        }

        if (!items.active) {
            return;
        }
        websites_to_block = items.websites;
        let currentWebsite = location.href;
        for (let website of websites_to_block) {
            if (currentWebsite.includes(website)) {
                blockWebsite();
                return;  // no need to look at the other sites
            }
        }
    });
}

function blockWebsite() {
    let div = document.createElement('div');
    document.body.appendChild(div);
    div.className += ' block-phocus';
}

main();

