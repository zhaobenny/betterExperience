import injectCSS from "../lib/injectCSS";

// Hardcoded values
const STATUS: number = 2;
const ID: number = 4;
const DIVISION: number = 6;
const INTERNAL: number = 8;

function removeHeaders() {
	let headerRow: HTMLTableRowElement = document.querySelector("#postingsTable > thead > tr");
	headerRow.querySelector(`th:nth-child(${STATUS})`).remove()
	headerRow.querySelector(`th:nth-child(${ID})`).remove()
	headerRow.querySelector(`th:nth-child(${DIVISION})`).remove()
	headerRow.querySelector(`th:nth-child(${INTERNAL})`).remove()
}

function modifyRows() {
	let rows = document.querySelectorAll("#postingsTable > tbody > tr"), i: number;
	rows.forEach((row: Element) => {
		let button: HTMLElement = row.querySelector("td:nth-child(1) > a.btn.btn-primary");
		if (button && button.innerHTML.replace(/\s+/g, '') === "Applied") {
			button.classList.remove("btn-primary");
			button.classList.add("btn-success");
		}
		row.querySelector(`td:nth-child(${STATUS})`).remove()
		row.querySelector(`td:nth-child(${ID})`).remove();
		combineDivision(row);
		row.querySelector(`td:nth-child(${INTERNAL})`).remove();
	})
}

function combineDivision(row: Element) {
	// eliminate division column
	let division_str: String = row.querySelector(`td:nth-child(${DIVISION}) > span`).innerHTML;
	let organization_str: String = row.querySelector(`td:nth-child(${DIVISION - 1}) > span`).innerHTML;
	if (!((organization_str.toLowerCase().replace(/\s+/g, '')).includes(division_str.toLowerCase().replace(/\s+/g, '')))) {
		row.querySelector(`td:nth-child(${DIVISION - 1}) > span`).innerHTML = organization_str + " - " + division_str;
	}
	row.querySelector(`td:nth-child(${DIVISION})`).remove();
}

async function main(){
	// Awful check to see if on postings page
	if (document.querySelector("#postingsTablePlaceholder") == null) {
		return;
	}

	if (await injectCSS(document, "table.css")){
		removeHeaders();
		modifyRows();
		// Make sure the right (useless) element is being removed
		var check: String = document.querySelector("body > main > div.row-fluid > div > div > div > div > div >" +
			"div > div.panel.panel-default > div > table > tbody > tr > td:nth-child(2)").innerHTML;
		if (check && check === "Job no longer available") {
			document.querySelector("body > main > div.row-fluid > div > div > div > div > div > div > div.panel.panel-default").remove();
		}

		// Update the list when new sorting order is used
		const target: HTMLElement = document.querySelector("#postingsTablePlaceholder");
		const config = { childList: true, subtree: true };

		var observer: MutationObserver = new MutationObserver(function () {
			observer.disconnect();
			removeHeaders();
			modifyRows();
			observer.observe(target, config);
		});
		observer.observe(target, config);
	}
}

main();