// ********** Iceburg Class **********

function Iceburg(){
	
	this.location = createVector(random(width),random(height));
	
	this.p1 = createVector(this.location.x,this.location.y-40*3);
	this.p2 = createVector(this.location.x,this.location.y+40*3);
	this.p3 = createVector(this.location.x+30*3,this.location.y+30*3);
	this.p4 = createVector(this.location.x-25*3,this.location.y+30*3);
	
	this.c1 = color(162,234,255);
	this.c2 = color(227,234,255);
}

Iceburg.prototype.appear = function(){
	noStroke();
	fill(this.c1);
	triangle(this.p1.x,this.p1.y,this.p2.x,this.p2.y,this.p3.x,this.p3.y);
	fill(this.c2);
	triangle(this.p1.x,this.p1.y,this.p2.x,this.p2.y,this.p4.x,this.p4.y);
}