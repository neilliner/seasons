//var snow =[];
var ice = [];
var star =[];

var aur = [];

var landscape;

function preload(){

}

function setup(){
	createCanvas(windowWidth,windowHeight);
	var canvas = document.getElementById('defaultCanvas');
	paper.setup(canvas);
	//snow = new Snow(100);
	//snow.updatePos();
	ice = new Iceberg();

	star = new Star(5);
	star.updatePos();

	aur = new Aurora();
	aur.lengthOfAur();

	landscape = paper.project.importSVG(document.getElementById('landscape'));

    landscape.position = new paper.Point(windowWidth/2,windowHeight/1.3);
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

	aur.appear();
	aur.updateLen();
};
