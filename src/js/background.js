import '../img/icon-128.png'
import '../img/icon-34.png'

var console = chrome.extension.getBackgroundPage().console;

let domainTimeDict = {};
let currentDomain;
let currentTimer;
let shortTime = true;
let blockedDomains = [];
const url = require('url');

//Set timer on startup
chrome.tabs.query({'active' : true, 'currentWindow': true}, function(tabs){
	let newUrl = new URL(tabs[0].url);
	currentTimer = Date.now();
	if(newUrl.hostname == chrome.runtime.id){
		currentDomain = "Domain Time Keeper";
	}
	else {
		currentDomain = newUrl.hostname;
	}
});

//Detect when going to a new domain and change timers accordingly
chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab){
	chrome.tabs.query({'active' : true, 'currentWindow': true}, function(tabs){
		let newUrl = new URL(tabs[0].url);
		addToDict(newUrl);			
	});
});

//Detect when tab is switched and switch timers accordingly
chrome.tabs.onActivated.addListener(function(activeInfo) {
	chrome.tabs.query({'active' : true, 'currentWindow': true}, function(tabs){
		let newUrl = new URL(tabs[0].url);
		addToDict(newUrl);
	});
});


/*
//Needs to be fixed, possibly due to known chrome bug

//Detect when clicking on a different window and pause the timer
chrome.windows.onFocusChanged.addListener(function(windowId){
	if (windowId == chrome.windows.WINDOW_ID_NONE){	
			//Check if old domain has been visited before
			if (!blockedDomains.includes(currentDomain)){	
				if (currentDomain in domainTimeDict) {
					domainTimeDict[currentDomain] = Date.now() - currentTimer + domainTimeDict[currentDomain];
				}
				else {
					domainTimeDict[currentDomain] = Date.now() - currentTimer;
				}
				//update current time and domain
				//currentTimer = null;
				//currentDomain = null;
			}	
	}
	else{
		chrome.tabs.query({'active' : true, 'currentWindow': true}, function(tabs){
			let newUrl = new URL(tabs[0].url);
			addToDict(newUrl);
		});
	}
});

*/

//Listen for various messages
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	//Send the total time of a domain
    if (message.request === "getTotalTime") {
    		
    	if (blockedDomains.includes(currentDomain)){
    		sendResponse({
    			totalTime: -1,
				domain: currentDomain,
				shortTime: -1,
    			status: "blocked"});
    	}
    	else {
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
				shortTime: shortTime,
				status: "unblocked"
			});
		}        
    }

    //Send the domain dictionary
    if (message.request === "getDomainList") {
    	sendResponse({domainList: domainTimeDict, shortTime: shortTime});
    }

    //Reset a domain in the dictionary
    if (message.request === "resetDomain") {
    	delete domainTimeDict[message.domain];
    	sendResponse({status: "complete"});
    }

    //Block a domain from being recorded
    if (message.request === "blockDomain") {
    	blockedDomains.push(message.domain);
    	delete domainTimeDict[message.domain];
    	sendResponse({status: "complete"});
    }

    //Send the toggled settings
    if (message.request === "getSettings"){
    	sendResponse({
    		shortTime: shortTime,
    		blockedDomains: blockedDomains
    	});
    }

    //Toggle time setting
    if (message.request === "toggleTime"){
    	shortTime = !shortTime;
    	sendResponse({status: "complete"});
    }

    //Unblock a domain
    if (message.request === "unblock"){
    	let i = blockedDomains.length;
    	while (i--) {
    		if (blockedDomains[i] == message.domain){
    			blockedDomains.splice(i,1);
    		}
    	}
    	sendResponse({status: "complete"});
    	console.log("unblock complete");
    }
});

function addToDict(newUrl) {
	//Check if the new domain is blocked
	//Check if user has gone to a new domain and not just a new url within the same domain
	if (currentDomain != newUrl.hostname && currentDomain != null) {
		if (!blockedDomains.includes(currentDomain)){
			//Check if old domain has been visited before
			if (currentDomain in domainTimeDict) {
				domainTimeDict[currentDomain] = Date.now() - currentTimer + domainTimeDict[currentDomain];
			}
			else {
				domainTimeDict[currentDomain] = Date.now() - currentTimer;
			}
		}
		if (blockedDomains.includes(newUrl.hostname)){
			currentDomain = newUrl.hostname;
			currentTimer = null;
		}
		else {
			//update current time and domain
			currentTimer = Date.now();
			if(newUrl.hostname == chrome.runtime.id){
				currentDomain = "Domain Time Keeper";
			}
			else {
				currentDomain = newUrl.hostname;
			} 
		}	
	}
}