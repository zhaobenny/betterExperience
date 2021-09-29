document.getElementById("toggle").addEventListener("click", function(){
    chrome.storage.local.get(['enabledState'], function(result) {
        var enabledState : Boolean;
        console.debug('EnabledState is set to ' + result['enabledState']);
        if (result['enabledState'] === undefined){
            enabledState = true;
        } else {
            enabledState = result['enabledState'];
        }
        chrome.storage.local.set({enabledState: (!enabledState)});
        chrome.tabs.reload()
    });
});
