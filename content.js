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
    'twitter.com'
]

function main() {
    chrome.storage.sync.get('active', (items) => {
        console.log("hiiii" + items.active);
        if (!items.active) {
            return;
        }
        let currentWebsite = location.href;
        for (let website of WEBSITES_TO_BLOCK) {
            if (currentWebsite.includes(website)) {
                let div = document.createElement('div');
                document.body.appendChild(div);
                div.className += ' block';
            }
        }
    });

}

main();

