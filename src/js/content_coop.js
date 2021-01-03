// Hardcoded values yayy
const id = 5;
const division = 7;
const internal = 9;


function updateTable(){
	removeHeaders();
	modifyRows();
}

function removeHeaders(){
	var headerRow = document.querySelector("#postingsTable > thead > tr");
	headerRow.querySelector(`th:nth-child(${id})`).remove()
	headerRow.querySelector(`th:nth-child(${division})`).remove()
	headerRow.querySelector(`th:nth-child(${internal})`).remove()
}

function modifyRows(){
	var rows = document.querySelectorAll("#postingsTable > tbody > tr"), i;
	for (i = 0; i < rows.length; i++) {
		rows[i].querySelector(`td:nth-child(${id})`).remove();
		rows[i].querySelector(`td:nth-child(${division})`).remove();
		rows[i].querySelector(`td:nth-child(${internal})`).remove();
	}
}


// console.log("its is workin.")

var check = document.querySelector("body > main > div.row-fluid > div > div > div > div > div >" +
"div > div.panel.panel-default > div > table > tbody > tr > td:nth-child(2)").innerHTML;
if (check && check === "Job no longer available"){
		document.querySelector("body > main > div.row-fluid > div > div > div > div > div > div > div.panel.panel-default").remove();
}
updateTable();
