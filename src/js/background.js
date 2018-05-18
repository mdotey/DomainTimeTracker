import '../img/icon-128.png'
import '../img/icon-34.png'
var console = chrome.extension.getBackgroundPage().console;
const startTime = Date.now();
let websites = [];

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.request === "getStartTime") {
        sendResponse({startTime: startTime});
    }
});

