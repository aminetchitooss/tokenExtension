var inputText = document.getElementById("input");
var loading = document.getElementById("loading");
var refresh = document.getElementById("refresh");
var repeatCount = 0
inputText.value = ""
function getToken() {

    // chrome.storage.sync.get('token', function (data) {
    //     if (data.isIncluded == false) {
    //         showExcluded()
    //     } else if (typeof data.token == "undefined" && repeatCount < 5) {
    //         setTimeout(() => {
    //             repeatCount++;
    //             getToken()
    //         }, 1000);
    //     } else {
    //         setToken(data.token)
    //         repeatCount = 0
    //     }
    // });

    chrome.storage.local.get("token", function (data) {
        if (repeatCount >= 5) {
            showRefresh()
        } else if (typeof data.token == "undefined" && repeatCount <= 5) {
            setTimeout(() => {
                repeatCount++;
                getToken()
            }, 1000);
        } else {
            setToken(data.token)
            repeatCount = 0
        }
    });


}

function showRefresh() {
    setTimeout(() => {
        loading.style.display = "none"
        refresh.style.display = "block"
    }, 1000);
}

function setToken(pToken) {
    if (typeof pToken !== "undefined")
        setTimeout(() => {
            loading.style.display = "none"
            inputText.style.display = "block"
            inputText.value = pToken
            copyToken()
        }, 1000);
}

function copyToken() {
    inputText.select();
    inputText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

getToken()

console.log('yep')