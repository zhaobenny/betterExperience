import injectCSS from '../lib/injectCSS'

function stopLoggingMeOut (): void {
  const stupidScripts: HTMLScriptElement[] = Array.from(document.getElementsByTagName('script')).filter(script => script.innerHTML.includes('keepMeLoggedIn'))
  for (let i = 0; i < stupidScripts.length; i++) {
    console.debug('[BetterExperience] Removed the following script:' + (stupidScripts[i].innerHTML).substring(0, 200) + '\n Script continues.....')
    stupidScripts[i].remove()
  }
  document.querySelector('#keepMeLoggedInModal').remove()
}

async function main (): Promise<void> {
  if (await injectCSS(document, 'all.css')) {
    // remove ugly white bar
    document.querySelector('body > div.is--spiral--robot.eat--bootstrap > header > div.header--branding.display--flex.dist--between').remove()

    // TODO: does not work - need to halt the script before normal js injection
    // stopLoggingMeOut();

    // branding yo
    const extensionTitleDiv: HTMLParagraphElement = document.createElement('div')
    const extensionTitle: HTMLParagraphElement = document.createElement('p')
    extensionTitleDiv.classList.add('tab-item', 'js--ui-tab')
    extensionTitle.textContent = 'Modified by betterExperience!'
    extensionTitle.style.cssText = 'margin-left: 10px; font-size: large; background: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
    extensionTitleDiv.appendChild(extensionTitle)
    document.querySelector('body > div.is--spiral--robot.eat--bootstrap > header > div.header--admin.js--admin-header.has--tabs.no--search > div > div > div').appendChild(extensionTitleDiv)
  }
}

main()
