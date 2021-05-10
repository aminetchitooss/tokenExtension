var inputText = document.getElementById("input");
var loading = document.getElementById("loading");
var refresh = document.getElementById("refresh");
var tooltiptext = document.getElementById("tooltiptext");
inputText.value = ""
const params = {
    active: true,
    currentWindow: true
}

function showRefresh() {
    setTimeout(() => {
        loading.style.display = "none"
        refresh.style.display = "block"
    }, 1000);
}

function setInputValue(pToken) {
    if (typeof pToken !== "undefined")
        setTimeout(() => {
            loading.style.display = "none"
            inputText.style.display = "block"
            inputText.value = pToken
            copyToken()
            tooltiptext.classList.add('show')
        }, 500);
}

function copyToken() {
    inputText.select();
    inputText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

function startup(tabs) {
    let msg = {
        txt: "Get my token please"
    }
    chrome.tabs.sendMessage(tabs[0].id, msg, (res) => {
        if (res?.token)
            setInputValue(res.token)
        else
            showRefresh()
        console.log(res)
    })
}

chrome.tabs.query(params, startup)

// console.log('poping up')