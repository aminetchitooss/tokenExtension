
var repeatCount = 0
const includedLinks = ["servier", "localhost", "web.app"]
// console.log("testing ...")
chrome.storage.local.clear()
function sendToken() {
    if (localStorage['accessToken']) {
        chrome.storage.local.set({
            'token': localStorage['accessToken'].trim()
        });
        repeatCount = 0
    }
    else if (repeatCount < 5)
        setTimeout(() => {
            repeatCount++;
            sendToken()
        }, 1000);
}
sendToken()