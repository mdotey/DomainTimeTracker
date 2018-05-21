import '../img/icon-128.png'
import '../img/icon-34.png'
var console = chrome.extension.getBackgroundPage().console;
let domainTimeDict = {};
let currentDomain;
let currentTimer;

//Set timer on startup
chrome.tabs.query({'active' : true, 'currentWindow': true}, function(tabs){
	let url = new URL(tabs[0].url);
	currentDomain = url.hostname;
	currentTimer = Date.now();	
});

//Detect when going to a new domain and change timers accordingly
chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab){
	chrome.tabs.query({'active' : true, 'currentWindow': true}, function(tabs){
		let url = new URL(tabs[0].url);
		//Check if user has gone to a new domain and not just a new url within the same domain
		if (currentDomain != url.hostname) {
			
			//Check if old domain has been visited before
			if (currentDomain in domainTimeDict) {
				domainTimeDict[currentDomain] = Date.now() - currentTimer + domainTimeDict[currentDomain];
				
			}
			else {
				domainTimeDict[currentDomain] = Date.now() - currentTimer;
			}
			//update current domain
			currentDomain = url.hostname;
			currentTimer = Date.now();
		}
	});
});

//Detect when tab is switched and switch timers accordingly
chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.query({'active' : true, 'currentWindow': true}, function(tabs){
		let url = new URL(tabs[0].url);
		//Check if user has gone to a new domain and not just a new url within the same domain
		if (currentDomain != url.hostname) {
			
			//Check if old domain has been visited before
			if (currentDomain in domainTimeDict) {
				domainTimeDict[currentDomain] = Date.now() - currentTimer + domainTimeDict[currentDomain];
				
			}
			else {
				domainTimeDict[currentDomain] = Date.now() - currentTimer;
			}
			//update current domain
			currentDomain = url.hostname;
			currentTimer = Date.now();
		}
	});
});

//Send the total time for website request
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.request === "getTotalTime") {
    		let totalTime;
    		if (currentDomain in domainTimeDict) {
    			totalTime = Date.now() - currentTimer + domainTimeDict[currentDomain];
    		}
    		else {
    			totalTime = Date.now() - currentTimer;
    		}

			sendResponse({ 
				totalTime: totalTime,
				domain: currentDomain

			});        
    }
});








/*//test dict iteration
let dict = {};
dict.key1 = "val1";
dict.key2 = "val2";
dict.key3 = "val3";
dict.key4 = "val4";

for (const [ key, value ] of Object.entries(dict)) {
    // do something with `key` and `value`
    console.log(value + "value" + key + "key");
    if (!("key7" in dict)) {
    	console.log( dict.key3 + "we did it");
    }
}*/
