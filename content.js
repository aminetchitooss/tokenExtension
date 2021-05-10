
// console.log("testing ...")

chrome.runtime.onMessage.addListener(getToken)

function getToken(data, sender, sendResponse) {
    sendResponse({ token: localStorage['accessToken']?.trim() })
}
