//var snow =[];
var ice = [];
var star =[];
var water = [];
var aur = [];

var landscape;
var theX;

function preload(){

}

function setup(){
	blendMode(MULTIPLY);
	createCanvas(windowWidth,windowHeight);
	//snow = new Snow(100);
	//snow.updatePos();
	ice = new Iceberg(5);
	ice.init();

	star = new Star(5);
	star.updatePos();

	aur = new Aurora();
	aur.init();
	// aur.lengthOfAur();

	water = new Water();
	water.init();

	// paper.setup(document.getElementById('defaultCanvas'));
	// landscape = paper.project.importSVG(document.getElementById('landscape'));
 //    landscape.position = createVector(windowWidth/2,windowHeight/2);

    theX = 0;
};

function draw(){
	// rectMode(CENTER);
	
		background(35,30,70);

	// for(i=0;i<height;i++){
	// 	stroke(i/4,0,0);
	// 	line(0,i,width,i);
	// }

	if(mouseX < (width/2)/2){
		theX -= 10;
	}
	else if (mouseX > (width/2) + ((width/2)/2)){
		theX += 10;
	}
	else{
		theX = theX;
	}
		push();
		translate(theX,0);
	
	
	// Snows

	// snow.appear();
	// snow.fall();
	// snow.updatePosWithIndex(snow.checkDisappear());	

	star.appear();
	star.fall();
	star.updatePosWithIndex(star.checkDisappear());
	star.tail();

	aur.appear();
	aur.move();
	//aur.updateLen();

	ice.appear();

	water.appear();
	water.flow();
	//water.reFlow(water.checkDisappear());



	//landscape.view.update();
		pop();
	
};
