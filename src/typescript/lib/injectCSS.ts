export async function checkEnabled() : Promise<Boolean> {
    return new Promise((resolve) => {
      chrome.storage.local.get(['enabledState'], function (result) {
        if (result['enabledState'] === undefined) {
            resolve(true);
        } else {
          resolve(result['enabledState']);
        }
      });
    });
  };

export default async function injectCSS(document : Document, cssFilename : string): Promise<boolean> {
    chrome.runtime.sendMessage({type: "showPageAction"}); // show option to disable CSS
    if (await checkEnabled()){
      var link: HTMLLinkElement = document.createElement("link");
			link.href = chrome.extension.getURL(cssFilename);
			link.type = "text/css";
			link.rel = "stylesheet";
			document.getElementsByTagName("head")[0].appendChild(link);
      return true;
    }
    return false;
}
