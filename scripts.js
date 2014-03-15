var dimension = 15;

$(document).ready(function(){
	$grid = $('#grid');
	drawGrid(dimension);
	var seed = generateRandomLiveCellsSeed(dimension, chanceOfAlive=0.5);	
	cells = $grid.find('td');
	drawSeed(seed);
});

function drawGrid(dimension) {

	var trHtml = [];
	for(var y=0; y<dimension; y++) {
		trHtml.push("<tr>");
		for(var x=0; x<dimension; x++) {
			trHtml.push("<td>&nbsp</td>");
		}
	}
	var trHtmlString = trHtml.join('');
	$grid.append($(trHtmlString));
}

function drawSeed(seed) {
//	console.log("seed ", seed);
	for(var cellRef in seed) {
		console.log("live cell" + seed[cellRef]);
		var $drawableCell = getCell(seed[cellRef][0], seed[cellRef][1]);
		$drawableCell.addClass('alive');
	}
}

function getCell(x, y) {
	return $(cells[y*dimension +x]);
}