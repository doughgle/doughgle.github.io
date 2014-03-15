myapp = {};

/**
 * World represents a 2 dimensional square matrix of cells.
 * @param dimension
 * @param liveCellCoordinates
 * @returns {myapp.World}
 */

myapp.World = function(dimension, liveCellCoordinatesArray) {
	this.dimension = dimension;
	this.liveCellCoordinates = liveCellCoordinatesArray;
};

/**
 * 
 * @returns {Array} of live cells after tick.
 */
myapp.World.prototype.tick = function() {
	var nextGenerationOfLiveCells = [];
	
	// for each cell in world
	for(var y=0; y<this.dimension; y++) {
		for(var x=0; x<this.dimension; x++) {

			var liveNeighbours = this.getLiveNeighbourCount(x, y);
			if(this.isCellAlive(x, y)) {
				if(isSurvivor(liveNeighbours)) {
					nextGenerationOfLiveCells.push([x,y]);
				}				
			}
			else {
				if(isBorn(liveNeighbours)) {
					nextGenerationOfLiveCells.push([x,y]);
				}
			}
		}
	}
	
	this.liveCellCoordinates = nextGenerationOfLiveCells;
	
	return nextGenerationOfLiveCells;
};

myapp.World.prototype.getLiveNeighbourCount = function(x, y) {
	var liveNeighbours = 0;
	
	if(this.isCellAlive(x-1, y-1)) liveNeighbours++;
	if(this.isCellAlive(x,   y-1)) liveNeighbours++;
	if(this.isCellAlive(x+1, y-1)) liveNeighbours++;
	if(this.isCellAlive(x-1, y)) liveNeighbours++;
	if(this.isCellAlive(x+1, y)) liveNeighbours++;
	if(this.isCellAlive(x-1, y+1)) liveNeighbours++;
	if(this.isCellAlive(x,   y+1)) liveNeighbours++;
	if(this.isCellAlive(x+1, y+1)) liveNeighbours++;
	
//	jstestdriver.console.log(">>> liveNeighbours of ", x, y, ": ", liveNeighbours);
	return liveNeighbours;
};

myapp.World.prototype.isCellAlive = function(x, y) {
	for(var cell in this.liveCellCoordinates) {		
		if(x === this.liveCellCoordinates[cell][0] && y === this.liveCellCoordinates[cell][1]) {
			return true;
		}
	}
	return false;
};

function isBorn(liveNeighbours) {
	return liveNeighbours === 3;
}

function isSurvivor(liveNeighbours) {
	return liveNeighbours === 2 || liveNeighbours === 3;
}