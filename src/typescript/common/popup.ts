import { checkEnabled } from '../lib/injectCSS'
var enabledState: Boolean
var toggle: HTMLInputElement = document.getElementById('toggle') as HTMLInputElement
async function main (): Promise<void> {
  enabledState = await checkEnabled()

  if (enabledState) {
    toggle.checked = true
  }

  document.getElementById('toggle').addEventListener('click', function () {
    chrome.storage.local.set({ enabledState: (!enabledState) })
    chrome.tabs.reload() // reloads current page
  })
}

main()
