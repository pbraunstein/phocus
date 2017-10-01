console.log("hi all");

function main() {
    if !shoudlBlock() {
        return;
    }

    var div = document.createElement('div');
    document.body.appendChild(div);
    div.className += ' block';

    window.addEventListener('load', function() {alert("are you sure you want to be here?");});
}

function shouldBlock() {
    if location.href.includes('thehill.com') {
        return true;
    } else {
        return false;
    }
}

main();

