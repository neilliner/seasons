//var snow =[];
var ice = [];
var star =[];
var water = [];
var aur = [];

// var landscape1;
var landscape2;
var theX;


function preload() {
  landscape_front = loadImage("img/landscape_front.svg");
  landscape_back = loadImage("img/landscape_back.svg");
}


function setup(){
	//blendMode(MULTIPLY);
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

	water = new Water(2000);
	water.init();

	// paper.setup(document.getElementById('defaultCanvas'));
	// landscape = paper.project.importSVG(document.getElementById('landscape'));
 //    landscape.position = createVector(windowWidth/2,windowHeight/2);

    theX = 0;
};

function draw(){

	// rectMode(CENTER);
	
		background(35,30,70);

	push();
	aur.appear();
	aur.move();
	pop();
	
	fill(50,190,230,255);
	rect(0,height/2-20,2500,height);
	
	// for(i=0;i<height;i++){
	// 	stroke(i/4,0,0);
	// 	line(0,i,width,i);
	// }

	// if(mouseX < (width/2)/2){
	// 	theX -= 10;
	// }
	// else if (mouseX > (width/2) + ((width/2)/2)){
	// 	theX += 10;
	// }
	// else{
	// 	theX = theX;
	// }
	

	star.appear();
	star.fall();
	star.updatePosWithIndex(star.checkDisappear());
	star.tail();

	var x3 = map(mouseX, 0, width, -300, width+300); // single iceburg
	var x1 = map(mouseX, 0, width, 0, width); // front
	var x2 = map(mouseX, 0, width, 300, width-300); // back

	push();
	translate(-x2/4,0);
	image(landscape_back, 0, height/8, 1700, height-height/4);
	pop();

	push();
	translate(-x1/2,0); 
	image(landscape_front, 300, 0, 2000, height-height/4);
	pop();

	push();
	translate(-x3,0); 
	ice.appear();
	pop();
	

	// Snows

	// snow.appear();
	// snow.fall();
	// snow.updatePosWithIndex(snow.checkDisappear());	
	//aur.updateLen();
	water.appear();
	water.flow();
	//water.reFlow(water.checkDisappear());

	//landscape.view.update();

	
	
};
