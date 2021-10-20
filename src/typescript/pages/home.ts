function main(){
	chrome.runtime.sendMessage({type: "showPageAction"});
	chrome.storage.local.get(['enabledState'], function(result) {
		if (result['enabledState'] || (result['enabledState'] === undefined)){
			var link : HTMLLinkElement = document.createElement("link");
			link.href = chrome.extension.getURL("main.css");
			link.type = "text/css";
			link.rel = "stylesheet";
        }
    })
}

main();