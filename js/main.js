var snow =[];
var ice = [];
var star =[];
var water = [];
var aur = [];
var wave = [];
var fish = []

var music;
var landscape_front;
var landscape_back;
var fft;

function preload() {
	soundFormats('mp3');
	music = loadSound('music/Yellow90s.mp3');
  	landscape_front = loadImage("img/landscape_front.png");
  	landscape_back = loadImage("img/landscape_back.png");
}

function setup(){
	createCanvas(windowWidth,windowHeight);

	snow = new Snow(100);
	snow.updatePos();

	ice = new Iceberg(5);
	ice.init();

	star = new Star(5);
	star.updatePos();

	aur = new Aurora();
	aur.init();

	water = new Water(2000);
	water.init();

	wave = new Wave();

	fish = new Fish(5);
	fish.init();

	music.play();
	fft = new p5.FFT(.9,16);
};

function draw(){

	var spectrum = fft.analyze(16);
	background(35,30,70);

	star.appear();
	star.fall();
	star.updatePosWithIndex(star.checkDisappear());
	star.tail();

	aur.appear();
	aur.move();

	fill(50,190,230,255);
	noStroke();
	rectMode(CORNER);
	rect(0,(height/2),2500,height);

	var x3 = map(mouseX, 0, width, -300, width+300); // single iceberg
	var x1 = map(mouseX, 0, width, 0, width); // front
	var x2 = map(mouseX, 0, width, 300, width-300); // back

	push();
		translate(-x2/4,0);
		wave.appear(spectrum);
		fish.appear();
		image(landscape_back, 0, (height/8)+20, 1700, height-height/4);
	pop();

	push();
		translate(-x1/2,0); 
		image(landscape_front, 300, 20, 2000, height-height/4);
	pop();

	push();
		translate(-x3,0); 
		water.appear();
		water.flow();
		ice.appear();
		ice.floating();
		ice.changeColorByMusic(spectrum);
	pop();	

	// Snows

	snow.appear(millis()/1000);
	snow.fall(millis()/1000);
	snow.updatePosWithIndex(snow.checkDisappear());			
};
