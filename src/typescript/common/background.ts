chrome.runtime.onMessage.addListener(function (message, sender: chrome.runtime.MessageSender) {
  if (message.type === 'showPageAction') {
    chrome.pageAction.show(sender.tab.id)
  }
})
