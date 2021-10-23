import injectCSS, { checkEnabled } from '../lib/injectCSS'

// Hardcoded values
const STATUS: number = 2
const ID: number = 4
const DIVISION: number = 6
const INTERNAL: number = 8

function removeHeaders (): void {
  const headerRow: HTMLTableRowElement = document.querySelector('#postingsTable > thead > tr')
  headerRow.querySelector(`th:nth-child(${STATUS})`).remove()
  headerRow.querySelector(`th:nth-child(${ID})`).remove()
  headerRow.querySelector(`th:nth-child(${DIVISION})`).remove()
  headerRow.querySelector(`th:nth-child(${INTERNAL})`).remove()
}

function modifyRows (): void {
  const rows = document.querySelectorAll('#postingsTable > tbody > tr')
  rows.forEach((row: Element) => {
    const button: HTMLElement = row.querySelector('td:nth-child(1) > a.btn.btn-primary')
    if (button && button.innerHTML.replace(/\s+/g, '') === 'Applied') {
      button.classList.remove('btn-primary')
      button.classList.add('btn-success')
    }
    row.querySelector(`td:nth-child(${STATUS})`).remove()
    row.querySelector(`td:nth-child(${ID})`).remove()
    combineDivision(row)
    row.querySelector(`td:nth-child(${INTERNAL})`).remove()
  })
}

function combineDivision (row: Element): void {
  // eliminate division column
  const divisionStr: String = row.querySelector(`td:nth-child(${DIVISION}) > span`).innerHTML
  const organizationStr: String = row.querySelector(`td:nth-child(${DIVISION - 1}) > span`).innerHTML
  if (!((organizationStr.toLowerCase().replace(/\s+/g, '')).includes(divisionStr.toLowerCase().replace(/\s+/g, '')))) {
    row.querySelector(`td:nth-child(${DIVISION - 1}) > span`).innerHTML = `${organizationStr} - ${divisionStr}`
  }
  row.querySelector(`td:nth-child(${DIVISION})`).remove()
}

async function main (): Promise<void> {
  // Awful check to see if on postings page
  const table = document.querySelector('#postingsTable');
  if (table === null) {
    if (checkEnabled()){
      document.querySelector("body > main > div.orbisModuleHeader").remove(); // remove orbis header that moved up randomly in a posting page???
    }
    return
  }

  if (await injectCSS(document, 'table.css')) {
    removeHeaders()
    modifyRows()
    // Make sure the right (useless) element is being removed
    let check: String = document.querySelector('body > main > div.row-fluid > div > div > div > div > div >' +
    'div > div.panel.panel-default > div > table > tbody > tr > td:nth-child(2)').innerHTML
    if (check && check === 'Job no longer available') {
      document.querySelector('body > main > div.row-fluid > div > div > div > div > div > div > div.panel.panel-default').remove()
    }

    // Update the list when new sorting order is used
    const target: HTMLElement = document.querySelector('#postingsTablePlaceholder')
    const config = { childList: true, subtree: true }

    let observer: MutationObserver = new MutationObserver(function () {
      observer.disconnect()
      if (table === null) {
        return
      }
      removeHeaders()
      modifyRows()
      observer.observe(target, config)
    })
    observer.observe(target, config)
  }
}

main()
