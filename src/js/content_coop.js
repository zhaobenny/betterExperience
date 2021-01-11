// Hardcoded values yay
const id = 5;
const division = 7;
const internal = 9;

function removeHeaders(){
	let headerRow = document.querySelector("#postingsTable > thead > tr");
	headerRow.querySelector(`th:nth-child(${id})`).remove()
	headerRow.querySelector(`th:nth-child(${division})`).remove()
	headerRow.querySelector(`th:nth-child(${internal})`).remove()
}


function modifyRows(){
	let rows = document.querySelectorAll("#postingsTable > tbody > tr"), i;
	for (i = 0; i < rows.length; i++) {
		rows[i].querySelector(`td:nth-child(${id + 1})`).style.cssText = "max-width: 500px; white-space: normal;"; //job title
		rows[i].querySelector(`td:nth-child(${id})`).remove();
		combineDivision(rows[i]);
		rows[i].querySelector(`td:nth-child(10)`).style.cssText = "max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"; // location
		rows[i].querySelector(`td:nth-child(${internal})`).remove();
	}
}
function combineDivision(row){
	// eliminate division column
	let division_str = row.querySelector(`td:nth-child(${division}) > span`).innerHTML;
	let organization_str = row.querySelector(`td:nth-child(${division - 1}) > span`).innerHTML;
	if (!(organization_str.includes(division_str))){
		row.querySelector(`td:nth-child(${division - 1}) > span`).innerHTML = organization_str + " - " + division_str;
	}
	row.querySelector(`td:nth-child(${division})`).remove();
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
	const target = document.querySelector("#postingsTablePlaceholder");
	const config = { childList: true, subtree: true};

	var observer = new MutationObserver(function(mutations) {
		observer.disconnect();
		removeHeaders();
		modifyRows();
		observer.observe(target, config);
	});

	observer.observe(target, config);
}

main();