//var snow =[];
var ice = [];
var star =[];
var water = [];
var aur = [];

var landscape;

function preload(){

}

function setup(){
	blendMode(MULTIPLY);
	createCanvas(windowWidth,windowHeight);
	//snow = new Snow(100);
	//snow.updatePos();
	ice = new Iceberg();

	star = new Star(5);
	star.updatePos();

	aur = new Aurora();
	aur.lengthOfAur();

	water = new Water();
	water.init();

	paper.setup(document.getElementById('defaultCanvas'));
	landscape = paper.project.importSVG(document.getElementById('landscape'));
    landscape.position = createVector(windowWidth/2,windowHeight/2);
};

function draw(){
	background(0);

	ice.appear();
	
	// Snows

	// snow.appear();
	// snow.fall();
	// snow.updatePosWithIndex(snow.checkDisappear());	

	star.appear();
	star.fall();
	star.updatePosWithIndex(star.checkDisappear());
	star.tail();

	//aur.appear();
	//aur.updateLen();

	water.appear();
	water.flow();
	//water.reFlow(water.checkDisappear());

	landscape.view.update();
};
