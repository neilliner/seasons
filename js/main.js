var snow =[];
var t = [];
var star =[];

var aur = [];

function preload(){

}

function setup(){
	createCanvas(windowWidth,windowHeight);
	snow = new Snow(100);
	snow.updatePos();
	t = new Tree();

	star = new Star(5);
	star.updatePos();

	aur = new Aurora();
	aur.lengthOfAur();
}

function draw(){
	background(0);
	t.appear();
	
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
}

// ********** Aurora class **********

function Aurora(){
	//this.location = createVector(width/2,0);
	this.x = new Array(width);
	this.y = new Array(width);
	this.amount = width;
	this.len1 = new Array(width);
	this.len2 = new Array(width);
	this.isGoingUp = new Array(width);
	this.lc1 = color(0,255,50,50);
	this.lc2 = color(0,50,255,50);
}

Aurora.prototype.appear = function(){
	//angleMode(DEGREES);
	strokeWeight(5);
	for(var i=0;i<this.amount;i++){
		stroke(lerpColor(this.lc1,this.lc2,i*0.0005));

		push();
			// if(i>this.amount/3){
			// 	rotate(70);
			// }else{
			// 	rotate(90);
			// }
			// translate((this.x[i]+i)-600,this.y[i]-this.len1[i]-height*1.25);
			translate(this.x[i]+i,this.y[i]-this.len1[i]);
			line(0,0,0,1+i/5);
		pop();
	}
}

Aurora.prototype.lengthOfAur = function(){
	 var n = 0.0;
	for(var i=0;i<this.amount;i++){
		this.x[i] = 0;
		this.y[i] = height/2;
		this.len1[i] = 1;
		this.len1[i] += (noise(n)*100);
		n+=0.005;
		//this.location[i] = createVector(width/2,0);
	}
}

Aurora.prototype.updateLen = function(){
	for(var i=0;i<this.amount;i++){

		if(this.y[i]<(height/2)-random(180)){ this.isGoingUp[i] = false; }
		else if(this.y[i]>(height/2)+random(180)){ this.isGoingUp[i] = true; }

		if(this.isGoingUp[i] == false){
			this.y[i] += (1*i/5000);
		}

		else if(this.isGoingUp[i] == true){
			this.y[i] -= (1*i/5000);
		}

		else{
			this.y[i] -= (1*i/5000);
		}
	}

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

// ********** Snow class **********

function Snow(amount){
	this.x = new Array(amount);
	this.y = new Array(amount);
	this.xSpeed = new Array(amount);
	this.ySpeed = new Array(amount);
	this.amount = amount;
	this.sOpac = 255;
	this.size  = new Array(amount);
	this.so = 150;
}

Snow.prototype.appear = function(){
	for(i=0;i<this.amount;i++){
		var sw = random(5);
		this.so = random(100,200);
		stroke(255,this.so);
		strokeWeight(sw);  // stroke is random
		fill(255,255,255,this.sOpac); // middle always white
		ellipse(this.x[i],this.y[i],this.size[i],this.size[i]);
	}
}

Snow.prototype.updatePos = function(){
	this.sOpac = 255;
	for(i=0;i<this.amount;i++){
		this.x[i] = random(width);
		this.y[i] = random(height);
		this.size[i] = 5;
	}
	for(i=0;i<this.amount;i++){
		this.xSpeed[i] = (random(10));
		this.ySpeed[i] = (random(10));
	}
}

Snow.prototype.fall = function(){
	for(i=0;i<this.amount;i++){
		this.x[i] += this.xSpeed[i];
		this.y[i] += this.ySpeed[i]; 
	}
}

Snow.prototype.checkDisappear = function(){
	for(i=0;i<this.amount;i++){
		if (this.x[i] < 0 || this.x[i] > width || this.y[i] < 0 || this.y[i] > height) {
			return i;
		}
	}
}

Snow.prototype.updatePosWithIndex = function(i){
	this.x[i] = random(width);
	this.y[i] = random(height);
	this.size[i] = 5;
}

// Snow.prototype.updatePosLeftWithIndex = function(i){
// 	this.x[i] = random((width/2)/2);
// 	this.y[i] = random(height);
// 	this.size[i] = 5;
// }

// Snow.prototype.appearInMotion = function(){
// 	for(i=0;i<this.amount;i++){
// 		var sw = random(5);
// 		var so = random(100,200);
// 		stroke(255,so);
// 		strokeWeight(sw);
// 		fill(255,255,255,this.sOpac);
// 		rect(this.x[i],this.y[i],100,1);
// 	}
// }

// Snow.prototype.move = function(){
// 	for(i=0;i<this.amount;i++){
// 		this.x[i] += (this.xSpeed[i]) +25;
// 	}	
// }
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
		stroke(65,255,200,0); //head of the shootign star
		strokeWeight(5);
		line(this.x[i],this.y[i],this.x[i]-20,this.y[i]-20);
	}
}

Star.prototype.tail= function(){  // the tail for the shooting stars
	
	for(i=0;i<this.amount;i++){	
		noStroke();
		var xx = this.x[i];
		var yy = this.y[i];
		var opac = 200;
		var size = 10;
		for(j=100;j>0;j--){
			fill(255,255,255,opac);
			ellipse(xx+(20+j*2),yy+(20+j*2),size,size);
			opac -=2;
			size -= 0.1;
		}
	}
}

Star.prototype.updatePos = function(){
	this.sOpac = 255;
	for(i=0;i<this.amount;i++){
		this.x[i] = random(-500, width);
		this.y[i] = random(-200, -500);
		this.size[i] = 5;
	}
	for(i=0;i<this.amount;i++){
		this.xSpeed[i] = 5;
		this.ySpeed[i] = 5;
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
		if (this.x[i] < 0 || this.x[i] > width  || this.y[i] > height) {
			return i;
		}
	}
}

Star.prototype.updatePosWithIndex = function(i){
	this.x[i] = random(-500, width);
	this.y[i] = random(-200, -500);
	this.size[i] = 100;
}