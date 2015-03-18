var star =[];
var t = [];

function preload(){

}

function setup(){
	createCanvas(windowWidth,windowHeight);
	star = new Star(100);
	star.updatePos();
	t = new Tree();
}

function draw(){
	background(0);
	t.appear();
	
	// stars

	star.appear();
	star.fall();
	star.updatePosWithIndex(star.checkDisappear());	
}

// ********** Tree Class **********

function Tree(){
	
	this.location = createVector(random(width),random(height));
	
	this.p1 = createVector(this.location.x,this.location.y-40*3);
	this.p2 = createVector(this.location.x,this.location.y+40*3);
	this.p3 = createVector(this.location.x+30*3,this.location.y+30*3);
	this.p4 = createVector(this.location.x-25*3,this.location.y+30*3);
	
	this.c1 = color(131,70,140);
	this.c2 = color(92,24,102);
}

Tree.prototype.appear = function(){
	noStroke();
	fill(this.c2);
	triangle(this.p1.x,this.p1.y,this.p2.x,this.p2.y,this.p3.x,this.p3.y);
	fill(this.c1);
	triangle(this.p1.x,this.p1.y,this.p2.x,this.p2.y,this.p4.x,this.p4.y);
}

// ********** Star class **********

function Star(amount){
	this.x = new Array(amount);
	this.y = new Array(amount);
	this.xSpeed = new Array(amount);
	this.ySpeed = new Array(amount);
	this.amount = amount;
	this.sOpac = 255;
	this.size  = new Array(amount);
	this.so = 150;
}

Star.prototype.appear = function(){
	for(i=0;i<this.amount;i++){
		var sw = random(5);
		this.so = random(100,200);
		stroke(255,this.so);
		strokeWeight(sw);  // stroke is random
		fill(255,255,255,this.sOpac); // middle always white
		ellipse(this.x[i],this.y[i],this.size[i],this.size[i]);
	}
}

Star.prototype.updatePos = function(){
	this.sOpac = 255;
	for(i=0;i<this.amount;i++){
		this.x[i] = random(width);
		this.y[i] = random(height);
		this.size[i] = 5;
	}
	for(i=0;i<this.amount;i++){
		this.xSpeed[i] = (random(10))-5;
		this.ySpeed[i] = (random(10))-5;
	}
}

Star.prototype.fall = function(){
	for(i=0;i<this.amount;i++){
		this.x[i] += this.xSpeed[i];
		this.y[i] += this.ySpeed[i]; 
	}
}

Star.prototype.checkDisappear = function(){
	for(i=0;i<this.amount;i++){
		if (this.x[i] < 0 || this.x[i] > width || this.y[i] < 0 || this.y[i] > height) {
			return i;
		}
	}
}

// Star.prototype.updatePosWithIndex = function(i){
// 	this.x[i] = random(width);
// 	this.y[i] = random(height);
// 	this.size[i] = 5;
// }

// Star.prototype.updatePosLeftWithIndex = function(i){
// 	this.x[i] = random((width/2)/2);
// 	this.y[i] = random(height);
// 	this.size[i] = 5;
// }

// Star.prototype.appearInMotion = function(){
// 	for(i=0;i<this.amount;i++){
// 		var sw = random(5);
// 		var so = random(100,200);
// 		stroke(255,so);
// 		strokeWeight(sw);
// 		fill(255,255,255,this.sOpac);
// 		rect(this.x[i],this.y[i],100,1);
// 	}
// }

// Star.prototype.move = function(){
// 	for(i=0;i<this.amount;i++){
// 		this.x[i] += (this.xSpeed[i]) +25;
// 	}	
// }