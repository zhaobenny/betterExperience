function toggleText(state : Boolean){
    if (state){
        document.getElementById("toggle").innerHTML = "Toggle Off";
    } else {
        document.getElementById("toggle").innerHTML = "Toggle On";
    }
}

var enabledState : Boolean;

chrome.storage.local.get(['enabledState'], function(result) {
    if (result['enabledState'] === undefined){
        enabledState = true;
    } else {
        enabledState = result['enabledState'];
    }
    toggleText(enabledState);
});


document.getElementById("toggle").addEventListener("click", function(){
        chrome.storage.local.set({enabledState: (!enabledState)});
        chrome.tabs.reload(); // reloads current page
        toggleText(!enabledState);
});