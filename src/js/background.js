import '../img/icon-128.png'
import '../img/icon-34.png'
var console = chrome.extension.getBackgroundPage().console;
let domainTimeDict = {};
let currentDomain;
let currentTimer;
let shortTime = true;
const url = require('url');

//Set timer on startup
chrome.tabs.query({'active' : true, 'currentWindow': true}, function(tabs){
	let newUrl = new URL(tabs[0].url);
	currentDomain = newUrl.hostname;
	currentTimer = Date.now();
	console.log(JSON.stringify(domainTimeDict)); 
});

//Detect when going to a new domain and change timers accordingly
chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab){
	chrome.tabs.query({'active' : true, 'currentWindow': true}, function(tabs){
		addToDict(tabs);
	});
});

//Detect when tab is switched and switch timers accordingly
chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.query({'active' : true, 'currentWindow': true}, function(tabs){
		addToDict(tabs);
	});
});

//Listen for various messages
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	//Send the total time of a domain
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
				domain: currentDomain,
				shortTime: shortTime

			});        
    }

    //Send the domain dictionary
    if (message.request === "getDomainList") {
    	sendResponse({domainList: domainTimeDict, shortTime: shortTime});
    }

    //Remove a domain from the dictionary
    if (message.request === "removeDomain") {
    	delete domainTimeDict[message.domain];
    	sendResponse({status: "complete"});
    }

    //Send the toggled settings
    if (message.request === "getSettings"){
    	sendResponse({shortTime: shortTime});
    }

    //Toggle time setting
    if (message.request === "toggleTime"){
    	shortTime = !shortTime;
    	sendResponse({status: "complete"});
    }
});

function addToDict(tabs) {
	let newUrl = new URL(tabs[0].url);
		console.log(newUrl.hostname);
		//Check if user has gone to a new domain and not just a new url within the same domain
		console.log(chrome.runtime.id);
		if (currentDomain != newUrl.hostname && newUrl.hostname != chrome.runtime.id) {
			
			//Check if old domain has been visited before
			if (currentDomain in domainTimeDict) {
				domainTimeDict[currentDomain] = Date.now() - currentTimer + domainTimeDict[currentDomain];
				console.log(newUrl.hostname + " is in the dict");
			}
			else {
				domainTimeDict[currentDomain] = Date.now() - currentTimer;
				console.log(newUrl.hostname + " is not in the dict");
			}
			//update current domain
			currentDomain = newUrl.hostname;
			currentTimer = Date.now();
			console.log(JSON.stringify(domainTimeDict)); 	
		}
}