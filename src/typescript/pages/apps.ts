import {checkEnabled} from "../lib/injectCSS";

// Hardcoded values - pray they do not break
const DIVISION: number = 6;

async function applyAfterLoad() {
    const rows = document.querySelectorAll('#na_studentApplicationGridTableID > tbody > tr')
    if (!rows) {
        return;
    }
    rows.forEach((row) => {
        combineDivision(row);
    });
    removeHeaders();
}

// Could not reuse functions from other scripts
// MyExperience has differing table structures hurray

function removeHeaders(): void {
    const headerRow: HTMLTableRowElement = document.querySelector('#na_studentApplicationGridTableHead > tr');
    (headerRow.querySelector(`th:nth-child(${DIVISION})`) as HTMLElement).style.display = "none";
}

function combineDivision(row: Element): void {
    const divisionStr: String = row.querySelector(`td:nth-child(${DIVISION})`).innerHTML
    const organizationStr: String = row.querySelector(`td:nth-child(${DIVISION - 1})`).innerHTML
    if (!((organizationStr.toLowerCase().replace(/\s+/g, '')).includes(divisionStr.toLowerCase().replace(/\s+/g, '')))) {
        row.querySelector(`td:nth-child(${DIVISION - 1})`).innerHTML = `${organizationStr} - ${divisionStr}`
    }
    (row.querySelector(`td:nth-child(${DIVISION})`) as HTMLElement).style.display = "none";
}

async function main(): Promise<void> {
    if (!checkEnabled()) {
        return;
    }

    const loading = document.querySelector("#na_studentApplicationGrid_processing");
    if (!loading) {
        return;
    }

    // EXTREMELY useful element is removed
    document.querySelector("body > main > div.box.boxContent > div.panel.panel-default").remove();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach(async () => {
            observer.disconnect();
            await applyAfterLoad();
            observer.observe(loading, config);
        });
    });

    var config = { attributes: true, childList: true };
    observer.observe(loading, config);
}

main();