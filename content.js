
// console.log("testing ...")
let COUNT = 0
const RETRY_LIMIT = 3
chrome.runtime.onMessage.addListener(gotMessage)

function getToken() {
    return new Promise(resolve => {
        if (localStorage['accessToken']?.trim())
            resolve(localStorage['accessToken'].trim())
        else if (COUNT < RETRY_LIMIT) {
            COUNT++;
            console.log('Retrying getting token ...')
            setTimeout(() => {
                resolve(getToken())
            }, 1000);
        }
        else
            resolve(null)
    })
}
function gotMessage(data, sender, sendResponse) {
    (async () => {
        COUNT = 0
        const payload = await getToken();
        console.log('got it')
        sendResponse({ token: payload })
    })();
    return true;
}
