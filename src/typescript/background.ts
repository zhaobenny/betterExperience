chrome.runtime.onMessage.addListener(function(message, sender: chrome.runtime.MessageSender) {
        if (message.type === 'showPageAction') {
            chrome.pageAction.show(sender.tab.id);
        }
});


chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log("change recived!");
});