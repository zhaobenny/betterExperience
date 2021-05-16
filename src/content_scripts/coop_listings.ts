// Hardcoded values yay
const ID : number = 5;
const DIVISION : number = 7;
const INTERNAL : number = 9;

function removeHeaders(){
	let headerRow : HTMLTableRowElement = document.querySelector("#postingsTable > thead > tr");
	headerRow.querySelector(`th:nth-child(${ID})`).remove()
	headerRow.querySelector(`th:nth-child(${DIVISION})`).remove()
	headerRow.querySelector(`th:nth-child(${INTERNAL})`).remove()
}

function modifyRows(){
	let rows = document.querySelectorAll("#postingsTable > tbody > tr"), i: number;
	for (i = 0; i < rows.length; i++) {
		rows[i].querySelector(`td:nth-child(${ID})`).remove();
		combineDivision(rows[i]);
		rows[i].querySelector(`td:nth-child(${INTERNAL})`).remove();
	}
}

function combineDivision(row : Element){
	// eliminate division column
	let division_str = row.querySelector(`td:nth-child(${DIVISION}) > span`).innerHTML;
	let organization_str = row.querySelector(`td:nth-child(${DIVISION - 1}) > span`).innerHTML;
	if (!((organization_str.toLowerCase().replace(/\s+/g, '')).includes(division_str.toLowerCase().replace(/\s+/g, '')))){
		row.querySelector(`td:nth-child(${DIVISION - 1}) > span`).innerHTML = organization_str + " - " + division_str;
	}
	row.querySelector(`td:nth-child(${DIVISION})`).remove();
}

function main(){
	// Check if on postings page
	if (document.querySelector("#postingsTablePlaceholder") == null){
		return
	}

	removeHeaders();
	modifyRows();

	// Make sure the right (useless) element is being removed
	var check = document.querySelector("body > main > div.row-fluid > div > div > div > div > div >" +
	"div > div.panel.panel-default > div > table > tbody > tr > td:nth-child(2)").innerHTML;
	if (check && check === "Job no longer available"){
			document.querySelector("body > main > div.row-fluid > div > div > div > div > div > div > div.panel.panel-default").remove();
	}

	// Update the list when new sorting order is used
	const target : HTMLElement = document.querySelector("#postingsTablePlaceholder");
	const config = { childList: true, subtree: true};

	var observer = new MutationObserver(function() {
		observer.disconnect();
		removeHeaders();
		modifyRows();
		observer.observe(target, config);
	});

	observer.observe(target, config);
}

main();