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

<<<<<<< HEAD
=======
	// paper.setup(document.getElementById('defaultCanvas'));
	// landscape = paper.project.importSVG(document.getElementById('landscape'));
 //    landscape.position = createVector(windowWidth/2,windowHeight/2);
>>>>>>> origin/master

    theX = 0;
};

function draw(){
<<<<<<< HEAD
	background();
=======
	// rectMode(CENTER);
	
		background(35,30,70);

	// for(i=0;i<height;i++){
	// 	stroke(i/4,0,0);
	// 	line(0,i,width,i);
	// }
>>>>>>> origin/master

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
<<<<<<< HEAD

	image(landscape1, 300, 0, width, height);
	image(landscape2, -300, 0, width, height);

	ice.appear();
=======
	
>>>>>>> origin/master
	
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

<<<<<<< HEAD
=======


	//landscape.view.update();
>>>>>>> origin/master
		pop();
	
};
