//var snow =[];
var ice = [];
var star =[];
var water = [];
var aur = [];

var landscape1;
var landscape2;
var theX;


function preload() {
  landscape1 = loadImage("img/landscape1.svg");
  landscape2 = loadImage("img/landscape2.svg");
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


    theX = 0;
};

function draw(){
	background();

	if(mouseX < (width/2)/2){
		theX -= 0.5;
	}
	else if (mouseX > (width/2) + ((width/2)/2)){
		theX += 0.5;
	}
	else{
		theX = theX;
	}
		push();
		translate(theX,0);

	image(landscape1, 300, 0, width, height);
	image(landscape2, -300, 0, width, height);

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

		pop();
	
};
