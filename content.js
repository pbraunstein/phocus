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
    if (!shouldBlock()) {
        return;
    }

    let div = document.createElement('div');
    document.body.appendChild(div);
    div.className += ' block';

//    window.addEventListener('load', function() {alert("are you sure you want to be here?");});
}

function shouldBlock() {
    let currentWebsite = location.href;
    for (let website of WEBSITES_TO_BLOCK) {
        if (currentWebsite.includes(website)) {
            return true;
        }
    }
    return false;
}

main();

