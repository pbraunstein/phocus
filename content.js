function main() {
    chrome.storage.sync.get(null, (items) => {
        console.log(items);
        if (!items.active) {
            console.log('early return');
            return;
        }
        websites_to_block = items.websites;
        console.log(websites_to_block);
        let currentWebsite = location.href;
        for (let website of websites_to_block) {
            if (currentWebsite.includes(website)) {
                let div = document.createElement('div');
                document.body.appendChild(div);
                div.className += ' block';
            }
        }
    });

}

main();

