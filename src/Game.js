app = {};

/**
 * Represents playable interactions with the game.
 * @param squareWorldDimension
 * @param liveCellsSeed
 * @returns {app.Game}
 */
app.Game = function(squareWorldDimension, liveCellsSeed) {
	this.world = new myapp.World(squareWorldDimension, liveCellsSeed);
};

app.Game.prototype.step = function() {
	return this.world.tick();
};

function generateRandomLiveCellsSeed(dimension, chanceOfAlive) {
	var liveCellsSeed = [];

	// for each cell in world
	for(var y=0; y<dimension; y++) {
		for(var x=0; x<dimension; x++) {
			if(Math.random() <= chanceOfAlive) {
				liveCellsSeed.push([x,y]);
			}
		}
	}
	
	return liveCellsSeed;
}