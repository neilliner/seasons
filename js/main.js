
var t = [];

function preload(){

}

function setup(){
	createCanvas(windowWidth,windowHeight);
	t = new Tree();
	//t.genRandNum();
}

function draw(){
	background(0);
	t.appear();
}

// ********** Tree Class **********

function Tree(){
	
	this.location = createVector(random(width),random(height));
	
	this.p1 = createVector(this.location.x,this.location.y-40*3);
	this.p2 = createVector(this.location.x,this.location.y+40*3);
	this.p3 = createVector(this.location.x+30*3,this.location.y+30*3);
	this.p4 = createVector(this.location.x-25*3,this.location.y+30*3);
	// this.p = new Array(108);
	
	this.c1 = color(131,70,140);
	this.c2 = color(92,24,102);
}

Tree.prototype.appear = function(){
	noStroke();
	//for(var i=0;i<105;i++){
		fill(this.c2);
		triangle(this.p1.x,this.p1.y,this.p2.x,this.p2.y,this.p3.x,this.p3.y);
		// triangle(this.p[i].x,this.p[i].y,this.p[i+1].x,this.p[i+1].y,this.p[i+2].x,this.p[i+2].y);
		fill(this.c1);
		triangle(this.p1.x,this.p1.y,this.p2.x,this.p2.y,this.p4.x,this.p4.y);
		// triangle(this.p[i].x,this.p[i].y,this.p[i+1].x,this.p[i+1].y,this.p[i+3].x,this.p[i+3].y);
	//}
}

// Tree.prototype.genRandNum = function(){
// 	var w = 0;
// 	var h = 0;
// 	var ii = 0;
// 	for(var i=1;i<=8;i++){
// 		w = 0;
// 		for(var j=1;j<=12;j++){
// 			//if(w > width){w = 0;}
// 			//if(h > height){h = 0;}
// 			this.p[ii] = createVector(random(j,w+(j*10)),random(i,h+(i*5)));
// 			w = w+(j*10);
// 			ii++;
// 		}
// 		h = h+(i*5);
// 	}

// }