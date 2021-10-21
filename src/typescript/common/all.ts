import injectCSS from "../lib/injectCSS";

function stopLoggingMeOut(){
	var stupidScripts : HTMLScriptElement[] = Array.from(document.getElementsByTagName("script")).filter(script => script.innerHTML.includes("keepMeLoggedIn"));
	for (var i = 0; i < stupidScripts.length; i++) {
		console.debug("[BetterExperience] Removed the following script:" + (stupidScripts[i].innerHTML).substring(0, 200) + "\n Script continues.....");
		stupidScripts[i].remove();
	}
	document.querySelector("#keepMeLoggedInModal").remove();
}

async function main() {
	if (await injectCSS(document, "all.css")) {

		// remove ugly white bar
		document.querySelector("body > div.is--spiral--robot.eat--bootstrap > header > div.header--branding.display--flex.dist--between").remove();

		stopLoggingMeOut();

		// branding yo
		let extensionTitleDiv: HTMLParagraphElement = document.createElement("div");
		let extensionTitle: HTMLParagraphElement = document.createElement("p");
		extensionTitleDiv.classList.add("tab-item", "js--ui-tab");
		extensionTitle.textContent = "Modified by betterExperience!"
		extensionTitle.style.cssText = 'margin-left: 10px; font-size: large; background: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
		extensionTitleDiv.appendChild(extensionTitle);
		document.querySelector("body > div.is--spiral--robot.eat--bootstrap > header > div.header--admin.js--admin-header.has--tabs.no--search > div > div > div").appendChild(extensionTitleDiv);
	}

}

main();