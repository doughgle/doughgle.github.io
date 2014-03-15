GameTest = TestCase("GameTest");


GameTest.prototype.test_generateLiveCellsSeedWithZeroPercentChanceOfAlive = function() {
  var liveCellsSeed = generateRandomLiveCellsSeed(dimension=3, chanceOfAlive=0);
  assertEquals([], liveCellsSeed);
};

GameTest.prototype.test_generateLiveCellsSeedWith100PercentChanceOfAlive = function() {
	  var liveCellsSeed = generateRandomLiveCellsSeed(dimension=2, chanceOfAlive=1.0);
	  assertEquals([[0,0], [1,0], [0,1], [1,1]], liveCellsSeed);
};

GameTest.prototype.test_eachStepThroughGame_returnsNewLiveCells = function() {
	var game = new app.Game(dimension=4, liveCellsSeed=[]);
	assertEquals([], game.step());
};

GameTest.prototype.test_stepThroughAGameThatBeginsAsBlock = function() {
	var game = new app.Game(dimension=2, liveCellsSeed=[[0,0], [1,0], [0,1], [1,1]]);
	assertEquals([[0,0], [1,0], [0,1], [1,1]], game.step());
};
